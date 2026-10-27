
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const router = Router();

const roleMap = {
  student: "USER",
  agency: "AGENCY",
  admin: "ADMIN",
};

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from backend .env");
  }

  return jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

// STUDENT REGISTRATION
// Public registration always creates USER accounts.
// Never allow users to choose ADMIN during public registration.
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      confirmPassword,
    } = req.body ?? {};

    const fullName =
      `${firstName ?? ""} ${lastName ?? ""}`.trim() ||
      String(name ?? "").trim();

    const normalizedEmail = String(email ?? "")
      .trim()
      .toLowerCase();

    if (!fullName || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    if (
      confirmPassword !== undefined &&
      password !== confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists. Please log in.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: fullName,
        email: normalizedEmail,
        password: hashedPassword,
        role: "USER",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. You can now log in.",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
});

// LOGIN FOR STUDENT, AGENCY, AND ADMIN
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body ?? {};

    const normalizedEmail = String(email ?? "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !password || !roleMap[role]) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and a valid account type are required.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Use a generic error so the endpoint does not reveal
    // whether an email exists.
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (user.role !== roleMap[role]) {
      return res.status(403).json({
        success: false,
        message: `This account is not registered as ${role}. Please choose the correct account type.`,
      });
    }

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({
      success: true,
      message: "Login successful.",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.json({
    success: true,
    message: "Logged out successfully.",
  });
});

export default router;
