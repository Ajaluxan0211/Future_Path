import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, Check,
  GraduationCap, BookOpen, Award, Star,
  HelpCircle, Briefcase, Plane, DollarSign,
  Globe, CheckCircle, Languages
} from 'lucide-react'

/* ═══════════════ STEPS DATA ═══════════════ */
const STEPS = [
  {
    id: 1, label: 'Education',
    question: 'What is your highest education level?',
    subtitle: 'This helps us match you with the right visa and university entry requirements.',
    options: [
      { label: "O/L or below",      icon: GraduationCap },
      { label: "A/L completed",     icon: BookOpen      },
      { label: "Bachelor's degree", icon: Award         },
      { label: "Postgraduate",      icon: Star          },
    ],
  },
  {
    id: 2, label: 'English',
    question: 'What is your English proficiency level?',
    subtitle: 'Most universities require a minimum IELTS score. Select the closest to your current level.',
    options: [
      { label: 'No test taken',  icon: HelpCircle  },
      { label: 'IELTS 5.0–5.5', icon: Languages   },
      { label: 'IELTS 6.0–6.5', icon: Languages   },
      { label: 'IELTS 7.0+',    icon: Languages   },
    ],
  },
  {
    id: 3, label: 'Experience',
    question: 'How many years of work experience do you have?',
    subtitle: 'Work experience can strengthen your visa application and unlock more opportunities.',
    options: [
      { label: 'None',           icon: HelpCircle },
      { label: 'Less than 1 yr', icon: Briefcase  },
      { label: '1–3 years',      icon: Briefcase  },
      { label: '3+ years',       icon: Briefcase  },
    ],
  },
  {
    id: 4, label: 'Goal',
    question: 'What is your primary goal abroad?',
    subtitle: 'Your goal determines which visa type and country options are best suited for you.',
    options: [
      { label: 'Study abroad',    icon: GraduationCap },
      { label: 'Work abroad',     icon: Briefcase     },
      { label: 'Visit / Tourism', icon: Plane         },
      { label: 'Unsure yet',      icon: HelpCircle    },
    ],
  },
  {
    id: 5, label: 'Budget',
    question: 'What is your approximate total budget?',
    subtitle: 'Include tuition, living costs and visa fees. This helps us suggest the most realistic options.',
    options: [
      { label: 'Under $10,000',    icon: DollarSign },
      { label: '$10,000–$20,000',  icon: DollarSign },
      { label: '$20,000–$40,000',  icon: DollarSign },
      { label: '$40,000+',         icon: DollarSign },
    ],
  },
]

const RESULTS = [
  { type: 'Student Visa',        country: 'Australia',       flag: '🇦🇺', match: '96%', detail: 'IELTS 6.0+ · Post-study work up to 4 years'   },
  { type: 'Student Visa',        country: 'Canada',          flag: '🇨🇦', match: '91%', detail: 'IELTS 6.5+ · 3-year PGWP after graduation'     },
  { type: 'Skilled Worker Visa', country: 'United Kingdom',  flag: '🇬🇧', match: '84%', detail: 'IELTS 6.5+ · 2-year Graduate Route visa'        },
]

