import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Plus, ArrowRight, Shield, FileText } from 'lucide-react'

/* ══════════════════════════════════════
   COUNTRY DATA
══════════════════════════════════════ */
const COUNTRY_DATA = {
  Australia: {
    flag: '🇦🇺',
    tuition: '$20,000 – $45,000 AUD',
    visaFee: '$710 AUD',
    processing: '4 – 8 weeks',
    postStudy: '2 – 6 years',
    courses: ['Nursing', 'IT'],
    courseColors: ['#EBF7F1', '#047857', '#EEF2FF', '#3730A3'],
    costOfLiving: 'High',
    costColor: '#DC2626',
    prPathway: 'Structured',
    prColor: '#0D5C3A',
  },
  Canada: {
    flag: '🇨🇦',
    tuition: '$15,000 – $35,000 CAD',
    visaFee: '$150 CAD',
    processing: '8 – 12 weeks',
    postStudy: 'Up to 3 years',
    courses: ['Business', 'Engineering'],
    courseColors: ['#EEF2FF', '#3730A3', '#FEF9EE', '#C2410C'],
    costOfLiving: 'Moderate',
    costColor: '#0D5C3A',
    prPathway: 'Excellent',
    prColor: '#0D5C3A',
  },
  'United Kingdom': {
    flag: '🇬🇧',
    tuition: '£12,000 – £30,000 GBP',
    visaFee: '£363 GBP',
    processing: '3 weeks',
    postStudy: '2 years',
    courses: ['Finance', 'Medicine'],
    courseColors: ['#F5F3FF', '#7C3AED', '#FFF1F2', '#BE123C'],
    costOfLiving: 'High (London)',
    costColor: '#DC2626',
    prPathway: 'Complex',
    prColor: '#DC2626',
  },
  Germany: {
    flag: '🇩🇪',
    tuition: '€0 – €3,000/yr',
    visaFee: '€75',
    processing: '4 – 12 weeks',
    postStudy: '18 months',
    courses: ['Engineering', 'Tech'],
    courseColors: ['#FEF9EE', '#C2410C', '#EEF2FF', '#3730A3'],
    costOfLiving: 'Moderate',
    costColor: '#0D5C3A',
    prPathway: 'Structured',
    prColor: '#0D5C3A',
  },
  'New Zealand': {
    flag: '🇳🇿',
    tuition: '$22,000 – $35,000 NZD',
    visaFee: '$375 NZD',
    processing: '4 – 6 weeks',
    postStudy: 'Up to 3 years',
    courses: ['Nursing', 'Agriculture'],
    courseColors: ['#EBF7F1', '#047857', '#ECFDF5', '#065F46'],
    costOfLiving: 'Moderate',
    costColor: '#0D5C3A',
    prPathway: 'Structured',
    prColor: '#0D5C3A',
  },
  Ireland: {
    flag: '🇮🇪',
    tuition: '€9,000 – €25,000',
    visaFee: '€60',
    processing: '2 – 8 weeks',
    postStudy: '2 years',
    courses: ['Tech', 'Business'],
    courseColors: ['#EEF2FF', '#3730A3', '#F5F3FF', '#7C3AED'],
    costOfLiving: 'High (Dublin)',
    costColor: '#DC2626',
    prPathway: 'Moderate',
    prColor: '#C2680C',
  },
}

const ALL_COUNTRIES = Object.keys(COUNTRY_DATA)

