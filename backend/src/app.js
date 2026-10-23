
import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Agency Backend API!');
});

// Database connection test
app.get('/api/db-check', async (req, res) => {
  try {
    await prisma.$connect();

    const userCount = await prisma.user.count();
    const agencyCount = await prisma.agency.count();

    res.json({
      success: true,
      message: 'PostgreSQL connected successfully!',
      data: {
        users: userCount,
        agencies: agencyCount,
      },
    });
  } catch (error) {
    console.error('Database connection error:', error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

export default app;