/* ═══════════════ STEP INDICATOR ═══════════════ */
function StepIndicator({ current, steps }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((s, i) => {
        const isDone   = s.id < current
        const isActive = s.id === current
        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: isDone || isActive ? '#0D5C3A' : '#E5E7EB',
                  color:           isDone || isActive ? '#fff'     : '#9CA3AF',
                }}
              >
                {isDone ? <Check size={15} strokeWidth={3} /> : s.id}
              </div>
              <div
                className="text-xs mt-1.5 font-medium"
                style={{ color: isActive ? '#0D5C3A' : isDone ? '#0D5C3A' : '#9CA3AF' }}
              >
                {s.label}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-16 h-0.5 mx-1 mb-5 transition-all duration-300"
                style={{ backgroundColor: isDone ? '#0D5C3A' : '#E5E7EB' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════ MAIN ═══════════════ */
export default function EligibilityChecker() {
  const navigate  = useNavigate()
  const [step,     setStep]     = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers,  setAnswers]  = useState([])

  const current    = STEPS[step]
  const isFinished = step >= STEPS.length
  const progress   = (step / STEPS.length) * 100

  function handleNext() {
    if (selected === null) return
    setAnswers([...answers, current.options[selected].label])
    setSelected(null)
    setStep(step + 1)
  }

  function handleBack() {
    if (step === 0) return
    setAnswers(answers.slice(0, -1))
    setSelected(null)
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F7F4' }}>

      {/* ── White header ── */}
      <div className="bg-white border-b border-gray-200 py-10 px-6 text-center">
        <div
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: '#0D5C3A' }}
        >
          Visa Eligibility Checker
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find the right visa for your profile
        </h1>
        <p className="text-sm text-gray-400">
          Answer 5 quick questions to see which visas you qualify for.
        </p>
      </div>

      {/* ── Content area ── */}
      <div className="flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-xl">

          {!isFinished ? (
            <>
              {/* Step indicator */}
              <StepIndicator current={step + 1} steps={STEPS} />

              {/* Question card */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden"
                style={{ border: '1px solid #E5E7EB' }}>

                {/* Progress bar — flush top */}
                <div className="w-full h-1.5 bg-gray-100">
                  <div
                    className="h-full transition-all duration-500 rounded-r-full"
                    style={{ width: `${progress + 20}%`, backgroundColor: '#0D5C3A' }}
                  />
                </div>

                <div className="p-8">
                  {/* Step label */}
                  <p className="text-sm text-gray-400 mb-1">Step {step + 1} of {STEPS.length}</p>

                  {/* Question */}
                  <h2 className="text-xl font-bold text-gray-900 mb-1.5">
                    {current.question}
                  </h2>
                  <p className="text-xs text-gray-400 mb-7 leading-relaxed">
                    {current.subtitle}
                  </p>

                  {/* 2×2 option grid */}
                  <div className="grid grid-cols-2 gap-3 mb-7">
                    {current.options.map((opt, i) => {
                      const Icon       = opt.icon
                      const isSelected = selected === i
                      return (
                        <button
                          key={opt.label}
                          onClick={() => setSelected(i)}
                          className="flex flex-col items-center justify-center gap-3 py-7 px-4 rounded-xl transition-all duration-150 cursor-pointer"
                          style={{
                            border:          isSelected ? '2px solid #0D5C3A' : '1.5px solid #E5E7EB',
                            backgroundColor: isSelected ? '#EBF7F1'           : '#FFFFFF',
                            boxShadow:       isSelected ? '0 0 0 1px #0D5C3A' : '0 1px 3px rgba(0,0,0,0.06)',
                          }}
                        >
                          <Icon
                            size={26}
                            style={{ color: isSelected ? '#0D5C3A' : '#9CA3AF' }}
                          />
                          <span
                            className="text-sm font-semibold text-center"
                            style={{ color: isSelected ? '#0D5C3A' : '#374151' }}
                          >
                            {opt.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Back + Next buttons */}
                  <div className="flex gap-3">
                    {step > 0 && (
                      <button
                        onClick={handleBack}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <ArrowLeft size={15} /> Back
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      disabled={selected === null}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-200"
                      style={{
                        backgroundColor: selected !== null ? '#0D5C3A' : '#B2D8C8',
                        cursor:          selected !== null ? 'pointer' : 'not-allowed',
                        boxShadow:       selected !== null ? '0 4px 12px rgba(13,92,58,0.3)' : 'none',
                      }}
                    >
                      {step === STEPS.length - 1 ? 'See my results' : 'Next'}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </>

          ) : (

            /* ══ RESULT CARD ══ */
            <>
              {/* All steps completed indicator */}
              <StepIndicator current={STEPS.length + 1} steps={STEPS} />

              <div className="bg-white rounded-2xl shadow-md overflow-hidden"
                style={{ border: '1px solid #E5E7EB' }}>

                {/* Green header band */}
                <div className="px-8 py-8 text-center" style={{ backgroundColor: '#0D5C3A' }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                      <CheckCircle size={36} color="#fff" />
                    </div>
                  </div>
                  <div className="text-white font-bold text-2xl mb-1">
                    You qualify for {RESULTS.length} visa types
                  </div>
                  <div className="text-sm" style={{ color: '#A8DFC4' }}>
                    Based on your profile answers
                  </div>
                </div>

                <div className="p-8">

                  {/* Profile summary */}
                  <div className="mb-6">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                      Your profile summary
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {STEPS.map((s, i) => (
                        <div key={s.id} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                          style={{ backgroundColor: '#F0F7F4' }}>
                          <div className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: '#0D5C3A' }} />
                          <div>
                            <div className="text-xs text-gray-400">{s.label}</div>
                            <div className="text-xs font-bold text-gray-800">{answers[i] || '—'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 mb-6" />

                  {/* Visa matches */}
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Visa matches
                  </div>
                  <div className="flex flex-col gap-3 mb-7">
                    {RESULTS.map((r, i) => (
                      <div key={i}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl border border-gray-100"
                        style={{ backgroundColor: '#F8FDF9' }}>
                        <div className="text-2xl flex-shrink-0">{r.flag}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-gray-900">
                            {r.type} — {r.country}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{r.detail}</div>
                        </div>
                        <div
                          className="text-sm font-bold px-3 py-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: '#EBF7F1', color: '#0D5C3A' }}
                        >
                          {r.match}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => navigate('/courses')}
                      className="w-full py-4 rounded-xl text-white font-bold text-sm transition-colors hover:opacity-90"
                      style={{ backgroundColor: '#0D5C3A', boxShadow: '0 4px 12px rgba(13,92,58,0.25)' }}
                    >
                      Explore matching courses →
                    </button>
                    <button
                      onClick={() => navigate('/agencies')}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View verified agencies
                    </button>
                    <button
                      onClick={() => { setStep(0); setSelected(null); setAnswers([]) }}
                      className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ← Start over
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}