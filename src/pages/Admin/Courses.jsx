
import { useMemo, useState } from 'react'
import {
  BookOpen,
  Search,
  Plus,
  Upload,
  Pencil,
  Eye,
  X,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  SlidersHorizontal,
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
    duration: '2 Years',
    tuition: '32000',
    currency: 'AUD',
    ielts: '6.5',
    intake: 'Jan / Feb',
    status: 'Active',
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
    tuition: '28500',
    currency: 'AUD',
    ielts: '6.0',
    intake: 'Jul / Aug',
    status: 'Active',
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
    tuition: '24000',
    currency: 'GBP',
    ielts: '6.5',
    intake: 'Sep / Oct',
    status: 'Active',
    featured: false,
  },
  {
    id: 4,
    title: 'PhD Computer Science',
    university: 'University of Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    level: 'PhD',
    field: 'Computer Science',
    duration: '3-4 Years',
    tuition: '31000',
    currency: 'AUD',
    ielts: '6.5',
    intake: 'Feb / Mar',
    status: 'Active',
    featured: false,
  },
  {
    id: 5,
    title: 'Bachelor of Nursing',
    university: 'University of Queensland',
    country: 'Australia',
    flag: '🇦🇺',
    level: "Bachelor's",
    field: 'Nursing',
    duration: '3 Years',
    tuition: '38000',
    currency: 'AUD',
    ielts: '7.0',
    intake: 'Jan / Feb',
    status: 'Active',
    featured: false,
  },
  {
    id: 6,
    title: 'MSc Applied Computing',
    university: 'University of Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    level: 'MSc',
    field: 'Computer Science',
    duration: '16 Months',
    tuition: '28000',
    currency: 'CAD',
    ielts: '7.0',
    intake: 'Sep / Oct',
    status: 'Active',
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
    tuition: '42000',
    currency: 'CAD',
    ielts: '6.5',
    intake: 'Jan / Feb',
    status: 'Active',
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
    tuition: '1500',
    currency: 'EUR',
    ielts: '6.5',
    intake: 'Oct / Nov',
    status: 'Active',
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
    tuition: '34000',
    currency: 'AUD',
    ielts: '6.0',
    intake: 'Feb / Mar',
    status: 'Active',
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
    tuition: '21000',
    currency: 'GBP',
    ielts: '7.0',
    intake: 'Sep / Oct',
    status: 'Active',
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
    tuition: '12000',
    currency: 'AUD',
    ielts: '5.5',
    intake: 'Jan / Feb',
    status: 'Active',
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
    tuition: '25000',
    currency: 'CAD',
    ielts: '6.5',
    intake: 'Sep / Oct',
    status: 'Needs Update',
    featured: false,
  },
]

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-[#EFF4FF] px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#087653] focus:ring-2 focus:ring-emerald-100'

function Field({ label, children }) {
  return (
    <label className="block min-w-0 text-sm font-medium text-slate-700">
      {label}
      {children}
    </label>
  )
}

function MetricCard({ label, value, note, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className={`rounded-xl p-2.5 ${color}`}>
          <Icon size={20} />
        </div>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
          {note}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-[#075B3B]">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
      <div className="mt-4 h-1.5 rounded-full bg-slate-100">
        <div className="h-1.5 w-3/4 rounded-full bg-[#087653]" />
      </div>
    </div>
  )
}

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses)
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('All Countries')
  const [levelFilter, setLevelFilter] = useState('All Levels')
  const [fieldFilter, setFieldFilter] = useState('All Fields')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [selectedIds, setSelectedIds] = useState([])
  const [editingCourse, setEditingCourse] = useState(null)
  const [notice, setNotice] = useState('')
  const [page, setPage] = useState(1)

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
        (countryFilter === 'All Countries' ||
          course.country === countryFilter) &&
        (levelFilter === 'All Levels' || course.level === levelFilter) &&
        (fieldFilter === 'All Fields' || course.field === fieldFilter) &&
        (statusFilter === 'All Statuses' || course.status === statusFilter)
      )
    })
  }, [
    courses,
    search,
    countryFilter,
    levelFilter,
    fieldFilter,
    statusFilter,
  ])

  const pageSize = 12
  const pageCount = Math.max(1, Math.ceil(filteredCourses.length / pageSize))
  const visibleCourses = filteredCourses.slice(
    (page - 1) * pageSize,
    page * pageSize,
  )

  const activeCount = courses.filter((course) => course.status === 'Active').length
  const pendingCount = courses.filter(
    (course) => course.status === 'Needs Update' || course.status === 'Pending',
  ).length

  function updateFilter(setter, value) {
    setter(value)
    setPage(1)
  }

  function toggleSelected(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  function toggleAllVisible(checked) {
    setSelectedIds((current) => {
      const visibleIds = visibleCourses.map((course) => course.id)
      if (checked) return [...new Set([...current, ...visibleIds])]
      return current.filter((id) => !visibleIds.includes(id))
    })
  }

  function saveCourse(event) {
    event.preventDefault()

    if (!editingCourse) return

    if (
      !editingCourse.title.trim() ||
      !editingCourse.university.trim() ||
      !editingCourse.duration.trim() ||
      !editingCourse.tuition.trim()
    ) {
      setNotice('Please complete all required fields.')
      return
    }

    setCourses((current) =>
      current.map((course) =>
        course.id === editingCourse.id ? { ...editingCourse } : course,
      ),
    )

    setNotice(`"${editingCourse.title}" was updated successfully.`)
    setEditingCourse(null)
  }

  function addCourse() {
    const newCourse = {
      id: Math.max(0, ...courses.map((course) => course.id)) + 1,
      title: 'New Course',
      university: '',
      country: 'Australia',
      flag: '🇦🇺',
      level: "Master's",
      field: 'Computer Science',
      duration: '2 Years',
      tuition: '25000',
      currency: 'AUD',
      ielts: '6.5',
      intake: 'Jan / Feb',
      status: 'Active',
      featured: false,
    }

    setEditingCourse(newCourse)
    setNotice('')
  }

  function exportCourses() {
    const header = [
      'Course Title',
      'University',
      'Country',
      'Level',
      'Field',
      'Duration',
      'Tuition',
      'Currency',
      'IELTS',
      'Intake',
      'Status',
    ]

    const rows = filteredCourses.map((course) => [
      course.title,
      course.university,
      course.country,
      course.level,
      course.field,
      course.duration,
      course.tuition,
      course.currency,
      course.ielts,
      course.intake,
      course.status,
    ])

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\n')

    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8;' }),
    )
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'agency-courses.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function updateEditing(field, value) {
    setEditingCourse((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="min-h-full bg-[#F0F7F4] text-slate-900">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
            <span>Agency</span>
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span className="font-semibold text-[#075B3B]">Overview</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-2 text-[#087653]">
              <BookOpen size={21} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Course Management</h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage courses, degrees, and university information.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportCourses}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
          >
            <Upload size={16} />
            Export CSV
          </button>
          <button
            onClick={addCourse}
            className="inline-flex items-center gap-2 rounded-xl bg-[#075B3B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#06492F]"
          >
            <Plus size={17} />
            Add Course
          </button>
        </div>
      </div>

      {notice && (
        <div
          className={`mb-4 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${
            notice.includes('successfully')
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}
        >
          <span>{notice}</span>
          <button onClick={() => setNotice('')} aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Courses"
          value={courses.length.toLocaleString()}
          note="+3.8% this quarter"
          icon={BookOpen}
          color="bg-emerald-100 text-emerald-800"
        />
        <MetricCard
          label="Pending Review"
          value={pendingCount}
          note="Requires review"
          icon={AlertTriangle}
          color="bg-red-100 text-red-700"
        />
        <MetricCard
          label="Active Courses"
          value={activeCount}
          note="Published"
          icon={CheckCircle}
          color="bg-blue-100 text-blue-800"
        />
        <MetricCard
          label="Fields of Study"
          value={new Set(courses.map((course) => course.field)).size}
          note="Across all courses"
          icon={SlidersHorizontal}
          color="bg-violet-100 text-violet-800"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 p-4 md:grid-cols-2 xl:grid-cols-5">
          <label className="relative xl:col-span-2">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => updateFilter(setSearch, event.target.value)}
              placeholder="Search course title or university..."
              className="w-full rounded-xl border border-slate-200 bg-[#EFF4FF] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#087653]"
            />
          </label>

          <select
            value={countryFilter}
            onChange={(event) =>
              updateFilter(setCountryFilter, event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-[#EFF4FF] px-3 py-2.5 text-sm outline-none"
          >
            {[
              'All Countries',
              ...new Set(courses.map((course) => course.country)),
            ].map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>

          <select
            value={levelFilter}
            onChange={(event) => updateFilter(setLevelFilter, event.target.value)}
            className="rounded-xl border border-slate-200 bg-[#EFF4FF] px-3 py-2.5 text-sm outline-none"
          >
            {[
              'All Levels',
              ...new Set(courses.map((course) => course.level)),
            ].map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>

          <select
            value={fieldFilter}
            onChange={(event) => updateFilter(setFieldFilter, event.target.value)}
            className="rounded-xl border border-slate-200 bg-[#EFF4FF] px-3 py-2.5 text-sm outline-none"
          >
            {[
              'All Fields',
              ...new Set(courses.map((course) => course.field)),
            ].map((field) => (
              <option key={field}>{field}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => updateFilter(setStatusFilter, event.target.value)}
            className="rounded-xl border border-slate-200 bg-[#EFF4FF] px-3 py-2.5 text-sm outline-none"
          >
            {['All Statuses', 'Active', 'Pending', 'Needs Update', 'Inactive'].map(
              (status) => (
                <option key={status}>{status}</option>
              ),
            )}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#EDF2FF] text-xs uppercase tracking-wide text-slate-700">
              <tr>
                <th className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={
                      visibleCourses.length > 0 &&
                      visibleCourses.every((course) =>
                        selectedIds.includes(course.id),
                      )
                    }
                    onChange={(event) => toggleAllVisible(event.target.checked)}
                    aria-label="Select visible courses"
                  />
                </th>
                <th className="px-4 py-4">Course Title</th>
                <th className="px-4 py-4">University</th>
                <th className="px-4 py-4">Country</th>
                <th className="px-4 py-4">Level</th>
                <th className="px-4 py-4">Tuition / Year</th>
                <th className="px-4 py-4">IELTS</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {visibleCourses.map((course) => (
                <tr
                  key={course.id}
                  className={`transition hover:bg-slate-50 ${
                    course.status === 'Needs Update' ? 'bg-red-50/40' : ''
                  }`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(course.id)}
                      onChange={() => toggleSelected(course.id)}
                      aria-label={`Select ${course.title}`}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900">{course.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{course.duration}</p>
                    {course.featured && (
                      <span className="mt-1 inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-slate-700">{course.university}</td>
                  <td className="px-4 py-4">
                    <span className="mr-1.5">{course.flag}</span>
                    {course.country}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                      {course.level}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-[#075B3B]">
                    {course.currency} {Number(course.tuition || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4">{course.ielts}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        course.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : course.status === 'Needs Update'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCourse({ ...course })
                          setNotice('')
                        }}
                        className="rounded-lg p-2 text-slate-600 hover:bg-emerald-50 hover:text-[#087653]"
                        title="Edit course"
                        aria-label={`Edit ${course.title}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setNotice(
                            `${course.title} — ${course.university}, ${course.country}. Status: ${course.status}.`,
                          )
                        }}
                        className="rounded-lg p-2 text-slate-600 hover:bg-blue-50"
                        title="View course details"
                        aria-label={`View ${course.title}`}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {visibleCourses.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                    No courses match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-4">
          <div className="text-sm text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-800">
              {filteredCourses.length === 0
                ? 0
                : (page - 1) * pageSize + 1}
              –
              {Math.min(page * pageSize, filteredCourses.length)}
            </span>{' '}
            of {filteredCourses.length} courses
            {selectedIds.length > 0 && (
              <span className="ml-2 text-[#087653]">
                · {selectedIds.length} selected
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <span className="rounded-lg bg-[#075B3B] px-3 py-2 text-sm font-semibold text-white">
              {page}
            </span>
            <button
              disabled={page >= pageCount}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {editingCourse && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <button
            type="button"
            aria-label="Close edit panel"
            onClick={() => setEditingCourse(null)}
            className="absolute inset-0 bg-slate-950/30"
          />

          <aside className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {courses.some((course) => course.id === editingCourse.id)
                    ? 'Edit Course'
                    : 'Add Course'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update course and university information
                </p>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={saveCourse}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
                <Field label="Course Title *">
                  <input
                    required
                    value={editingCourse.title}
                    onChange={(event) => updateEditing('title', event.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="University *">
                  <input
                    required
                    value={editingCourse.university}
                    onChange={(event) =>
                      updateEditing('university', event.target.value)
                    }
                    className={inputClass}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Country">
                    <select
                      value={editingCourse.country}
                      onChange={(event) => {
                        const country = event.target.value
                        const flags = {
                          Australia: '🇦🇺',
                          Canada: '🇨🇦',
                          'United Kingdom': '🇬🇧',
                          Germany: '🇩🇪',
                          Ireland: '🇮🇪',
                          'New Zealand': '🇳🇿',
                          Singapore: '🇸🇬',
                          USA: '🇺🇸',
                        }
                        setEditingCourse((current) => ({
                          ...current,
                          country,
                          flag: flags[country] || '🌍',
                        }))
                      }}
                      className={inputClass}
                    >
                      {[
                        'Australia',
                        'Canada',
                        'United Kingdom',
                        'Germany',
                        'Ireland',
                        'New Zealand',
                        'Singapore',
                        'USA',
                      ].map((country) => (
                        <option key={country}>{country}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Level">
                    <select
                      value={editingCourse.level}
                      onChange={(event) => updateEditing('level', event.target.value)}
                      className={inputClass}
                    >
                      {[
                        "Bachelor's",
                        "Master's",
                        'MSc',
                        'MBA',
                        'PhD',
                        'Diploma',
                      ].map((level) => (
                        <option key={level}>{level}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Field of Study">
                  <select
                    value={editingCourse.field}
                    onChange={(event) => updateEditing('field', event.target.value)}
                    className={inputClass}
                  >
                    {[
                      'Computer Science',
                      'Cyber Security',
                      'Information Technology',
                      'Data Science',
                      'Business',
                      'Nursing',
                      'Engineering',
                      'Health Sciences',
                    ].map((field) => (
                      <option key={field}>{field}</option>
                    ))}
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Duration *">
                    <input
                      required
                      value={editingCourse.duration}
                      onChange={(event) =>
                        updateEditing('duration', event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>
                  <Field label="IELTS Requirement">
                    <input
                      value={editingCourse.ielts}
                      onChange={(event) => updateEditing('ielts', event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-[1fr_110px] gap-3">
                  <Field label="Tuition per Year *">
                    <input
                      required
                      type="number"
                      min="0"
                      value={editingCourse.tuition}
                      onChange={(event) =>
                        updateEditing('tuition', event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Currency">
                    <select
                      value={editingCourse.currency}
                      onChange={(event) =>
                        updateEditing('currency', event.target.value)
                      }
                      className={inputClass}
                    >
                      {['AUD', 'CAD', 'GBP', 'EUR', 'USD', 'NZD', 'SGD'].map(
                        (currency) => (
                          <option key={currency}>{currency}</option>
                        ),
                      )}
                    </select>
                  </Field>
                </div>

                <Field label="Available Intake">
                  <select
                    value={editingCourse.intake}
                    onChange={(event) => updateEditing('intake', event.target.value)}
                    className={inputClass}
                  >
                    {[
                      'Jan / Feb',
                      'Mar / Apr',
                      'May / Jun',
                      'Jul / Aug',
                      'Sep / Oct',
                      'Oct / Nov',
                    ].map((intake) => (
                      <option key={intake}>{intake}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Status">
                  <select
                    value={editingCourse.status}
                    onChange={(event) => updateEditing('status', event.target.value)}
                    className={inputClass}
                  >
                    {['Active', 'Pending', 'Needs Update', 'Inactive'].map(
                      (status) => (
                        <option key={status}>{status}</option>
                      ),
                    )}
                  </select>
                </Field>

                <label className="flex cursor-pointer items-center justify-between rounded-xl bg-[#EFF4FF] p-4">
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Featured Course
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Highlight this course on public pages
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={editingCourse.featured}
                    onChange={(event) =>
                      updateEditing('featured', event.target.checked)
                    }
                    className="h-4 w-4 accent-[#087653]"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 bg-white p-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#075B3B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#06492F]"
                >
                  <CheckCircle size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  )
}
