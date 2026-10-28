
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Resolve uploads relative to the backend directory, not the terminal's
// current working directory.
const uploadDir = path.resolve("uploads/agency-documents");
fs.mkdirSync(uploadDir, { recursive: true });

const DOCUMENT_FIELDS = {
  businessRegistration: "businessRegistrationUrl",
  migrationLicense: "migrationLicenseUrl",
  governmentCertificate: "governmentCertificateUrl",
  officePhoto: "officePhotoUrl",
};

const DOCUMENT_TYPES = {
  businessRegistration: "businessRegistrationUrl",
  businessRegistrationDocument: "businessRegistrationUrl",
  migrationLicense: "migrationLicenseUrl",
  migrationLicenseDocument: "migrationLicenseUrl",
  governmentCertificate: "governmentCertificateUrl",
  governmentRegistrationDocument: "governmentCertificateUrl",
  officePhoto: "officePhotoUrl",
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDir),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

const allowedMimeTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 4,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return callback(
        new Error("Only PDF, JPG, PNG, and WebP files are allowed.")
      );
    }
    callback(null, true);
  },
});

const agencyDocuments = upload.fields([
  { name: "businessRegistration", maxCount: 1 },
  { name: "migrationLicense", maxCount: 1 },
  { name: "governmentCertificate", maxCount: 1 },
  { name: "officePhoto", maxCount: 1 },
]);

function deleteUploadedFiles(files = {}) {
  for (const file of Object.values(files).flat()) {
    if (file?.path && fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error("Could not remove uploaded file:", error.message);
      }
    }
  }
}

function fileUrl(file) {
  return file
    ? `/uploads/agency-documents/${path.basename(file.filename)}`
    : null;
}

function safeAgency(agency) {
  return {
    id: agency.id,
    name: agency.name,
    description: agency.description,
    website: agency.website,
    phone: agency.phone,
    address: agency.address,
    country: agency.country,
    verificationStatus: agency.verificationStatus,
    submittedAt: agency.submittedAt,
    ownerName: agency.ownerName,
    services: agency.services,
    operatingCountries: agency.operatingCountries,
    businessRegistrationUrl: agency.businessRegistrationUrl,
    migrationLicenseUrl: agency.migrationLicenseUrl,
    governmentCertificateUrl: agency.governmentCertificateUrl,
    officePhotoUrl: agency.officePhotoUrl,
    rejectionReason: agency.rejectionReason,
    reviewNotes: agency.rejectionReason,
    email: agency.user?.email ?? "",
    user: agency.user
      ? {
          id: agency.user.id,
          name: agency.user.name,
          email: agency.user.email,
        }
      : null,
  };
}

