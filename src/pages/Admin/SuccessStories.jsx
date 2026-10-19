

import { useMemo, useState } from 'react'
import {
  MessageSquare,
  ClipboardCheck,
  Star,
  ThumbsUp,
  Search,
  Download,
  Plus,
  Check,
  X,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Globe,
  Clock,
  Building2,
  ShieldCheck,
  Filter,
  CalendarCheck,
} from 'lucide-react'

const initialStories = [
  {
    id: 1,
    name: 'Ashan Kumara',
    initials: 'AK',
    visa: 'Subclass 500 Student Visa',
    destination: 'Melbourne, Australia',
    university: 'Monash University',
    course: 'Master of Information Technology',
    agency: 'Apex Education Colombo',
    quote:
      'Using Agency helped me verify genuine education consultants in Colombo. I avoided two unverified agents and got my Subclass 500 visa approved smoothly in 4 weeks with precise financial documentation assistance.',
    views: 224,
    helpful: 47,
    readTime: 5,
    age: '2 days ago',
    status: 'Pending Review',
    featured: false,
    category: 'Student Visa',
  },
  {
    id: 2,
    name: 'Nimesha Rathnayake',
    initials: 'NR',
    visa: 'Provincial Nominee Work Permit',
    destination: 'Ontario, Canada',
    university: 'Toronto Tech Hub',
    course: 'Senior Software Engineer (LMIA)',
    agency: 'Maple Pathways Kandy',
    quote:
      'The document checklist and immigration score calculator gave me full confidence before applying for my provincial nominee work permit. The certified agency verified every reference letter.',
    views: 412,
    helpful: 89,
    readTime: 4,
    age: '1 week ago',
    status: 'Approved',
    featured: false,
    category: 'Work Visa',
  },
  {
    id: 3,
    name: 'Sachini Perera',
    initials: 'SP',
    visa: 'Tier 4 UK Student Visa',
    destination: 'London, United Kingdom',
    university: "King's College London",
    course: 'MSc Nursing Clinical Practice',
    agency: 'NHS Trust Pathway Sponsor',
    quote:
      'Fantastic transparency. Found an authorized NHS sponsorship pathway and connected with verified London advisors through the platform. Guided me through tuberculosis clearance and CAS statement seamlessly.',
    views: 1280,
    helpful: 312,
    readTime: 6,
    age: '2 weeks ago',
    status: 'Featured',
    featured: true,
    category: 'Student Visa',
  },
  {
    id: 4,
    name: 'Dilshan Kumar',
    initials: 'DK',
    visa: 'Student Visa (Subclass 500)',
    destination: 'Sydney, Australia',
    university: 'UNSW Sydney',
    course: 'Master of Cyber Security',
    agency: 'International Merit Scholarship',
    quote:
      'Applied for Master of Cyber Security and received scholarship guidance that covered 20% of tuition. Crucial advice on genuine temporary entrant requirements made the difference.',
    views: 188,
    helpful: 34,
    readTime: 3,
    age: '3 weeks ago',
    status: 'Pending Review',
    featured: false,
    category: 'Student Visa',
  },
  {
    id: 5,
    name: 'Priya Mendis',
    initials: 'PM',
    visa: 'Express Entry PR Pathway',
    destination: 'Montreal, Canada',
    university: 'McGill University Alumni',
    course: 'Computer Science & AI Research',
    agency: 'CRS Score: 512',
    quote:
      'Clear PR point system breakdown and express entry profile verification. The step-by-step guidance on French language test credits tipped my CRS score past the cutoff threshold without legal headaches.',
    views: 650,
    helpful: 120,
    readTime: 5,
    age: '1 month ago',
    status: 'Approved',
    featured: false,
    category: 'Work Visa',
  },
  {
    id: 6,
    name: 'Raj Fernando',
    initials: 'RJ',
    visa: 'National Visa (Type D)',
    destination: 'Munich, Germany',
    university: 'Technical University of Munich',
    course: 'MSc Mechanical & Systems Engineering',
    agency: 'APS Certificate Verified',
    quote:
      'Blocked account guidance and German consulate checklist were spot on. The community forum answered all my questions regarding health insurance and accommodation registration in Bavaria.',
    views: 940,
    helpful: 208,
    readTime: 4,
    age: '1 month ago',
    status: 'Featured',
    featured: true,
    category: 'Student Visa',
  },
  {
    id: 7,
    name: 'Tharushi Silva',
    initials: 'TS',
    visa: 'Visitor Visa',
    destination: 'London, United Kingdom',
    university: 'Travel and Tourism',
    course: 'Visitor Visa Documentation',
    agency: 'Verified Travel Consultant',
    quote:
      'The visitor visa checklist helped me organize my documents and understand the application process before submitting my application.',
    views: 156,
    helpful: 28,
    readTime: 3,
    age: '6 weeks ago',
    status: 'Approved',
    featured: false,
    category: 'Visit Visa',
  },
  {
    id: 8,
    name: 'Kavindu Perera',
    initials: 'KP',
    visa: 'Student Visa',
    destination: 'Auckland, New Zealand',
    university: 'University of Auckland',
    course: 'Bachelor of Information Systems',
    agency: 'Student Support Centre',
    quote:
      'The platform helped me compare universities, understand visa requirements and prepare my application with greater confidence.',
    views: 305,
    helpful: 62,
    readTime: 4,
    age: '2 months ago',
    status: 'Approved',
    featured: false,
    category: 'Student Visa',
  },
]

