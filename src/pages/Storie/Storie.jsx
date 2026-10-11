import { useMemo, useState } from 'react'
import {
  Search,
  PlusCircle,
  Camera,
  ArrowLeft,
  ArrowRight,
  X,
} from 'lucide-react'

const STORIES = [
  {
    id: 1,
    name: 'Ashan P.',
    initials: 'AP',
    rating: 5,
    category: 'Student Visa',
    country: 'Australia',
    field: 'IT & Tech',
    tag: 'Work Visa Granted',
    quote:
      "Moving to Melbourne for an IT career seemed daunting, but Agency's guidance made the visa process easier.",
    image:
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    name: 'Nimesha K.',
    initials: 'NK',
    rating: 5,
    category: 'Work Visa',
    country: 'Canada',
    field: 'Software Eng.',
    tag: 'PR Success',
    quote:
      'Finding a community of people who had completed the process helped me understand my journey.',
    image:
      'https://images.unsplash.com/photo-1503614472-8c93d56cd7b9?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    name: 'Sachini W.',
    initials: 'SW',
    rating: 5,
    category: 'Student Visa',
    country: 'UK',
    field: 'Nursing',
    tag: 'Scholarship',
    quote:
      'Securing a scholarship for my Masters was a dream come true. The application guidance helped me prepare.',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 4,
    name: 'James D.',
    initials: 'JD',
    rating: 4,
    category: 'Visit Visa',
    country: 'USA',
    field: 'Tech Conf.',
    tag: 'Visit Visa',
    quote:
      'My visit visa for a technology conference was processed on time. The document checklist helped me prepare.',
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 5,
    name: 'Kavindi R.',
    initials: 'KR',
    rating: 5,
    category: 'Student Visa',
    country: 'Australia',
    field: 'Business',
    tag: 'University Offer',
    quote:
      'Comparing universities and preparing my documents became easier when I had a clear plan to follow.',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 6,
    name: 'Tharun S.',
    initials: 'TS',
    rating: 5,
    category: 'Work Visa',
    country: 'UK',
    field: 'Engineering',
    tag: 'Career Journey',
    quote:
      'Learning from other applicants gave me more confidence and helped me understand the steps in my journey.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
  },
]

const CATEGORIES = [
  'All Stories',
  'Student Visa',
  'Work Visa',
  'Visit Visa',
]

