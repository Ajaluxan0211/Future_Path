
import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function getAuthenticatedUserId(req) {
  return req.user?.id || req.user?.userId || req.user?.sub || null
}

// GET /api/reviews/agencies/:agencyId
// Publicly retrieve reviews for one approved agency.
router.get('/agencies/:agencyId', async (req, res) => {
  try {
    const { agencyId } = req.params

    const agency = await prisma.agency.findFirst({
      where: {
        id: agencyId,
        verificationStatus: 'APPROVED',
      },
      select: { id: true },
    })

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: 'Approved agency not found.',
      })
    }

    const reviews = await prisma.review.findMany({
      where: { agencyId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: { name: true },
        },
      },
    })

    const averageRating = reviews.length
      ? Number(
          (
            reviews.reduce((total, review) => total + review.rating, 0) /
            reviews.length
          ).toFixed(1)
        )
      : 0

    return res.json({
      success: true,
      averageRating,
      reviewCount: reviews.length,
      reviews: reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        reviewerName: review.user.name,
      })),
    })
  } catch (error) {
    console.error('Fetch reviews error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to load reviews.',
    })
  }
})

// POST /api/reviews/agencies/:agencyId
// Authenticated users can submit one review per agency.
router.post('/agencies/:agencyId', requireAuth, async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req)

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to submit a review.',
      })
    }

    const { agencyId } = req.params
    const rating = Number(req.body.rating)
    const comment =
      typeof req.body.comment === 'string' ? req.body.comment.trim() : ''

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be a whole number from 1 to 5.',
      })
    }

    if (comment.length < 5 || comment.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Your review must contain 5 to 2000 characters.',
      })
    }

    const agency = await prisma.agency.findFirst({
      where: {
        id: agencyId,
        verificationStatus: 'APPROVED',
      },
      select: { id: true },
    })

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: 'Approved agency not found.',
      })
    }

    // Confirm the user exists and hasn't already reviewed this agency.
    const existingReview = await prisma.review.findUnique({
      where: {
        agencyId_userId: { agencyId, userId },
      },
      select: { id: true },
    })

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message:
          'You have already reviewed this agency. Editing your existing review can be added next.',
      })
    }

    const review = await prisma.review.create({
      data: {
        agencyId,
        userId,
        rating,
        comment,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        user: {
          select: { name: true },
        },
      },
    })

    return res.status(201).json({
      success: true,
      message: 'Your review has been submitted.',
      review: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        reviewerName: review.user.name,
      },
    })
  } catch (error) {
    // The database unique constraint protects against simultaneous duplicates.
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this agency.',
      })
    }

    if (error.code === 'P2003') {
      return res.status(401).json({
        success: false,
        message: 'Your account could not be verified. Please log in again.',
      })
    }

    console.error('Submit review error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your review.',
    })
  }
})

export default router
