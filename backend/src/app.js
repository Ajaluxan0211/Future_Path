
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./lib/prisma.js";
import { requireAuth, requireAdmin } from "./middleware/auth.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Agency Backend API!");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Database connection test
app.get("/api/db-check", async (req, res) => {
  try {
    await prisma.$connect();

    const userCount = await prisma.user.count();
    const agencyCount = await prisma.agency.count();

    res.json({
      success: true,
      message: "PostgreSQL connected successfully!",
      data: {
        users: userCount,
        agencies: agencyCount,
      },
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Admin: fetch real registered users
app.get(
  "/api/admin/users",
  requireAuth,
  requireAdmin,
  async (req, res) => {
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

      res.json({
        success: true,
        users: formattedUsers,
      });
    } catch (error) {
      console.error("Fetch admin users error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to load users.",
      });
    }
  }
);

// Unknown API routes must be handled last
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

export default app;