// ---------------------------------------------------------
// POST /api/agency/register
// Create an agency account and submit its documents together.
// ---------------------------------------------------------
router.post(
  "/register",
  (req, res, next) => {
    agencyDocuments(req, res, (error) => {
      if (error) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          success: false,
          message: error.message || "Document upload failed.",
        });
      }
      next();
    });
  },
  async (req, res) => {
    const files = req.files || {};
    let transactionSucceeded = false;

    try {
      const requiredFiles = [
        "businessRegistration",
        "migrationLicense",
        "governmentCertificate",
      ];

      const missing = requiredFiles.find((key) => !files[key]?.[0]);

      if (missing) {
        deleteUploadedFiles(files);
        return res.status(400).json({
          success: false,
          message: `Upload the required document: ${missing}.`,
        });
      }

      const body = req.body || {};

      const companyName = String(body.companyName || "").trim();
      const ownerName = String(body.ownerName || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const phone = String(body.phone || "").trim();
      const address = String(body.address || "").trim();
      const city = String(body.city || "").trim();
      const website = String(body.website || "").trim();
      const country = String(body.country || "Sri Lanka").trim();

      let services;
      let operatingCountries;

      try {
        services = JSON.parse(body.services || "[]");
        operatingCountries = JSON.parse(body.operatingCountries || "[]");
      } catch {
        deleteUploadedFiles(files);
        return res.status(400).json({
          success: false,
          message: "Services or operating countries contain invalid data.",
        });
      }

      if (
        !companyName ||
        !ownerName ||
        !email ||
        !password ||
        !phone ||
        !address ||
        !city
      ) {
        deleteUploadedFiles(files);
        return res.status(400).json({
          success: false,
          message: "Complete all required agency and account fields.",
        });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        deleteUploadedFiles(files);
        return res.status(400).json({
          success: false,
          message: "Enter a valid business email address.",
        });
      }

      if (password.length < 8) {
        deleteUploadedFiles(files);
        return res.status(400).json({
          success: false,
          message: "Password must contain at least 8 characters.",
        });
      }

      if (
        !Array.isArray(services) ||
        !Array.isArray(operatingCountries) ||
        services.length === 0 ||
        operatingCountries.length === 0
      ) {
        deleteUploadedFiles(files);
        return res.status(400).json({
          success: false,
          message: "Select at least one service and one operating country.",
        });
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in backend/.env");
      }

      const existing = await prisma.user.findUnique({
        where: { email },
      });

      if (existing) {
        deleteUploadedFiles(files);
        return res.status(409).json({
          success: false,
          message:
            "This email already has an account. Log in or use another email.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
          data: {
            name: ownerName,
            email,
            password: hashedPassword,
            role: "AGENCY",
          },
        });

        await tx.agency.create({
          data: {
            name: companyName,
            ownerName,
            description: `Services: ${services.join(", ")}`,
            website: website || null,
            phone,
            address: `${address}, ${city}`,
            country,
            services,
            operatingCountries,
            businessRegistrationUrl: fileUrl(
              files.businessRegistration[0]
            ),
            migrationLicenseUrl: fileUrl(files.migrationLicense[0]),
            governmentCertificateUrl: fileUrl(
              files.governmentCertificate[0]
            ),
            officePhotoUrl: fileUrl(files.officePhoto?.[0]),
            verificationStatus: "PENDING",
            userId: createdUser.id,
          },
        });

        return createdUser;
      });

      transactionSucceeded = true;

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(201).json({
        success: true,
        message:
          "Agency application submitted successfully. Your status is pending verification.",
        agency: {
          name: companyName,
          verificationStatus: "PENDING",
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Agency registration error:", error);

      if (!transactionSucceeded) {
        deleteUploadedFiles(files);
      }

      if (error.code === "P2002") {
        return res.status(409).json({
          success: false,
          message:
            "An account or agency with this information already exists.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Could not submit agency application.",
      });
    }
  }
);

// ---------------------------------------------------------
// GET /api/agency/public
// Only approved agencies are publicly visible.
// ---------------------------------------------------------
router.get("/public", async (_req, res) => {
  try {
    const agencies = await prisma.agency.findMany({
      where: { verificationStatus: "APPROVED" },
      select: {
        id: true,
        name: true,
        description: true,
        website: true,
        phone: true,
        address: true,
        country: true,
        services: true,
        operatingCountries: true,
        verificationStatus: true,
      },
      orderBy: { submittedAt: "desc" },
    });

    return res.json({ success: true, agencies });
  } catch (error) {
    console.error("Public agencies error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not load agencies.",
    });
  }
});

// ---------------------------------------------------------
// GET /api/agency/mine
// Current logged-in agency checks its application status.
// ---------------------------------------------------------
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const agency = await prisma.agency.findUnique({
      where: { userId: req.user.id },
      select: {
        id: true,
        name: true,
        verificationStatus: true,
        rejectionReason: true,
        submittedAt: true,
      },
    });

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "No agency application found.",
      });
    }

    return res.json({ success: true, agency });
  } catch (error) {
    console.error("Agency status error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not load application status.",
    });
  }
});

