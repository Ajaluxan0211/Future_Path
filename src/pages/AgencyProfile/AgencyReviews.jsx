
import { useCallback, useEffect, useState } from 'react'
import { Star, MessageSquare, Send, LoaderCircle } from 'lucide-react'

const API_URL = 'http://localhost:5000/api/reviews'

function formatDate(dateString) {
  if (!dateString) return ''

  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function Stars({ rating, interactive = false, onChange }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(number => (
        <button
          key={number}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(number)}
          aria-label={`Rate ${number} out of 5`}
          className={interactive ? 'rounded p-0.5 transition hover:scale-110' : 'p-0.5'}
        >
          <Star
            size={interactive ? 27 : 17}
            fill={number <= rating ? '#F59E0B' : 'none'}
            color={number <= rating ? '#F59E0B' : '#CBD5E1'}
          />
        </button>
      ))}
    </div>
  )
}

export default function AgencyReviews({ agencyId, isSample = false }) {
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadReviews = useCallback(async () => {
    if (!agencyId || isSample) {
      setReviews([])
      setAverageRating(0)
      setReviewCount(0)
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${API_URL}/agencies/${encodeURIComponent(agencyId)}`,
        { credentials: 'include' }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Could not load reviews.')
      }

      setReviews(result.reviews || [])
      setAverageRating(Number(result.averageRating || 0))
      setReviewCount(Number(result.reviewCount || 0))
    } catch (err) {
      setError(err.message || 'Could not load reviews.')
    } finally {
      setLoading(false)
    }
  }, [agencyId, isSample])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (isSample) {
      setError('Sample agencies cannot receive real reviews.')
      return
    }

    if (!comment.trim() || comment.trim().length < 5) {
      setError('Please write at least 5 characters.')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(
        `${API_URL}/agencies/${encodeURIComponent(agencyId)}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating,
            comment: comment.trim(),
          }),
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          (response.status === 401
            ? 'Please log in before submitting a review.'
            : 'Could not submit your review.')
        )
      }

      setComment('')
      setRating(5)
      setMessage('Your review was submitted successfully.')
      await loadReviews()
    } catch (err) {
      setError(err.message || 'Could not submit your review.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="space-y-6">
      {/* Rating summary */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="text-emerald-700" size={23} />
              <h2 className="text-2xl font-bold text-slate-900">
                Customer reviews
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Share your experience to help other students make informed decisions.
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 px-5 py-4">
            <div className="text-3xl font-bold text-slate-900">
              {reviewCount ? averageRating.toFixed(1) : '—'}
              <span className="text-base font-medium text-slate-500"> / 5</span>
            </div>

            <div className="mt-2">
              <Stars rating={Math.round(averageRating)} />
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
      </div>

      {/* Review form */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-xl font-bold text-slate-900">
          Write a review
        </h3>

        {isSample ? (
          <p className="mt-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            This is a sample agency. Reviews can be submitted for approved
            agencies registered in the database.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Your rating
              </label>

              <Stars
                rating={rating}
                interactive
                onChange={setRating}
              />

              <p className="mt-2 text-sm text-slate-500">
                {rating} out of 5 stars
              </p>
            </div>

            <div>
              <label
                htmlFor="agency-review-comment"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Your experience
              </label>

              <textarea
                id="agency-review-comment"
                value={comment}
                onChange={event => setComment(event.target.value)}
                rows={5}
                maxLength={2000}
                minLength={5}
                required
                placeholder="Describe your experience with this agency..."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
              />

              <p className="mt-1 text-right text-xs text-slate-400">
                {comment.length}/2000 characters
              </p>
            </div>

            {message && (
              <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                {message}
              </p>
            )}

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Send size={17} />
              )}

              {submitting ? 'Submitting...' : 'Submit review'}
            </button>

            <p className="text-xs leading-5 text-slate-500">
              You must be logged in. Only one review per account per agency is
              allowed by the database.
            </p>
          </form>
        )}
      </div>

      {/* Review list */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Reviews from users
        </h3>

        {loading ? (
          <div className="flex items-center gap-2 rounded-2xl bg-white p-6 text-slate-500">
            <LoaderCircle size={18} className="animate-spin" />
            Loading reviews...
          </div>
        ) : error && reviews.length === 0 ? (
          <div className="rounded-2xl border border-red-100 bg-white p-6 text-sm text-red-700">
            {error}
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <MessageSquare size={30} className="mx-auto text-slate-300" />
            <p className="mt-3 font-semibold text-slate-800">
              No reviews yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Be the first to share your experience with this agency.
            </p>
          </div>
        ) : (
          reviews.map(review => (
            <article
              key={review.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-900">
                    {review.reviewerName || 'User'}
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatDate(review.createdAt)}
                    {review.updatedAt &&
                    review.createdAt !== review.updatedAt
                      ? ' · Edited'
                      : ''}
                  </p>
                </div>

                <Stars rating={review.rating} />
              </div>

              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                {review.comment}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
