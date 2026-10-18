
import { useMemo, useState } from 'react'
import {
  BookOpen,
  Clock,
  Plus,
  Search,
  Upload,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Pencil,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  RotateCcw,
} from 'lucide-react'

const initialCourses = [
  {
    id: 1,
    title: 'Master of Cyber Security',
    university: 'UNSW Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    level: "Master's",
    field: 'Cyber Security',
    duration: '2 Years Full-time',
    tuition: 32000,
    currency: 'AUD',
    ielts: '6.5',
    status: 'Active',
    intake: 'Jan / Feb',
    featured: true,
  },
  {
    id: 2,
    title: 'Master of IT (Cyber Security)',
    university: 'Deakin University',
    country: 'Australia',
    flag: '🇦🇺',
    level: "Master's",
    field: 'Information Technology',
    duration: '2 Years',
    tuition: 28500,
    currency: 'AUD',
    ielts: '6.0+',
    status: 'Active',
    intake: 'Jul / Aug',
    featured: false,
  },
  {
    id: 3,
    title: 'MSc Data Science & AI',
    university: 'University of Edinburgh',
    country: 'United Kingdom',
    flag: '🇬🇧',
    level: 'MSc',
    field: 'Data Science',
    duration: '1 Year',
    tuition: 24000,
    currency: 'GBP',
    ielts: '6.5',
    status: 'Active',
    intake: 'Sep / Oct',
    featured: true,
  },
  {
    id: 4,
    title: 'PhD Computer Science',
    university: 'University of Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    level: 'PhD',
    field: 'Computer Science',
    duration: '3–4 Years',
    tuition: 31000,
    currency: 'AUD',
    ielts: '6.5',
    status: 'Active',
    intake: 'Feb / Mar',
    featured: false,
  },
  {
    id: 5,
    title: 'Bachelor of Nursing',
    university: 'University of Queensland',
    country: 'Australia',
    flag: '🇦🇺',
    level: "Bachelor's",
    field: 'Healthcare',
    duration: '3 Years',
    tuition: 38000,
    currency: 'AUD',
    ielts: '7.0+',
    status: 'Active',
    intake: 'Feb / Jul',
    featured: false,
  },
  {
    id: 6,
    title: 'MSc Applied Computing',
    university: 'University of Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    level: 'MSc',
    field: 'Computing',
    duration: '16 Months',
    tuition: 28000,
    currency: 'CAD',
    ielts: '7.0+',
    status: 'Active',
    intake: 'Sep / Jan',
    featured: false,
  },
  {
    id: 7,
    title: 'MBA Business Management',
    university: 'Schulich Business School',
    country: 'Canada',
    flag: '🇨🇦',
    level: 'MBA',
    field: 'Business',
    duration: '2 Years',
    tuition: 42000,
    currency: 'CAD',
    ielts: '6.5+',
    status: 'Active',
    intake: 'Sep / Jan',
    featured: false,
  },
  {
    id: 8,
    title: 'Master in Informatics (Cyber)',
    university: 'TU Munich',
    country: 'Germany',
    flag: '🇩🇪',
    level: "Master's",
    field: 'Cyber Security',
    duration: '2 Years',
    tuition: 1500,
    currency: 'EUR',
    ielts: 'German B2',
    status: 'Active',
    intake: 'Oct / Apr',
    featured: false,
  },
  {
    id: 9,
    title: 'Bachelor of Engineering',
    university: 'Monash University',
    country: 'Australia',
    flag: '🇦🇺',
    level: "Bachelor's",
    field: 'Engineering',
    duration: '4 Years',
    tuition: 34000,
    currency: 'AUD',
    ielts: '6.0+',
    status: 'Active',
    intake: 'Feb / Jul',
    featured: false,
  },
  {
    id: 10,
    title: 'MSc Cyber Security',
    university: "King's College London",
    country: 'United Kingdom',
    flag: '🇬🇧',
    level: 'MSc',
    field: 'Cyber Security',
    duration: '1 Year',
    tuition: 21000,
    currency: 'GBP',
    ielts: '7.0+',
    status: 'Active',
    intake: 'Sep / Jan',
    featured: true,
  },
  {
    id: 11,
    title: 'Diploma of IT',
    university: 'TAFE NSW',
    country: 'Australia',
    flag: '🇦🇺',
    level: 'Diploma',
    field: 'Information Technology',
    duration: '1 Year',
    tuition: 12000,
    currency: 'AUD',
    ielts: '5.5+',
    status: 'Active',
    intake: 'Feb / Jul',
    featured: false,
  },
  {
    id: 12,
    title: 'MSc Computer Science',
    university: 'McGill University',
    country: 'Canada',
    flag: '🇨🇦',
    level: 'MSc',
    field: 'Computer Science',
    duration: '2 Years',
    tuition: 25000,
    currency: 'CAD',
    ielts: '6.5',
    status: 'Needs Update',
    intake: 'Sep / Jan',
    featured: false,
  },
]