// ---------------------------------------------------------
// GET /api/agency/admin/list
// Administrator lists applications.
// Optional query: ?status=PENDING, APPROVED, REJECTED, or ALL
// ---------------------------------------------------------
router.get("/admin/list", requireAuth, requireAdmin, async (req, res) => {
  try {
    const status = String(req.query.status || "ALL").toUpperCase();
    const validStatuses = ["ALL", "PENDING", "APPROVED", "REJECTED"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status filter.",
      });
    }

    const agencies = await prisma.agency.findMany({
      where: status === "ALL" ? {} : { verificationStatus: status },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    return res.json({
      success: true,
      agencies: agencies.map(safeAgency),
    });
  } catch (error) {
    console.error("Admin agency list error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not load agency applications.",
    });
  }
});

// ---------------------------------------------------------
// GET /api/agency/admin/:id/documents/:type
// Secure document viewing: administrators only.
// ---------------------------------------------------------
router.get(
  "/admin/:id/documents/:type",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const field = DOCUMENT_TYPES[req.params.type];

      if (!field) {
        return res.status(400).json({
          success: false,
          message: "Invalid document type.",
        });
      }

      const agency = await prisma.agency.findUnique({
        where: { id: req.params.id },
        select: {
          id: true,
          businessRegistrationUrl: true,
          migrationLicenseUrl: true,
          governmentCertificateUrl: true,
          officePhotoUrl: true,
        },
      });

      if (!agency) {
        return res.status(404).json({
          success: false,
          message: "Agency application not found.",
        });
      }

      const storedUrl = agency[field];

      if (!storedUrl) {
        return res.status(404).json({
          success: false,
          message: "This document has not been uploaded.",
        });
      }

      // The stored URL is expected to point to a generated filename.
      // Never accept an arbitrary filesystem path from the request.
      const filename = path.basename(
        String(storedUrl).split(/[\\/]/).pop()
      );

      const filePath = path.resolve(uploadDir, filename);

      if (path.dirname(filePath) !== uploadDir) {
        return res.status(400).json({
          success: false,
          message: "Invalid document path.",
        });
      }

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "Document file not found on the server.",
        });
      }

      const extension = path.extname(filename).toLowerCase();
      const mimeTypes = {
        ".pdf": "application/pdf",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
      };

      res.setHeader(
        "Content-Type",
        mimeTypes[extension] || "application/octet-stream"
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${filename.replace(/["\\]/g, "_")}"`
      );

      return res.sendFile(filePath, (error) => {
        if (error && !res.headersSent) {
          console.error("Document delivery error:", error);
          res.status(500).json({
            success: false,
            message: "Could not open the document.",
          });
        }
      });
    } catch (error) {
      console.error("Admin document view error:", error);
      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          message: "Could not retrieve the document.",
        });
      }
    }
  }
);

// ---------------------------------------------------------
// PATCH /api/agency/admin/:id/decision
// Approve or reject an agency application.
// ---------------------------------------------------------
router.patch(
  "/admin/:id/decision",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    const status = String(req.body?.status || "").toUpperCase();
    const rejectionReason = String(
      req.body?.rejectionReason || ""
    ).trim();

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be APPROVED or REJECTED.",
      });
    }

    if (status === "REJECTED" && !rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Provide a reason when rejecting an application.",
      });
    }

    try {
      const existing = await prisma.agency.findUnique({
        where: { id: req.params.id },
        select: { id: true },
      });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Agency application not found.",
        });
      }

      const agency = await prisma.agency.update({
        where: { id: req.params.id },
        data: {
          verificationStatus: status,
          rejectionReason:
            status === "REJECTED" ? rejectionReason : null,
          reviewedAt: new Date(),
          reviewedBy: req.user.id,
        },
        select: {
          id: true,
          name: true,
          verificationStatus: true,
          rejectionReason: true,
        },
      });

      return res.json({
        success: true,
        message: `Agency ${status.toLowerCase()} successfully.`,
        agency,
      });
    } catch (error) {
      console.error("Agency decision error:", error);
      return res.status(500).json({
        success: false,
        message: "Could not update agency decision.",
      });
    }
  }
);

export default router;
