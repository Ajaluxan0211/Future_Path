import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  Trophy, Share2, Bookmark, CreditCard, Clock, Building2,
  GraduationCap, Globe, Check, ArrowRight, HelpCircle, ExternalLink,
  GraduationCap as GradIcon, Coins, Star, Globe2
} from 'lucide-react'

/* ══════════════════════════════════════
   ALL SCHOLARSHIP DATA — keyed by id
   (in production this comes from an API call)
══════════════════════════════════════ */
const SCHOLARSHIPS = {
  1: {
    title: 'Rhodes Trust Global Leadership Scholarship',
    provider: 'University of Oxford', fundingType: 'Full Funding',
    value: '$120,000', university: 'Global students', deadline: 'Deadline: Nov 15',
    icon: Trophy, iconBg: '#EBF7F1', iconColor: '#0D5C3A',
    about: [
      'The Rhodes Scholarship is the oldest and one of the most prestigious international graduate scholarship programs, enabling outstanding young people from around the world to study at the University of Oxford.',
      'Rhodes Scholars are chosen not only for their outstanding scholarly achievements, but for their character, commitment to others and to the common good, and for their potential for leadership in whatever domains their careers may lead.',
      'The scholarship covers university and college fees, a personal stipend, and one economy flight to and from Oxford each year of the scholarship.',
    ],
    eligibility: [
      'Must be a citizen of an eligible Rhodes constituency country.',
      'Aged between 18 and 24 years at the time of application.',
      'Completed an undergraduate degree by the time of taking up the scholarship.',
      'Demonstrated leadership potential and commitment to service.',
    ],
    steps: [
      { title: 'Confirm Constituency Eligibility', desc: 'Check which Rhodes constituency applies to your country of citizenship and residence.' },
      { title: 'Prepare Application Materials',    desc: 'Gather transcripts, a personal statement, and at least five letters of reference.' },
      { title: 'Submit National Application',      desc: 'Apply through your constituency\'s national Rhodes Scholarship committee.' },
      { title: 'Attend Final Selection Interview',  desc: 'Shortlisted candidates attend an in-person interview with the selection committee.' },
    ],
    facts: [
      { icon: CreditCard,    label: 'Value',           value: '$120,000 total' },
      { icon: Clock,         label: 'Duration',        value: '2-3 years'      },
      { icon: Building2,     label: 'Provider',        value: 'Rhodes Trust'   },
      { icon: GraduationCap, label: 'Degree level',    value: 'Masters, DPhil' },
      { icon: Globe,         label: 'Course Language', value: 'English'       },
    ],
  },

  2: {
    title: 'Fulbright Graduate Student Award',
    provider: 'U.S. Department of State', fundingType: 'Graduate',
    value: 'Full Ride', university: 'Any U.S. university', deadline: 'Deadline: Oct 12',
    icon: GradIcon, iconBg: '#EEF2FF', iconColor: '#2563EB',
    about: [
      'The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States.',
      'The program operates in more than 160 countries worldwide and provides opportunities for selected individuals to engage in graduate study, advanced research, university teaching, and primary and secondary school teaching.',
      'Fulbright alumni include 60 Nobel Laureates and dozens of heads of state, working across every academic discipline.',
    ],
    eligibility: [
      'Must be a citizen of a country with an active Fulbright program.',
      'Hold a bachelor\'s degree or equivalent by the start of the grant.',
      'Demonstrate strong academic record and English proficiency (TOEFL/IELTS).',
      'Commit to returning to home country for at least two years post-program.',
    ],
    steps: [
      { title: 'Identify Home Country Fulbright Commission', desc: 'Locate the Fulbright office or U.S. Embassy in your home country for local deadlines.' },
      { title: 'Prepare Statement of Purpose',                desc: 'Write a study/research objective and personal statement tailored to your field.' },
      { title: 'Submit Online Application',                   desc: 'Complete the application through the Fulbright online portal with transcripts and references.' },
      { title: 'National Interview',                          desc: 'Selected candidates attend an interview with the home country Fulbright board.' },
    ],
    facts: [
      { icon: CreditCard,    label: 'Value',           value: 'Tuition + stipend' },
      { icon: Clock,         label: 'Duration',        value: '1-2 years'         },
      { icon: Building2,     label: 'Provider',        value: 'U.S. Dept. of State' },
      { icon: GraduationCap, label: 'Degree level',    value: "Master's"          },
      { icon: Globe,         label: 'Course Language', value: 'English'           },
    ],
  },

  3: {
    title: 'Gates Cambridge Scholarship',
    provider: 'University of Cambridge', fundingType: 'PhD/Masters',
    value: '$85,000', university: 'University of Cambridge', deadline: 'Deadline: Jan 05',
    icon: Coins, iconBg: '#FFF7ED', iconColor: '#C2410C',
    about: [
      'The Gates Cambridge Scholarship programme was established in 2000 by a $210 million donation from the Bill and Melinda Gates Foundation to the University of Cambridge.',
      'Scholarships are awarded to outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree in any subject available at the University of Cambridge.',
      'The scholarship aims to build a global network of future leaders committed to improving the lives of others, with a strong focus on STEM and public health fields.',
    ],
    eligibility: [
      'Must be a citizen of any country outside the United Kingdom.',
      'Applying for a full-time postgraduate degree at the University of Cambridge.',
      'Demonstrate outstanding intellectual ability and leadership potential.',
      'Commitment to improving the lives of others through chosen field of study.',
    ],
    steps: [
      { title: 'Apply to Cambridge',          desc: 'Submit your graduate course application directly to the University of Cambridge.' },
      { title: 'Tick the Scholarship Box',    desc: 'Indicate you wish to be considered for the Gates Cambridge Scholarship on your course application.' },
      { title: 'Department Shortlist',        desc: 'Academic departments shortlist candidates and forward applications to the Gates Cambridge Trust.' },
      { title: 'Interview Stage',             desc: 'Shortlisted candidates are invited to Cambridge for an in-person or virtual interview.' },
    ],
    facts: [
      { icon: CreditCard,    label: 'Value',           value: '$85,000 / year' },
      { icon: Clock,         label: 'Duration',        value: '1-4 years'      },
      { icon: Building2,     label: 'Provider',        value: 'Gates Cambridge Trust' },
      { icon: GraduationCap, label: 'Degree level',    value: 'Masters, PhD'   },
      { icon: Globe,         label: 'Course Language', value: 'English'       },
    ],
  },

  4: {
    title: 'Vanier Canada Graduate Scholarship',
    provider: 'Government of Canada', fundingType: 'PhD',
    value: '$50,000/yr', university: 'Any Canadian university', deadline: 'Deadline: Nov 01',
    icon: Star, iconBg: '#F5F3FF', iconColor: '#7C3AED',
    about: [
      'The Vanier Canada Graduate Scholarships program aims to attract and retain world-class doctoral students by supporting students who demonstrate strong leadership skills and a high standard of scholarly achievement.',
      'The scholarship is awarded based on three equally weighted criteria: academic excellence, research potential, and leadership.',
      'Vanier Scholars are encouraged to pursue innovative, high-impact research at Canadian institutions across all academic disciplines, from health sciences to natural sciences and social sciences and humanities.',
    ],
    eligibility: [
      'Nominated by a Canadian institution with a Vanier CGS quota allocation.',
      'Pursuing a first doctoral degree (or combined MD/PhD).',
      'Achieved a first-class average in each of the last two years of study.',
      'Demonstrated research potential and leadership achievements.',
    ],
    steps: [
      { title: 'Apply to a Canadian University', desc: 'Secure admission or current enrollment in a doctoral program at an eligible Canadian institution.' },
      { title: 'Request Institutional Nomination', desc: 'Contact your university\'s graduate studies office, as nominations are institution-led.' },
      { title: 'Submit Research Proposal',       desc: 'Prepare a research proposal demonstrating significance and originality of your work.' },
      { title: 'Await Tri-Agency Review',        desc: 'Applications are reviewed by a national selection committee across all three federal research agencies.' },
    ],
    facts: [
      { icon: CreditCard,    label: 'Value',           value: '$50,000 / year' },
      { icon: Clock,         label: 'Duration',        value: '3 years'        },
      { icon: Building2,     label: 'Provider',        value: 'Government of Canada' },
      { icon: GraduationCap, label: 'Degree level',    value: 'PhD'            },
      { icon: Globe,         label: 'Course Language', value: 'English / French' },
    ],
  },

  5: {
    title: 'Erasmus Mundus Joint Masters',
    provider: 'European Commission', fundingType: 'Multi-Country',
    value: 'Full Funding', university: 'Multiple EU universities', deadline: 'Deadline: Feb 14',
    icon: Globe2, iconBg: '#ECFDF5', iconColor: '#047857',
    about: [
      'Erasmus Mundus Joint Master Degrees are prestigious, integrated, international study programmes jointly delivered by a consortium of higher education institutions across Europe and worldwide.',
      'Scholarships cover participation costs, travel and installation costs, and a monthly subsistence allowance for the entire duration of the program.',
      'Students study in at least two different European countries during the program, gaining an internationally recognised joint, double, or multiple degree.',
    ],
    eligibility: [
      'Hold a recognised bachelor\'s degree or equivalent first cycle qualification.',
      'Meet the specific admission requirements of the chosen joint master program.',
      'Demonstrate proficiency in the language(s) of instruction (typically English B2+).',
      'Open to students of any nationality worldwide.',
    ],
    steps: [
      { title: 'Choose a Joint Master Programme', desc: 'Browse the catalogue of Erasmus Mundus programmes and select one matching your field.' },
      { title: 'Apply Directly to the Consortium', desc: 'Submit your application through the joint programme\'s own admissions portal.' },
      { title: 'Indicate Scholarship Interest',    desc: 'Tick the scholarship application box during the programme application process.' },
      { title: 'Consortium Selection',             desc: 'The university consortium ranks applicants and allocates available scholarship places.' },
    ],
    facts: [
      { icon: CreditCard,    label: 'Value',           value: '€1,400 / month' },
      { icon: Clock,         label: 'Duration',        value: '1-2 years'      },
      { icon: Building2,     label: 'Provider',        value: 'European Commission' },
      { icon: GraduationCap, label: 'Degree level',    value: "Master's"      },
      { icon: Globe,         label: 'Course Language', value: 'English'       },
    ],
  },
}

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function ScholarshipDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  // useParams() always returns a string, so coerce safely and try both forms
  const s = SCHOLARSHIPS[id] || SCHOLARSHIPS[Number(id)] || SCHOLARSHIPS[String(id)]

  // Fallback if an invalid id is visited directly
  if (!s) {
    return (
      <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-lg font-bold text-gray-700 mb-2">Scholarship not found</h2>
          <p className="text-xs text-gray-400 mb-3">Requested id: "{id}"</p>
          <Link to="/scholarships" className="text-sm font-semibold" style={{ color: '#0D5C3A' }}>
            ← Back to all scholarships
          </Link>
        </div>
      </div>
    )
  }

  const Icon = s.icon

  return (
    <div style={{ backgroundColor: '#F0F7F4' }} className="min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-6">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-sm mb-5">
          <Link to="/scholarships" className="text-gray-400 hover:text-gray-600 transition-colors">
            Scholarships
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-900">{s.title}</span>
        </div>

        {/* ── Header card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-7 mb-7">
          <div className="flex items-start justify-between gap-6">

            <div className="flex items-start gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: s.iconBg }}
              >
                <Icon size={28} style={{ color: s.iconColor }} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1.5">{s.title}</h1>
                <p className="text-sm text-gray-500 mb-3">
                  {s.provider} <span className="mx-1.5">•</span> {s.fundingType}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#ECFDF5', color: '#047857' }}>
                    {s.value}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    {s.university}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#FEF3E2', color: '#C2680C' }}>
                    {s.deadline}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <Share2 size={16} />
              </button>
              <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <Bookmark size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Two column layout ── */}
        <div className="grid grid-cols-5 gap-7">

          {/* LEFT — content */}
          <div className="col-span-3">

            <h2 className="text-xl font-bold text-gray-900 mb-4">About this scholarship</h2>
            <div className="flex flex-col gap-4 mb-9">
              {s.about.map((p, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">{p}</p>
              ))}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility</h2>
            <div className="flex flex-col gap-3 mb-9">
              {s.eligibility.map((req, i) => (
                <div key={i}
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 px-5 py-4"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: '#ECFDF5' }}>
                    <Check size={12} strokeWidth={3} style={{ color: '#047857' }} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{req}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-5">How to apply</h2>
            <div className="relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-200" />
              <div className="flex flex-col gap-7">
                {s.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 z-10"
                      style={{ backgroundColor: '#0D5C3A' }}
                    >
                      {i + 1}
                    </div>
                    <div className="pb-1">
                      <div className="text-base font-bold text-gray-900 mb-1">{step.title}</div>
                      <div className="text-sm text-gray-500 leading-relaxed">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT — sidebar */}
          <div className="col-span-2">
            <div className="sticky top-6 flex flex-col gap-5">

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="text-base font-bold text-gray-900 pb-4 mb-1 border-b border-gray-100">
                  Quick facts
                </div>
                {s.facts.map((f, i) => {
                  const FIcon = f.icon
                  return (
                    <div key={i}
                      className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="flex items-center gap-2.5 text-sm text-gray-500">
                        <FIcon size={15} className="text-gray-400" />
                        {f.label}
                      </span>
                      <span className="text-sm font-bold text-gray-900">{f.value}</span>
                    </div>
                  )
                })}

                <button
                  onClick={() => navigate(`/scholarships/${id}/apply`)}
                  className="w-full mt-5 py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#0D5C3A' }}
                >
                  Start application <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => navigate('/eligibility')}
                  className="w-full mt-3 py-3.5 rounded-xl font-bold text-sm border-2 transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#0D5C3A', color: '#0D5C3A' }}
                >
                  Check my eligibility first
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Verification takes less than 2 minutes
                </p>
              </div>

              <div className="rounded-2xl p-5" style={{ backgroundColor: '#EBF7F1', border: '1px solid #C6E8D6' }}>
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle size={16} style={{ color: '#0D5C3A' }} />
                  <span className="text-sm font-bold" style={{ color: '#0D5C3A' }}>
                    Need help applying?
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Our agency offers free guidance for {s.title.split(' ').slice(0, 2).join(' ')} applicants. Speak to a mentor today.
                </p>
                <button
                  onClick={() => navigate('/agencies')}
                  className="flex items-center gap-1.5 text-sm font-bold transition-colors hover:opacity-80"
                  style={{ color: '#0D5C3A' }}
                >
                  Book a free consultation <ExternalLink size={13} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}