
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import prisma from "./lib/prisma.js";
import { requireAuth, requireAdmin } from "./middleware/auth.js";
import authRoutes from "./routes/auth.routes.js";
import agencyRoutes from "./routes/agency.routes.js";
import reviewRoutes from './routes/review.routes.js'

const app = express();

// --------------------------------------------------
// Middleware
// --------------------------------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// --------------------------------------------------
// Home route
// --------------------------------------------------
app.get("/", (_req, res) => {
  res.send("Welcome to the FuturePath Backend API!");
});

// --------------------------------------------------
// Authentication routes
// --------------------------------------------------
app.use("/api/auth", authRoutes);

// --------------------------------------------------
// Agency registration, document upload, review,
// approval/rejection, application status and public list
// --------------------------------------------------
app.use("/api/agency", agencyRoutes);
app.use('/api/reviews', reviewRoutes)

// --------------------------------------------------
// Database connection test
// GET http://localhost:5000/api/db-check
// --------------------------------------------------
app.get("/api/db-check", async (_req, res) => {
  try {
    const users = await prisma.user.count();
    const agencies = await prisma.agency.count();

    return res.json({
      success: true,
      message: "PostgreSQL connected successfully!",
      data: {
        users,
        agencies,
      },
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

// --------------------------------------------------
// Admin: fetch registered users
// GET /api/admin/users
// Requires an authenticated administrator.
// --------------------------------------------------
app.get(
  "/api/admin/users",
  requireAuth,
  requireAdmin,
  async (_req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const formattedUsers = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,

        role:
          user.role === "ADMIN"
            ? "Admin"
            : user.role === "AGENCY"
              ? "Agency"
              : "Student",

        createdAt: user.createdAt,

        joined: user.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),

        lastActive: "Not available",
        status: "Active",
        verified: false,

        initials: user.name
          .split(" ")
          .filter(Boolean)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),

        color:
          user.role === "ADMIN"
            ? "bg-indigo-100 text-indigo-800"
            : user.role === "AGENCY"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-blue-100 text-blue-800",

        searches: 0,
        agencies: 0,
        scamFlags: 0,
        events: [],
      }));

      return res.json({
        success: true,
        users: formattedUsers,
      });
    } catch (error) {
      console.error("Fetch admin users error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to load users.",
      });
    }
  }
);

// --------------------------------------------------
// Unknown API routes — keep this at the end
// --------------------------------------------------
app.use("/api", (req, res) => {
  return res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// --------------------------------------------------
// General error handler
// --------------------------------------------------
app.use((error, _req, res, _next) => {
  console.error("Unhandled backend error:", error);

  if (res.headersSent) {
    return;
  }

  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

export default app;