const METRICS = [
  { key: 'tuition',     label: 'Avg. Tuition / Year' },
  { key: 'visaFee',     label: 'Visa Fee'             },
  { key: 'processing',  label: 'Processing Time'      },
  { key: 'postStudy',   label: 'Post-Study Work'      },
  { key: 'courses',     label: 'Popular Courses'       },
  { key: 'cost',        label: 'Cost of Living'        },
  { key: 'pr',          label: 'PR Pathway'            },
]

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function CountryComparison() {
  const navigate = useNavigate()
  const [selected,    setSelected]    = useState(['Australia', 'Canada', 'United Kingdom'])
  const [showPicker,  setShowPicker]  = useState(false)

  const available = ALL_COUNTRIES.filter(c => !selected.includes(c))

  function addCountry(c) {
    if (selected.length >= 4) return
    setSelected([...selected, c])
    setShowPicker(false)
  }

  function removeCountry(c) {
    setSelected(selected.filter(s => s !== c))
  }

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* ── Header ── */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Compare countries side by side
        </h1>
        <p className="text-sm mb-7" style={{ color: '#0D5C3A' }}>
          Evaluate your options based on tuition fees, visa processing times, and career opportunities.
        </p>

        {/* ── Country selector row ── */}
        <div className="flex items-stretch gap-3 mb-8 flex-wrap">
          {selected.map(c => {
            const d = COUNTRY_DATA[c]
            return (
              <div key={c}
                className="bg-white rounded-xl border border-gray-200 px-5 py-3 flex flex-col items-center gap-1.5 relative min-w-[120px]"
              >
                <button
                  onClick={() => removeCountry(c)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
                <span className="text-3xl">{d.flag}</span>
                <span className="text-sm font-semibold text-gray-800">{c}</span>
              </div>
            )
          })}

          {/* Add country */}
          {selected.length < 4 && (
            <div className="relative">
              <button
                onClick={() => setShowPicker(v => !v)}
                className="h-full min-h-[88px] min-w-[120px] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1.5 px-5 text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors bg-transparent"
              >
                <Plus size={20} />
                <span className="text-sm font-medium">Add country</span>
              </button>
              {showPicker && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-20 overflow-hidden w-48">
                  {available.map(c => (
                    <button key={c}
                      onClick={() => addCountry(c)}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-lg">{COUNTRY_DATA[c].flag}</span>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Comparison table ── */}
        {selected.length >= 2 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-7">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-4 text-sm font-bold text-gray-700 bg-gray-50 w-36">
                    Metric
                  </th>
                  {selected.map(c => (
                    <th key={c} className="px-5 py-4 text-sm font-bold text-gray-900 text-center bg-gray-50">
                      {COUNTRY_DATA[c].flag} {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {METRICS.map((metric, mi) => (
                  <tr key={metric.key}
                    className={mi % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    style={{ borderBottom: '1px solid #F3F4F6' }}
                  >
                    <td className="px-5 py-4 text-sm text-gray-500 font-medium">
                      {metric.label}
                    </td>
                    {selected.map(c => {
                      const d = COUNTRY_DATA[c]
                      return (
                        <td key={c} className="px-5 py-4 text-sm text-center">
                          {metric.key === 'tuition'    && <span className="text-gray-800">{d.tuition}</span>}
                          {metric.key === 'visaFee'    && <span className="text-gray-800">{d.visaFee}</span>}
                          {metric.key === 'processing' && (
                            <span style={{ color: d.processing.includes('12') ? '#C2680C' : '#111827' }}>
                              {d.processing}
                            </span>
                          )}
                          {metric.key === 'postStudy'  && <span className="text-gray-800">{d.postStudy}</span>}
                          {metric.key === 'courses' && (
                            <div className="flex items-center gap-1.5 justify-center flex-wrap">
                              {d.courses.map((course, ci) => (
                                <span key={course}
                                  className="text-xs font-semibold px-2 py-0.5 rounded-md"
                                  style={{
                                    backgroundColor: d.courseColors[ci * 2]     || '#EBF7F1',
                                    color:           d.courseColors[ci * 2 + 1] || '#047857',
                                  }}
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          )}
                          {metric.key === 'cost' && (
                            <span className="font-semibold" style={{ color: d.costColor }}>
                              {d.costOfLiving}
                            </span>
                          )}
                          {metric.key === 'pr' && (
                            <span className="font-semibold" style={{ color: d.prColor }}>
                              {d.prPathway}
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Recommendation banner ── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-7 mb-6 flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#EBF7F1' }}>
                <Shield size={12} style={{ color: '#0D5C3A' }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0D5C3A' }}>
                Top Recommendation
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Australia offers the best balance for 2024
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              Based on your comparison, Australia leads in post-study work rights and regional migration benefits.
              It currently offers the highest ROI for healthcare and IT professionals.
            </p>
          </div>
          <button
            onClick={() => navigate('/courses?country=Australia')}
            className="flex items-center gap-2 text-sm font-bold text-white px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ backgroundColor: '#0D5C3A' }}
          >
            Explore Australia courses <ArrowRight size={15} />
          </button>
        </div>

        {/* ── Bottom CTA row ── */}
        <div className="grid grid-cols-2 gap-4">

          {/* Talk to expert */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#EBF7F1' }}>
                <Shield size={18} style={{ color: '#0D5C3A' }} />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Talk to an Expert</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Get a free 15-minute consultation to clarify your visa eligibility for any of these countries.
                </p>
                <button
                  onClick={() => navigate('/agencies')}
                  className="flex items-center gap-1 text-sm font-bold hover:opacity-80 transition-opacity"
                  style={{ color: '#0D5C3A' }}
                >
                  Book a session <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Download guides */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#EEF2FF' }}>
                <FileText size={18} style={{ color: '#3730A3' }} />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Download Guides</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  Detailed PDF booklets for each country including accommodation tips and job market insights.
                </p>
                <button
                  className="flex items-center gap-1 text-sm font-bold hover:opacity-80 transition-opacity"
                  style={{ color: '#0D5C3A' }}
                >
                  View resources <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}