const tabs = ['All Stories', 'Pending Review', 'Approved', 'Featured Spotlight']

const badgeStyles = {
  'Pending Review': 'bg-red-100 text-red-800',
  Approved: 'bg-emerald-100 text-emerald-800',
  Featured: 'bg-blue-100 text-blue-800',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
        badgeStyles[status] || 'bg-slate-100 text-slate-700'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, note, iconClass }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-lg p-2 ${iconClass}`}>
          <Icon size={19} />
        </span>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-800">
          {note}
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-emerald-950">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
    </div>
  )
}

export default function SuccessStories() {
  const [stories, setStories] = useState(initialStories)
  const [activeTab, setActiveTab] = useState('All Stories')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [destination, setDestination] = useState('All Destinations')
  const [sort, setSort] = useState('Most Recent')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(1)
  const [notice, setNotice] = useState('')
  const [menuId, setMenuId] = useState(null)

  const pendingCount = stories.filter(
    (story) => story.status === 'Pending Review',
  ).length

  const approvedCount = stories.filter(
    (story) => story.status === 'Approved',
  ).length

  const featuredCount = stories.filter((story) => story.featured).length

  const filteredStories = useMemo(() => {
    let result = [...stories]

    if (activeTab === 'Pending Review') {
      result = result.filter((story) => story.status === 'Pending Review')
    } else if (activeTab === 'Approved') {
      result = result.filter((story) => story.status === 'Approved')
    } else if (activeTab === 'Featured Spotlight') {
      result = result.filter((story) => story.featured)
    }

    if (category !== 'All Categories') {
      result = result.filter((story) => story.category === category)
    }

    if (destination !== 'All Destinations') {
      result = result.filter((story) =>
        story.destination.includes(destination),
      )
    }

    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter((story) =>
        [
          story.name,
          story.university,
          story.destination,
          story.course,
          story.agency,
          story.quote,
        ]
          .join(' ')
          .toLowerCase()
          .includes(term),
      )
    }

    if (sort === 'Most Helpful') {
      result.sort((a, b) => b.helpful - a.helpful)
    } else if (sort === 'Most Viewed') {
      result.sort((a, b) => b.views - a.views)
    }

    return result
  }, [stories, activeTab, category, destination, search, sort])

  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(filteredStories.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStories = filteredStories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  function updateStory(id, updates, message) {
    setStories((current) =>
      current.map((story) =>
        story.id === id ? { ...story, ...updates } : story,
      ),
    )
    setNotice(message)
    setMenuId(null)
  }

  function toggleSelected(id) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  function approveSelected() {
    if (!selected.length) {
      setNotice('Select at least one story first.')
      return
    }

    setStories((current) =>
      current.map((story) =>
        selected.includes(story.id)
          ? { ...story, status: 'Approved' }
          : story,
      ),
    )
    setSelected([])
    setNotice('Selected stories approved.')
  }

  function exportStories() {
    const rows = [
      ['Name', 'Visa', 'Destination', 'Category', 'Status', 'Views', 'Helpful'],
      ...filteredStories.map((story) => [
        story.name,
        story.visa,
        story.destination,
        story.category,
        story.status,
        story.views,
        story.helpful,
      ]),
    ]

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','),
      )
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'agency-success-stories.csv'
    link.click()
    URL.revokeObjectURL(url)
    setNotice('Stories exported to CSV.')
  }

  function addStory() {
    const newStory = {
      id: Date.now(),
      name: 'New Applicant',
      initials: 'NA',
      visa: 'Student Visa',
      destination: 'Australia',
      university: 'University to be confirmed',
      course: 'Course to be confirmed',
      agency: 'Pending verification',
      quote: 'Add the applicant’s approved success story here.',
      views: 0,
      helpful: 0,
      readTime: 1,
      age: 'Just now',
      status: 'Pending Review',
      featured: false,
      category: 'Student Visa',
    }

    setStories((current) => [newStory, ...current])
    setActiveTab('All Stories')
    setPage(1)
    setNotice('A draft story was added. Edit its content before publishing.')
  }

  return (
    <div className="min-h-full bg-[#f3f6ff] px-4 py-5 text-slate-900 sm:px-6 lg:px-7">
      <div className="mx-auto max-w-[1600px]">
        {/* Page heading */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-900">
              <MessageSquare size={22} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  Success Stories
                </h1>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-900">
                  Moderation Mode
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Review, approve, and spotlight authentic applicant journeys across accredited agencies.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportStories}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={addStory}
              className="inline-flex items-center gap-2 rounded-lg bg-[#004b32] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#006344]"
            >
              <Plus size={17} />
              Add Story
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={MessageSquare}
            label="Total Stories"
            value={284 + stories.length - initialStories.length}
            note="+18 this month"
            iconClass="bg-emerald-100 text-emerald-800"
          />
          <StatCard
            icon={ClipboardCheck}
            label="Pending Approval"
            value={pendingCount}
            note={`${pendingCount} need review`}
            iconClass="bg-red-100 text-red-700"
          />
          <StatCard
            icon={Star}
            label="Featured Stories"
            value={48 + featuredCount - 2}
            note="Homepage spotlight"
            iconClass="bg-blue-100 text-blue-800"
          />
          <StatCard
            icon={ThumbsUp}
            label="Avg Candidate Rating"
            value="4.8 ★★★★★"
            note="Verified readers"
            iconClass="bg-emerald-100 text-emerald-800"
          />
        </div>

        {/* Search and filters */}
        <div className="mb-4 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="mb-3 flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const count =
                tab === 'All Stories'
                  ? stories.length
                  : tab === 'Pending Review'
                    ? pendingCount
                    : tab === 'Approved'
                      ? approvedCount
                      : featuredCount

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setPage(1)
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeTab === tab
                      ? 'bg-[#004b32] text-white'
                      : 'bg-[#eef3ff] text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {tab}
                  <span className="ml-2 opacity-80">{count}</span>
                </button>
              )
            })}
            <span className="ml-auto hidden items-center gap-1 self-center text-xs text-slate-500 xl:flex">
              <CalendarCheck size={13} />
              Live synchronization active
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_160px_160px_160px_auto]">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-[#f0f4ff] px-3 py-2">
              <Search size={16} className="shrink-0 text-slate-500" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Search story author, institution or pathway..."
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-500"
              />
            </label>

            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value)
                setPage(1)
              }}
              className="rounded-lg border border-slate-200 bg-[#f0f4ff] px-3 py-2 text-sm outline-none"
            >
              <option>All Categories</option>
              <option>Student Visa</option>
              <option>Work Visa</option>
              <option>Visit Visa</option>
            </select>

            <select
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value)
                setPage(1)
              }}
              className="rounded-lg border border-slate-200 bg-[#f0f4ff] px-3 py-2 text-sm outline-none"
            >
              <option>All Destinations</option>
              <option>Australia</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>New Zealand</option>
            </select>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-lg border border-slate-200 bg-[#f0f4ff] px-3 py-2 text-sm outline-none"
            >
              <option>Most Recent</option>
              <option>Most Helpful</option>
              <option>Most Viewed</option>
            </select>

            <button
              onClick={() => {
                setSearch('')
                setCategory('All Categories')
                setDestination('All Destinations')
                setSort('Most Recent')
                setActiveTab('All Stories')
                setPage(1)
              }}
              title="Reset filters"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-[#f0f4ff] px-3 py-2 text-slate-700 hover:bg-emerald-50"
            >
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <span className="text-sm font-medium text-emerald-950">
              {selected.length} story/stories selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={approveSelected}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <Check size={15} />
                Approve Selected
              </button>
              <button
                onClick={() => setSelected([])}
                className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Story cards */}
        <div className="space-y-3">
          {pageStories.map((story) => (
            <article
              key={story.id}
              className={`rounded-xl border border-slate-100 bg-white p-4 shadow-sm ${
                story.featured ? 'border-l-4 border-l-[#005b3b]' : ''
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(story.id)}
                      onChange={() => toggleSelected(story.id)}
                      aria-label={`Select ${story.name}`}
                      className="mt-3 h-4 w-4 accent-[#005b3b]"
                    />
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-900">
                      {story.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900">
                          {story.name}
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-medium text-emerald-900">
                          <ShieldCheck size={11} />
                          Visa Granted
                        </span>
                        {story.featured && (
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-900">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <CalendarCheck size={12} />
                          {story.visa}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Globe size={12} />
                          {story.destination}
                        </span>
                        <span className="text-amber-500">★★★★★</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-start">
                    <span className="text-xs text-slate-500">{story.age}</span>
                    <StatusBadge status={story.status} />
                  </div>
                </div>

                <div className="ml-0 flex flex-wrap gap-2 lg:ml-[68px]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-medium text-blue-900">
                    <Building2 size={11} />
                    {story.university}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium text-emerald-900">
                    <ShieldCheck size={11} />
                    {story.course}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-700">
                    Agency: {story.agency}
                  </span>
                </div>

                <p className="text-sm leading-6 text-slate-700 lg:ml-[68px]">
                  “{story.quote}”
                </p>

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Eye size={13} />
                      {story.views.toLocaleString()} views
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ThumbsUp size={13} />
                      {story.helpful} helpful
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} />
                      {story.readTime} min read
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {story.status === 'Pending Review' && (
                      <>
                        <button
                          onClick={() =>
                            updateStory(
                              story.id,
                              { status: 'Approved' },
                              `${story.name}'s story was approved.`,
                            )
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-300"
                        >
                          <Check size={13} />
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateStory(
                              story.id,
                              {
                                featured: !story.featured,
                                status: story.status,
                              },
                              story.featured
                                ? 'Story removed from featured spotlight.'
                                : 'Story added to featured spotlight.',
                            )
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-200"
                        >
                          <Star size={13} />
                          Feature
                        </button>
                        <button
                          onClick={() =>
                            updateStory(
                              story.id,
                              { status: 'Rejected' },
                              `${story.name}'s story was rejected.`,
                            )
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-800 hover:bg-red-200"
                        >
                          <X size={13} />
                          Reject
                        </button>
                      </>
                    )}

                    {story.status !== 'Pending Review' && (
                      <button
                        onClick={() =>
                          updateStory(
                            story.id,
                            { featured: !story.featured },
                            story.featured
                              ? 'Story removed from featured spotlight.'
                              : 'Story added to featured spotlight.',
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-200"
                      >
                        <Star size={13} />
                        {story.featured ? 'Unfeature' : 'Feature on Hero'}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setNotice(
                          `${story.name}: ${story.quote}`,
                        )
                      }
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      View
                    </button>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setMenuId(menuId === story.id ? null : story.id)
                        }
                        aria-label={`More actions for ${story.name}`}
                        className="rounded-lg bg-[#eef3ff] p-2 text-slate-700 hover:bg-slate-200"
                      >
                        <MoreVertical size={15} />
                      </button>
                      {menuId === story.id && (
                        <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                          <button
                            onClick={() =>
                              updateStory(
                                story.id,
                                { status: 'Pending Review' },
                                'Story returned to pending review.',
                              )
                            }
                            className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-100"
                          >
                            Return to review
                          </button>
                          <button
                            onClick={() =>
                              updateStory(
                                story.id,
                                { featured: !story.featured },
                                story.featured
                                  ? 'Story removed from featured spotlight.'
                                  : 'Story added to featured spotlight.',
                              )
                            }
                            className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-100"
                          >
                            {story.featured
                              ? 'Remove featured'
                              : 'Mark featured'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {pageStories.length === 0 && (
            <div className="rounded-xl border border-slate-100 bg-white px-6 py-12 text-center shadow-sm">
              <MessageSquare className="mx-auto mb-3 text-slate-400" size={32} />
              <h3 className="font-semibold text-slate-900">
                No stories found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter options.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-3 text-sm shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            Showing{' '}
            {filteredStories.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            –{Math.min(currentPage * pageSize, filteredStories.length)} of{' '}
            {filteredStories.length} candidate records
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="rounded-lg bg-[#eef3ff] p-2 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`min-w-8 rounded-lg px-3 py-2 text-xs font-semibold ${
                    currentPage === pageNumber
                      ? 'bg-[#004b32] text-white'
                      : 'bg-[#eef3ff] text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
              className="rounded-lg bg-[#eef3ff] p-2 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {notice && (
          <div className="fixed bottom-5 right-5 z-50 flex max-w-md items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-xl">
            <div className="rounded-full bg-emerald-100 p-1.5 text-emerald-800">
              <Check size={16} />
            </div>
            <p className="flex-1 text-sm text-slate-800">{notice}</p>
            <button
              onClick={() => setNotice('')}
              aria-label="Dismiss notification"
              className="text-slate-500 hover:text-slate-900"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
