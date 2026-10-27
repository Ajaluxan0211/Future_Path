
import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma.js";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "System Administrator";

  if (!email || !password) {
    throw new Error(
      "Please set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env"
    );
  }

  if (password.length < 12) {
    throw new Error("Use an admin password with at least 12 characters.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(
      `This email already exists with role ${existingUser.role}. ` +
      "Choose a different email to create a separate admin account."
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin account created successfully.");
  console.log("Email:", email);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