export default function Stories() {
  const [category, setCategory] = useState('All Stories')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [page, setPage] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    name: '',
    country: '',
    category: 'Student Visa',
    story: '',
  })

  const filteredStories = useMemo(() => {
    const term = search.trim().toLowerCase()

    return STORIES.filter((story) => {
      const matchesCategory =
        category === 'All Stories' || story.category === category

      const searchableText = [
        story.name,
        story.country,
        story.field,
        story.quote,
        story.category,
        story.tag,
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch = !term || searchableText.includes(term)

      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const pageSize = 6
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStories.length / pageSize),
  )

  const visibleStories = filteredStories.slice(
    (page - 1) * pageSize,
    page * pageSize,
  )

  function changeCategory(value) {
    setCategory(value)
    setPage(1)
  }

  function changeSearch(value) {
    setSearch(value)
    setPage(1)
  }

  function openForm() {
    setShowForm(true)
    setSubmitted(false)
  }

  function closeForm() {
    setShowForm(false)
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    // Front-end demonstration only.
    // Connect a backend to save and moderate submitted stories.
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#F3FAF4] text-[#17211B]">
      {/* Hero section */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-5 py-8 sm:px-6 md:grid-cols-2 md:gap-10 md:py-10">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#087653]">
            Community verified
          </p>

          <h1 className="max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Voices of Verified Journeys.
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-[#526057] sm:text-base">
            Discover experiences from individuals who have navigated
            migration processes. Their journeys offer hope, guidance,
            and ideas for planning your own future.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openForm}
              className="inline-flex items-center gap-2 rounded-lg bg-[#087A58] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066547] focus:outline-none focus:ring-2 focus:ring-[#087A58] focus:ring-offset-2"
            >
              <PlusCircle size={16} />
              Share your story
            </button>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('story-list')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="rounded-lg border border-[#CAD6CD] bg-transparent px-5 py-2.5 text-sm font-medium text-[#26372D] transition hover:bg-white"
            >
              Browse all
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85"
            alt="People sharing experiences and celebrating together"
            className="h-56 w-full object-cover sm:h-72 md:h-80"
          />
        </div>
      </section>

      {/* Story filters */}
      <section
        id="story-list"
        className="mx-auto max-w-5xl px-5 pb-16 sm:px-6"
      >
        <div className="flex flex-col gap-4 border-b border-[#D4DED6] pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changeCategory(item)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  category === item
                    ? 'border-[#087653] bg-[#087653] text-white'
                    : 'border-[#CAD6CD] bg-transparent text-[#405047] hover:bg-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-[270px]">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718077]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
              placeholder="Search destinations or stories"
              aria-label="Search stories"
              className="w-full rounded-lg border border-transparent bg-[#E9F0E9] py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-[#65736A] focus:border-[#087653] focus:bg-white"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-[#718077]">
          Showing {filteredStories.length}{' '}
          {filteredStories.length === 1 ? 'story' : 'stories'}
        </p>

        {/* Story cards */}
        {visibleStories.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleStories.map((story) => (
              <article
                key={story.id}
                className="overflow-hidden rounded-xl border border-[#E3EBE4] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={story.image}
                  alt={`${story.country} destination`}
                  loading="lazy"
                  className="h-36 w-full object-cover sm:h-40"
                />

                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B4E6D2] bg-[#E8F7EF] text-xs font-bold text-[#087653]">
                      {story.initials}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-[#17211B]">
                        {story.name}
                      </h2>

                      <div
                        className="text-sm tracking-wide text-[#087653]"
                        aria-label={`${story.rating} out of 5 stars`}
                      >
                        {'★'.repeat(story.rating)}
                        <span className="text-[#D2DED5]">
                          {'★'.repeat(5 - story.rating)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 min-h-[72px] text-[13px] leading-5 text-[#536057]">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[#EEF2EE] pt-3">
                    {[story.country, story.field, story.tag].map(
                      (tag, index) => (
                        <span
                          key={`${story.id}-${tag}`}
                          className={`rounded px-2 py-1 text-[9px] font-semibold uppercase tracking-wide ${
                            index === 0
                              ? 'bg-[#B8EBDD] text-[#075C43]'
                              : 'bg-[#EDF2ED] text-[#48574D]'
                          }`}
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </article>
            ))}

            {/* Share story card */}
            {page === 1 &&
              category === 'All Stories' &&
              !search.trim() && (
                <button
                  type="button"
                  onClick={openForm}
                  className="flex min-h-[290px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D4E1D6] bg-[#EEF6EF] p-6 text-center transition hover:border-[#087653] hover:bg-[#E7F3E9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9EAE0] text-[#087653]">
                    <Camera size={22} />
                  </div>

                  <h2 className="mt-4 text-base font-semibold">
                    Share Your Journey
                  </h2>

                  <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#5E6B61]">
                    Your experience could guide someone else&apos;s future.
                  </p>

                  <span className="mt-4 rounded-lg bg-[#087653] px-4 py-2 text-xs font-semibold text-white">
                    Post My Story
                  </span>
                </button>
              )}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-[#E0E9E1] bg-white px-5 py-14 text-center">
            <Search size={28} className="mx-auto text-[#8A9A8F]" />

            <h2 className="mt-3 text-base font-semibold">
              No stories found
            </h2>

            <p className="mt-1 text-sm text-[#718077]">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                changeCategory('All Stories')
                changeSearch('')
              }}
              className="mt-4 text-sm font-semibold text-[#087653] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredStories.length > pageSize && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() =>
                setPage((current) => Math.max(1, current - 1))
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#CAD6CD] bg-white text-[#34463A] hover:bg-[#EAF3EB] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={15} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1,
            ).map((number) => (
              <button
                key={number}
                type="button"
                aria-label={`Page ${number}`}
                aria-current={page === number ? 'page' : undefined}
                onClick={() => setPage(number)}
                className={`h-9 min-w-9 rounded-lg border px-3 text-sm transition ${
                  page === number
                    ? 'border-[#087653] bg-[#087653] font-semibold text-white'
                    : 'border-[#CAD6CD] bg-white text-[#34463A] hover:bg-[#EAF3EB]'
                }`}
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(totalPages, current + 1),
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#CAD6CD] bg-white text-[#34463A] hover:bg-[#EAF3EB] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>

      {/* Share story modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-story-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#087653]">
                  Community stories
                </p>

                <h2
                  id="share-story-title"
                  className="mt-1 text-xl font-bold"
                >
                  Share your journey
                </h2>

                <p className="mt-2 text-sm leading-5 text-[#647168]">
                  Tell others about your experience. Avoid sharing passport
                  numbers or other sensitive personal information.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close form"
                onClick={closeForm}
                className="rounded-lg p-2 text-[#647168] hover:bg-[#EEF4EF]"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-[#B8E3CD] bg-[#EDF8F1] p-5">
                <h3 className="font-semibold text-[#075C43]">
                  Story form completed
                </h3>

                <p className="mt-2 text-sm leading-5 text-[#456252]">
                  This is a front-end demo. Your story has not been saved
                  or published. Connect a backend and moderation process
                  to submit it for review.
                </p>

                <button
                  type="button"
                  onClick={closeForm}
                  className="mt-4 rounded-lg bg-[#087653] px-4 py-2 text-sm font-semibold text-white hover:bg-[#066547]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="story-name"
                    className="mb-1.5 block text-xs font-semibold"
                  >
                    Your name
                  </label>

                  <input
                    id="story-name"
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-[#CFDAD0] bg-[#F5F9F5] px-3 py-2.5 text-sm outline-none focus:border-[#087653]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="story-country"
                      className="mb-1.5 block text-xs font-semibold"
                    >
                      Destination
                    </label>

                    <input
                      id="story-country"
                      required
                      value={form.country}
                      onChange={(event) =>
                        setForm({ ...form, country: event.target.value })
                      }
                      placeholder="e.g. Australia"
                      className="w-full rounded-lg border border-[#CFDAD0] bg-[#F5F9F5] px-3 py-2.5 text-sm outline-none focus:border-[#087653]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="story-category"
                      className="mb-1.5 block text-xs font-semibold"
                    >
                      Journey type
                    </label>

                    <select
                      id="story-category"
                      value={form.category}
                      onChange={(event) =>
                        setForm({ ...form, category: event.target.value })
                      }
                      className="w-full rounded-lg border border-[#CFDAD0] bg-[#F5F9F5] px-3 py-2.5 text-sm outline-none focus:border-[#087653]"
                    >
                      <option>Student Visa</option>
                      <option>Work Visa</option>
                      <option>Visit Visa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="story-description"
                    className="mb-1.5 block text-xs font-semibold"
                  >
                    Your story
                  </label>

                  <textarea
                    id="story-description"
                    required
                    minLength={20}
                    maxLength={1500}
                    rows={5}
                    value={form.story}
                    onChange={(event) =>
                      setForm({ ...form, story: event.target.value })
                    }
                    placeholder="Share your experience and advice..."
                    className="w-full resize-y rounded-lg border border-[#CFDAD0] bg-[#F5F9F5] px-3 py-2.5 text-sm outline-none focus:border-[#087653]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#087653] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#066547]"
                >
                  Submit story for review
                </button>

                <p className="text-xs leading-5 text-[#718077]">
                  Demo only: submitting this form does not publish or
                  permanently save your story.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}