const emptyCourse = {
  title: '',
  university: '',
  country: 'Australia',
  flag: '🇦🇺',
  level: "Master's",
  field: 'Information Technology',
  duration: '',
  tuition: '',
  currency: 'AUD',
  ielts: '6.5',
  status: 'Active',
  intake: 'Jan / Feb',
  featured: false,
}

const countries = [
  'All Countries',
  'Australia',
  'Canada',
  'United Kingdom',
  'Germany',
  'New Zealand',
]

const levels = [
  'All Levels',
  "Bachelor's",
  "Master's",
  'MSc',
  'PhD',
  'MBA',
  'Diploma',
]

const fields = [
  'All Fields',
  'Cyber Security',
  'Information Technology',
  'Computer Science',
  'Data Science',
  'Healthcare',
  'Business',
  'Engineering',
  'Computing',
]

function StatCard({ icon: Icon, label, value, note, tone = 'green' }) {
  const tones = {
    green: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-800',
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-[#075B3B] sm:text-3xl">
            {value}
          </p>
        </div>
        <div className={`rounded-xl p-2.5 ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
      <div className="mt-4 h-1.5 rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${
            tone === 'red' ? 'bg-red-500' : 'bg-[#087653]'
          }`}
          style={{ width: tone === 'red' ? '35%' : '78%' }}
        />
      </div>
    </div>
  )
}

function CourseForm({ course, onClose, onSave }) {
  const [form, setForm] = useState(course)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !form.title.trim() ||
      !form.university.trim() ||
      !form.duration.trim() ||
      form.tuition === '' ||
      Number(form.tuition) < 0
    ) {
      window.alert('Please complete all required fields with valid values.')
      return
    }

    onSave({
      ...form,
      tuition: Number(form.tuition),
      flag:
        form.country === 'Australia'
          ? '🇦🇺'
          : form.country === 'Canada'
            ? '🇨🇦'
            : form.country === 'United Kingdom'
              ? '🇬🇧'
              : form.country === 'Germany'
                ? '🇩🇪'
                : '🇳🇿',
    })
  }

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F0F5FF] px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#087653] focus:ring-2 focus:ring-emerald-100'

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/30">
      <button
        type="button"
        aria-label="Close course form"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <section className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <header className="flex items-start justify-between border-b border-slate-100 bg-[#F0F5FF] p-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {course.id ? 'Edit Course' : 'Add Course'}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Update course and university information
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-white"
          >
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto p-5">
          <label className="block text-sm font-medium text-slate-700">
            Course Title *
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. Master of Cyber Security"
              required
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            University *
            <input
              className={inputClass}
              value={form.university}
              onChange={(e) => update('university', e.target.value)}
              placeholder="University name"
              required
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-slate-700">
              Country
              <select
                className={inputClass}
                value={form.country}
                onChange={(e) => update('country', e.target.value)}
              >
                {countries.slice(1).map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Level
              <select
                className={inputClass}
                value={form.level}
                onChange={(e) => update('level', e.target.value)}
              >
                {levels.slice(1).map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Field of Study
            <select
              className={inputClass}
              value={form.field}
              onChange={(e) => update('field', e.target.value)}
            >
              {fields.slice(1).map((field) => (
                <option key={field}>{field}</option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-slate-700">
              Duration *
              <input
                className={inputClass}
                value={form.duration}
                onChange={(e) => update('duration', e.target.value)}
                placeholder="2 Years Full-time"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              IELTS Requirement
              <input
                className={inputClass}
                value={form.ielts}
                onChange={(e) => update('ielts', e.target.value)}
                placeholder="6.5"
              />
            </label>
          </div>

          <div className="grid grid-cols-[1fr_100px] gap-3">
            <label className="block text-sm font-medium text-slate-700">
              Tuition per Year *
              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.tuition}
                onChange={(e) => update('tuition', e.target.value)}
                placeholder="32000"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Currency
              <select
                className={inputClass}
                value={form.currency}
                onChange={(e) => update('currency', e.target.value)}
              >
                {['AUD', 'CAD', 'GBP', 'EUR', 'NZD'].map((currency) => (
                  <option key={currency}>{currency}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Available Intake
            <select
              className={inputClass}
              value={form.intake}
              onChange={(e) => update('intake', e.target.value)}
            >
              {['Jan / Feb', 'Mar / Apr', 'Jul / Aug', 'Sep / Oct'].map(
                (intake) => (
                  <option key={intake}>{intake}</option>
                ),
              )}
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Status
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
            >
              <option>Active</option>
              <option>Needs Update</option>
              <option>Inactive</option>
            </select>
          </label>

          <label className="flex items-center justify-between rounded-xl bg-[#F0F5FF] p-3">
            <span>
              <span className="block text-sm font-semibold text-slate-800">
                Featured Course
              </span>
              <span className="text-xs text-slate-500">
                Highlight this course on public pages
              </span>
            </span>
            <input
              type="checkbox"
              checked={Boolean(form.featured)}
              onChange={(e) => update('featured', e.target.checked)}
              className="h-4 w-4 accent-[#087653]"
            />
          </label>
        </form>

        <footer className="flex justify-end gap-3 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={() => {
              const formElement = document.querySelector('#course-editor-form')
              if (formElement) formElement.requestSubmit()
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#075B3B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#064A30]"
          >
            <CheckCircle size={16} />
            Save Changes
          </button>
        </footer>
      </section>
    </div>
  )
}

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses)
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All Countries')
  const [level, setLevel] = useState('All Levels')
  const [field, setField] = useState('All Fields')
  const [status, setStatus] = useState('All Statuses')
  const [selected, setSelected] = useState([])
  const [editingCourse, setEditingCourse] = useState(null)
  const [viewingCourse, setViewingCourse] = useState(null)
  const [page, setPage] = useState(1)
  const pageSize = 12

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase()

    return courses.filter((course) => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.university.toLowerCase().includes(query) ||
        course.country.toLowerCase().includes(query)

      return (
        matchesSearch &&
        (country === 'All Countries' || course.country === country) &&
        (level === 'All Levels' || course.level === level) &&
        (field === 'All Fields' || course.field === field) &&
        (status === 'All Statuses' || course.status === status)
      )
    })
  }, [courses, search, country, level, field, status])

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visibleCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  const activeCount = courses.filter((course) => course.status === 'Active').length
  const needsUpdateCount = courses.filter(
    (course) => course.status === 'Needs Update',
  ).length

  function resetFilters() {
    setSearch('')
    setCountry('All Countries')
    setLevel('All Levels')
    setField('All Fields')
    setStatus('All Statuses')
    setPage(1)
  }

  function toggleSelected(id) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  function saveCourse(course) {
    if (course.id) {
      setCourses((current) =>
        current.map((item) => (item.id === course.id ? course : item)),
      )
    } else {
      setCourses((current) => [
        { ...course, id: Date.now() },
        ...current,
      ])
      setPage(1)
    }

    setEditingCourse(null)
  }

  function exportCourses() {
    const headers = [
      'Title',
      'University',
      'Country',
      'Level',
      'Field',
      'Tuition',
      'Currency',
      'IELTS',
      'Status',
    ]

    const rows = filteredCourses.map((course) => [
      course.title,
      course.university,
      course.country,
      course.level,
      course.field,
      course.tuition,
      course.currency,
      course.ielts,
      course.status,
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'agency-courses.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-w-0 space-y-5 text-slate-800">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-emerald-100 p-3 text-[#087653]">
            <BookOpen size={22} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Course Management
              </h1>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-[#087653]">
                Institutional Database
              </span>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Manage all listed courses, degrees, and certified credentials
              across global partner universities.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportCourses}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Upload size={16} />
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => setEditingCourse({ ...emptyCourse })}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075B3B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#064A30]"
          >
            <Plus size={17} />
            Add Course
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={courses.length.toLocaleString()}
          note="↗ +3.8% this quarter"
          tone="green"
        />
        <StatCard
          icon={Clock}
          label="Pending Review"
          value={needsUpdateCount}
          note="Needs attention from the admin team"
          tone="red"
        />
        <StatCard
          icon={TrendingUp}
          label="Added This Month"
          value={Math.max(0, courses.length - initialCourses.length)}
          note="New course entries"
          tone="blue"
        />
        <StatCard
          icon={AlertTriangle}
          label="Needs Update"
          value={needsUpdateCount}
          note="Check fees and admission requirements"
          tone="amber"
        />
      </div>

      {/* Search and filters */}
      <section className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-6">
          <label className="relative sm:col-span-2 xl:col-span-2">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search course title or university..."
              className="w-full rounded-xl border border-slate-100 bg-[#F0F5FF] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#087653]"
            />
          </label>

          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-transparent bg-[#F0F5FF] px-3 py-2.5 text-sm outline-none focus:border-[#087653]"
          >
            {countries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-transparent bg-[#F0F5FF] px-3 py-2.5 text-sm outline-none focus:border-[#087653]"
          >
            {levels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={field}
            onChange={(e) => {
              setField(e.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-transparent bg-[#F0F5FF] px-3 py-2.5 text-sm outline-none focus:border-[#087653]"
          >
            {fields.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-transparent bg-[#F0F5FF] px-3 py-2.5 text-sm outline-none focus:border-[#087653]"
          >
            {['All Statuses', 'Active', 'Needs Update', 'Inactive'].map(
              (item) => (
                <option key={item}>{item}</option>
              ),
            )}
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            Showing {filteredCourses.length} matching course
            {filteredCourses.length === 1 ? '' : 's'}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-100"
          >
            <RotateCcw size={14} />
            Reset Filters
          </button>
        </div>
      </section>

      {/* Courses table */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="bg-[#EEF3FF] text-[11px] uppercase tracking-wide text-slate-600">
                <th className="w-12 px-4 py-4">
                  <input
                    type="checkbox"
                    aria-label="Select all visible courses"
                    checked={
                      visibleCourses.length > 0 &&
                      visibleCourses.every((course) =>
                        selected.includes(course.id),
                      )
                    }
                    onChange={(e) =>
                      setSelected((current) =>
                        e.target.checked
                          ? Array.from(
                              new Set([
                                ...current,
                                ...visibleCourses.map((course) => course.id),
                              ]),
                            )
                          : current.filter(
                              (id) =>
                                !visibleCourses.some(
                                  (course) => course.id === id,
                                ),
                            ),
                      )
                    }
                    className="h-4 w-4 accent-[#087653]"
                  />
                </th>
                <th className="px-3 py-4">Course Title</th>
                <th className="px-3 py-4">University</th>
                <th className="px-3 py-4">Country</th>
                <th className="px-3 py-4">Level</th>
                <th className="px-3 py-4">Tuition Fee</th>
                <th className="px-3 py-4">IELTS / Lang</th>
                <th className="px-3 py-4">Status</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleCourses.map((course) => (
                <tr
                  key={course.id}
                  className={`border-t border-slate-100 text-sm hover:bg-slate-50 ${
                    course.status === 'Needs Update' ? 'bg-red-50/40' : ''
                  }`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(course.id)}
                      onChange={() => toggleSelected(course.id)}
                      aria-label={`Select ${course.title}`}
                      className="h-4 w-4 accent-[#087653]"
                    />
                  </td>

                  <td className="max-w-56 px-3 py-4">
                    <div className="font-semibold text-slate-800">
                      {course.title}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {course.duration}
                    </div>
                    {course.featured && (
                      <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        Featured
                      </span>
                    )}
                  </td>

                  <td className="max-w-44 px-3 py-4 text-slate-600">
                    {course.university}
                  </td>

                  <td className="px-3 py-4">
                    <span className="mr-1.5">{course.flag}</span>
                    <span className="text-xs">{course.country}</span>
                  </td>

                  <td className="px-3 py-4">
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-slate-700">
                      {course.level}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 font-medium text-[#075B3B]">
                    {course.currency} {Number(course.tuition).toLocaleString()}
                    <span className="text-xs text-slate-400">/yr</span>
                  </td>

                  <td className="px-3 py-4">
                    <span className="rounded bg-blue-50 px-2 py-1 text-xs text-slate-700">
                      {course.ielts || '—'}
                    </span>
                  </td>

                  <td className="px-3 py-4">
                    <span
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        course.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : course.status === 'Needs Update'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {course.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingCourse({ ...course })}
                        title="Edit course"
                        aria-label={`Edit ${course.title}`}
                        className="rounded-lg p-2 text-slate-600 hover:bg-emerald-50 hover:text-[#087653]"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewingCourse(course)}
                        title="View course"
                        aria-label={`View ${course.title}`}
                        className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {visibleCourses.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-14 text-center text-sm text-slate-500"
                  >
                    No courses match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{' '}
            {filteredCourses.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            –
            {Math.min(currentPage * pageSize, filteredCourses.length)} of{' '}
            {filteredCourses.length.toLocaleString()} courses
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(
                Math.max(0, Math.min(currentPage - 2, totalPages - 3)),
                Math.max(0, Math.min(currentPage - 2, totalPages - 3)) + 3,
              )
              .map((pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`min-w-9 rounded-lg px-3 py-2 text-xs font-semibold ${
                    currentPage === pageNumber
                      ? 'bg-[#075B3B] text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Course details panel */}
      {viewingCourse && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/30">
          <button
            type="button"
            aria-label="Close course details"
            onClick={() => setViewingCourse(null)}
            className="absolute inset-0"
          />
          <section className="relative z-10 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Course Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review the selected course
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingCourse(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-[#F0F5FF] p-5">
              <div className="text-3xl">{viewingCourse.flag}</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                {viewingCourse.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {viewingCourse.university}
              </p>
              <span className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-[#087653]">
                {viewingCourse.status}
              </span>
            </div>

            <dl className="mt-5 space-y-4">
              {[
                ['Country', viewingCourse.country],
                ['Level', viewingCourse.level],
                ['Field of Study', viewingCourse.field],
                ['Duration', viewingCourse.duration],
                [
                  'Annual Tuition',
                  `${viewingCourse.currency} ${Number(
                    viewingCourse.tuition,
                  ).toLocaleString()}`,
                ],
                ['IELTS Requirement', viewingCourse.ielts || 'Not specified'],
                ['Intake', viewingCourse.intake],
                ['Featured', viewingCourse.featured ? 'Yes' : 'No'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3"
                >
                  <dt className="text-sm text-slate-500">{label}</dt>
                  <dd className="text-right text-sm font-semibold text-slate-800">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => {
                setEditingCourse({ ...viewingCourse })
                setViewingCourse(null)
              }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#075B3B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#064A30]"
            >
              <Pencil size={16} />
              Edit Course
            </button>
          </section>
        </div>
      )}

      {/* Add/edit course panel */}
      {editingCourse && (
        <CourseForm
          key={editingCourse.id || 'new-course'}
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSave={saveCourse}
        />
      )}
    </div>
  )
}
