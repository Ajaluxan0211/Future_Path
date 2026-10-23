
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  ShieldCheck,
  Monitor,
  Globe,
  Bell,
  LockKeyhole,
  Plug,
  Database,
  AlertTriangle,
  Building2,
  Mail,
  Smartphone,
  CheckCircle2,
  Download,
  RefreshCw,
  KeyRound,
  Clock,
  SlidersHorizontal,
  Cloud,
  Activity,
  Trash2,
} from "lucide-react";

const initialFeatures = [
  { key: "maintenanceMode", label: "Maintenance Mode", description: "Temporarily disable platform access for maintenance.", enabled: false },
  { key: "newAgencyRegistrations", label: "New Agency Registrations", description: "Allow registration applications from new agencies.", enabled: true },
  { key: "newStudentRegistrations", label: "New Student Registrations", description: "Allow students to register and create accounts.", enabled: true },
  { key: "publicScamReporting", label: "Public Scam Reporting", description: "Enable citizens to submit suspicious agency reports.", enabled: true },
  { key: "successStories", label: "Success Story Submissions", description: "Allow verified users to submit success stories.", enabled: true },
  { key: "requireApproval", label: "Require Approval for Stories", description: "Require administrator approval before publishing.", enabled: true },
  { key: "showScamTicker", label: "Show Live Scam Ticker", description: "Display scam warnings on the public homepage.", enabled: true },
];

const initialWeights = [
  { key: "government", label: "Government Registration", value: 35 },
  { key: "reviews", label: "User Reviews & Verification", value: 30 },
  { key: "success", label: "Successful Visa Cases", value: 25 },
  { key: "years", label: "Years in Operation", value: 10 },
];

const initialChannels = [
  { label: "New agency application submitted", inApp: true, email: true, sms: false },
  { label: "Scam report filed by candidate", inApp: true, email: true, sms: true },
  { label: "Urgent scam report", inApp: true, email: true, sms: true },
  { label: "Failed root admin login alert", inApp: true, email: true, sms: true },
  { label: "Weekly analytics and audit digest", inApp: true, email: true, sms: false },
];

const initialSecurity = [
  { key: "twoFactor", label: "Require 2FA for all admins", description: "Require two-factor authentication.", enabled: true },
  { key: "lockout", label: "Lock account after 5 failed logins", description: "Temporarily lock accounts after repeated failures.", enabled: true },
  { key: "passwordRotation", label: "Force password change every 90 days", description: "Require periodic administrator password updates.", enabled: false },
  { key: "scriptAlerts", label: "Script / IP alerts", description: "Notify administrators about suspicious access.", enabled: false },
];

const initialConnectors = [
  { key: "email", name: "SendGrid Email Delivery", description: "Transactional email notifications", status: "Connected", icon: Mail },
  { key: "sms", name: "Dialog SMS Gateway", description: "SMS and urgent alert delivery", status: "Not connected", icon: Smartphone },
  { key: "analytics", name: "Google Analytics 4", description: "Website traffic and engagement analytics", status: "Connected", icon: Activity },
];

function SectionTitle({ icon: Icon, title, description, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
          <Icon size={19} />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {description && <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      {children}
    </section>
  );
}

function Field({ label, children, hint }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-semibold text-slate-600">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        checked ? "bg-emerald-800" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function StatusPill({ connected }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
        connected ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-emerald-600" : "bg-slate-400"}`} />
      {connected ? "Connected" : "Not connected"}
    </span>
  );
}

export default function Settings() {
  const [activePanel, setActivePanel] = useState("General");
  const [features, setFeatures] = useState(initialFeatures);
  const [weights, setWeights] = useState(initialWeights);
  const [channels, setChannels] = useState(initialChannels);
  const [security, setSecurity] = useState(initialSecurity);
  const [connectors, setConnectors] = useState(initialConnectors);
  const [settings, setSettings] = useState({
    platformName: "FuturePath",
    supportEmail: "support@futurepath.lk",
    country: "Sri Lanka",
    language: "English",
    timezone: "Asia/Colombo",
    currency: "LKR",
    inactivityDays: "7 days",
    riskThreshold: "45",
    responseHours: "48 hours",
    minimumTrustScore: "60",
    quietHours: true,
    quietStart: "10:00 PM",
    dailyDigest: true,
    digestTime: "08:00 AM",
    sessionTimeout: "30 minutes",
    requireRegistration: true,
    registrationCertificate: true,
    migrationLicense: true,
    physicalAddress: true,
    ownerIdentity: true,
    apiKey: "fp_live_••••••••••••••••",
  });
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const panels = [
    { name: "General", icon: SettingsIcon },
    { name: "Platforms & Features", icon: SlidersHorizontal },
    { name: "Trust Score", icon: ShieldCheck },
    { name: "Verification Rules", icon: CheckCircle2 },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: LockKeyhole },
    { name: "Integrations", icon: Plug },
    { name: "Data & Backup", icon: Database },
    { name: "Danger Zone", icon: AlertTriangle },
  ];

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
    setMessage("");
  };

  const saveSettings = () => {
    // This demo saves changes in component state only.
    // Connect this handler to your backend API to persist settings.
    setSaved(true);
    setMessage("Settings updated in this session. Connect the backend to persist them.");
  };

  const resetSettings = () => {
    setSettings({
      platformName: "FuturePath",
      supportEmail: "support@futurepath.lk",
      country: "Sri Lanka",
      language: "English",
      timezone: "Asia/Colombo",
      currency: "LKR",
      inactivityDays: "7 days",
      riskThreshold: "45",
      responseHours: "48 hours",
      minimumTrustScore: "60",
      quietHours: true,
      quietStart: "10:00 PM",
      dailyDigest: true,
      digestTime: "08:00 AM",
      sessionTimeout: "30 minutes",
      requireRegistration: true,
      registrationCertificate: true,
      migrationLicense: true,
      physicalAddress: true,
      ownerIdentity: true,
      apiKey: "fp_live_••••••••••••••••",
    });
    setFeatures(initialFeatures);
    setWeights(initialWeights);
    setChannels(initialChannels);
    setSecurity(initialSecurity);
    setConnectors(initialConnectors);
    setSaved(false);
    setMessage("Settings have been reset to their initial demo values.");
  };

  const updateFeature = (key, enabled) => {
    setFeatures((current) =>
      current.map((item) => (item.key === key ? { ...item, enabled } : item))
    );
    setSaved(false);
  };

  const updateSecurity = (key, enabled) => {
    setSecurity((current) =>
      current.map((item) => (item.key === key ? { ...item, enabled } : item))
    );
    setSaved(false);
  };

  const updateWeight = (key, value) => {
    setWeights((current) =>
      current.map((item) => (item.key === key ? { ...item, value: Number(value) } : item))
    );
    setSaved(false);
  };

  const weightTotal = weights.reduce((sum, item) => sum + item.value, 0);

  const sectionId = {
    General: "general",
    "Platforms & Features": "features",
    "Trust Score": "trust",
    "Verification Rules": "verification",
    Notifications: "notifications",
    Security: "security",
    Integrations: "integrations",
    "Data & Backup": "backup",
    "Danger Zone": "danger",
  };

  const navigatePanel = (name) => {
    setActivePanel(name);
    document.getElementById(sectionId[name])?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#eef3ff] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Page heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <SettingsIcon size={21} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">Settings</h1>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-800">
                  Production
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Configure platform behavior, security, notifications and integrations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetSettings}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw size={15} />
              Reset
            </button>
            <button
              type="button"
              onClick={saveSettings}
              className="inline-flex items-center gap-2 rounded-lg bg-[#075c3b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#064b31]"
            >
              <Save size={15} />
              Save Changes
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
              saved
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-blue-200 bg-blue-50 text-blue-800"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid items-start gap-5 lg:grid-cols-[235px_minmax(0,1fr)]">
          {/* Settings navigation: this is not the main admin sidebar */}
          <aside className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:sticky lg:top-24">
            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Configuration panels
            </p>
            <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              {panels.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => navigatePanel(name)}
                  className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition lg:w-full ${
                    activePanel === name
                      ? "bg-emerald-50 font-semibold text-emerald-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={16} />
                  <span>{name}</span>
                </button>
              ))}
            </nav>
            <div className="mt-5 rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-600" />
                Configuration status
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Demo settings are editable locally. Persistence requires backend integration.
              </p>
            </div>
          </aside>

          <div className="min-w-0 space-y-5">
            {/* General platform identity */}
            <div id="general" className="scroll-mt-24">
              <Card>
                <SectionTitle
                  icon={Building2}
                  title="General Platform Identity"
                  description="Set the platform name, support email and regional preferences."
                  action={
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                      Details applied locally
                    </span>
                  }
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Platform Name">
                    <input className={inputClass} value={settings.platformName} onChange={(e) => updateSetting("platformName", e.target.value)} />
                  </Field>
                  <Field label="Support Email">
                    <input type="email" className={inputClass} value={settings.supportEmail} onChange={(e) => updateSetting("supportEmail", e.target.value)} />
                  </Field>
                  <Field label="Default Country">
                    <select className={inputClass} value={settings.country} onChange={(e) => updateSetting("country", e.target.value)}>
                      <option>Sri Lanka</option>
                      <option>India</option>
                      <option>Australia</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                    </select>
                  </Field>
                  <Field label="Default Language">
                    <select className={inputClass} value={settings.language} onChange={(e) => updateSetting("language", e.target.value)}>
                      <option>English</option>
                      <option>Tamil</option>
                      <option>Sinhala</option>
                    </select>
                  </Field>
                  <Field label="Time Zone">
                    <select className={inputClass} value={settings.timezone} onChange={(e) => updateSetting("timezone", e.target.value)}>
                      <option value="Asia/Colombo">Asia/Colombo (GMT+5:30)</option>
                      <option value="UTC">UTC</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Australia/Sydney">Australia/Sydney</option>
                    </select>
                  </Field>
                  <Field label="Primary / Secondary Currency">
                    <select className={inputClass} value={settings.currency} onChange={(e) => updateSetting("currency", e.target.value)}>
                      <option value="LKR">LKR / USD</option>
                      <option value="USD">USD / LKR</option>
                      <option value="GBP">GBP / LKR</option>
                      <option value="EUR">EUR / LKR</option>
                    </select>
                  </Field>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="rounded-lg bg-emerald-100 p-2 text-emerald-800"><Cloud size={18} /></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Platform Framework</p>
                      <p className="mt-1 text-xs text-slate-500">FuturePath web application</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <div className="rounded-lg bg-blue-100 p-2 text-blue-800"><Monitor size={18} /></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Browser Service</p>
                      <p className="mt-1 text-xs text-slate-500">Responsive web experience</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Platform features */}
            <div id="features" className="scroll-mt-24">
              <Card>
                <SectionTitle
                  icon={SlidersHorizontal}
                  title="Platform & Feature Flags"
                  description="Enable or disable selected platform features."
                />
                <div className="divide-y divide-slate-100">
                  {features.map((feature) => (
                    <div key={feature.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{feature.label}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{feature.description}</p>
                      </div>
                      <Toggle checked={feature.enabled} onChange={(value) => updateFeature(feature.key, value)} label={feature.label} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Trust score */}
            <div id="trust" className="scroll-mt-24">
              <Card>
                <SectionTitle
                  icon={ShieldCheck}
                  title="Trust Score Algorithm Weights"
                  description="Configure the relative importance of agency verification criteria."
                  action={<span className="text-xs text-slate-400">Total should equal 100%</span>}
                />
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_180px]">
                  <div className="space-y-5">
                    {weights.map((weight) => (
                      <div key={weight.key}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <label htmlFor={weight.key} className="text-sm font-medium text-slate-700">{weight.label}</label>
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">{weight.value}%</span>
                        </div>
                        <input
                          id={weight.key}
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={weight.value}
                          onChange={(e) => updateWeight(weight.key, e.target.value)}
                          className="h-2 w-full cursor-pointer accent-emerald-800"
                        />
                      </div>
                    ))}
                    <p className={`text-sm font-semibold ${weightTotal === 100 ? "text-emerald-700" : "text-amber-700"}`}>
                      Total: {weightTotal}% {weightTotal === 100 ? "✓" : "— adjust the weights to total 100%"}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-[#eef3ff] p-5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Simulated output</p>
                    <div className="my-4 flex h-24 w-24 flex-col items-center justify-center rounded-full border-[7px] border-emerald-700 bg-white">
                      <span className="text-2xl font-bold text-slate-900">{weightTotal === 100 ? "87" : "--"}</span>
                      <span className="text-[10px] text-slate-500">/ 100</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">Sample Agency Score</p>
                    <p className="mt-1 text-xs text-slate-500">Illustrative value only</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Verification rules */}
            <div id="verification" className="scroll-mt-24">
              <Card>
                <SectionTitle
                  icon={CheckCircle2}
                  title="Verification Rules & Mandates"
                  description="Choose the documents and review requirements for agency verification."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["registrationCertificate", "Require business registration certificate"],
                    ["migrationLicense", "Require migration licence"],
                    ["physicalAddress", "Require physical office address proof"],
                    ["ownerIdentity", "Require owner / director identity"],
                  ].map(([key, label]) => (
                    <label key={key} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700 hover:bg-emerald-50">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => updateSetting(key, e.target.checked)}
                        className="h-4 w-4 accent-emerald-800"
                      />
                      {label}
                    </label>
                  ))}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <Field label="Inactive Application Auto-Archive">
                    <select className={inputClass} value={settings.inactivityDays} onChange={(e) => updateSetting("inactivityDays", e.target.value)}>
                      <option>3 days</option><option>7 days</option><option>14 days</option><option>30 days</option>
                    </select>
                  </Field>
                  <Field label="High-Risk Review SLA">
                    <select className={inputClass} value={settings.responseHours} onChange={(e) => updateSetting("responseHours", e.target.value)}>
                      <option>24 hours</option><option>48 hours</option><option>72 hours</option>
                    </select>
                  </Field>
                  <Field label="Minimum Trust Score">
                    <input type="number" min="0" max="100" className={inputClass} value={settings.minimumTrustScore} onChange={(e) => updateSetting("minimumTrustScore", e.target.value)} />
                  </Field>
                </div>
              </Card>
            </div>

            {/* Notifications */}
            <div id="notifications" className="scroll-mt-24">
              <Card>
                <SectionTitle
                  icon={Bell}
                  title="Admin Notification Channels"
                  description="Choose which channels receive important platform alerts."
                />
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[540px] text-left text-sm">
                    <thead>
                      <tr className="bg-[#eef3ff] text-xs uppercase tracking-wide text-slate-600">
                        <th className="rounded-l-lg px-4 py-3 font-semibold">Event category</th>
                        <th className="px-4 py-3 text-center font-semibold">In-app</th>
                        <th className="px-4 py-3 text-center font-semibold">Email</th>
                        <th className="rounded-r-lg px-4 py-3 text-center font-semibold">SMS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {channels.map((channel, index) => (
                        <tr key={channel.label}>
                          <td className="px-4 py-3 text-slate-700">{channel.label}</td>
                          {["inApp", "email", "sms"].map((key) => (
                            <td key={key} className="px-4 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={channel[key]}
                                onChange={(e) => {
                                  setChannels((current) => current.map((row, i) => i === index ? { ...row, [key]: e.target.checked } : row));
                                  setSaved(false);
                                }}
                                aria-label={`${channel.label}: ${key}`}
                                className="h-4 w-4 accent-emerald-800"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
                    <div><p className="text-sm font-semibold text-slate-800">Quiet Hours</p><p className="mt-1 text-xs text-slate-500">Mute non-critical notifications.</p></div>
                    <Toggle checked={settings.quietHours} onChange={(value) => updateSetting("quietHours", value)} label="Quiet hours" />
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
                    <div><p className="text-sm font-semibold text-slate-800">Daily Summary Email</p><p className="mt-1 text-xs text-slate-500">Send a daily activity digest.</p></div>
                    <Toggle checked={settings.dailyDigest} onChange={(value) => updateSetting("dailyDigest", value)} label="Daily summary email" />
                  </div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Quiet hours start">
                    <select className={inputClass} value={settings.quietStart} onChange={(e) => updateSetting("quietStart", e.target.value)}>
                      <option>09:00 PM</option><option>10:00 PM</option><option>11:00 PM</option>
                    </select>
                  </Field>
                  <Field label="Daily digest time">
                    <select className={inputClass} value={settings.digestTime} onChange={(e) => updateSetting("digestTime", e.target.value)}>
                      <option>07:00 AM</option><option>08:00 AM</option><option>09:00 AM</option>
                    </select>
                  </Field>
                </div>
              </Card>
            </div>

            {/* Security */}
            <div id="security" className="scroll-mt-24">
              <Card>
                <SectionTitle
                  icon={LockKeyhole}
                  title="Authentication & Access Controls"
                  description="Configure administrator account protection and session policies."
                  action={
                    <button type="button" onClick={() => setMessage("Connect your authentication backend to implement password changes.")} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                      <KeyRound size={14} className="mr-1 inline" /> Change password
                    </button>
                  }
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {security.map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                      </div>
                      <Toggle checked={item.enabled} onChange={(value) => updateSecurity(item.key, value)} label={item.label} />
                    </div>
                  ))}
                </div>
                <div className="mt-5 max-w-sm">
                  <Field label="Session Idle Timeout">
                    <select className={inputClass} value={settings.sessionTimeout} onChange={(e) => updateSetting("sessionTimeout", e.target.value)}>
                      <option>15 minutes</option><option>30 minutes</option><option>60 minutes</option><option>120 minutes</option>
                    </select>
                  </Field>
                </div>
                <div className="mt-5">
                  <h3 className="mb-3 text-sm font-bold text-slate-800">Active Sessions (demo)</h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full min-w-[540px] text-left text-xs">
                      <thead className="bg-[#eef3ff] text-slate-600">
                        <tr>
                          <th className="px-4 py-3">Device</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Last active</th><th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr><td className="px-4 py-3 text-slate-700">Chrome · Windows 11</td><td className="px-4 py-3 text-slate-600">Colombo, Sri Lanka</td><td className="px-4 py-3 text-slate-600">Just now</td><td className="px-4 py-3"><StatusPill connected /></td></tr>
                        <tr><td className="px-4 py-3 text-slate-700">Firefox · Windows</td><td className="px-4 py-3 text-slate-600">Kandy, Sri Lanka</td><td className="px-4 py-3 text-slate-600">2 hours ago</td><td className="px-4 py-3"><StatusPill connected={false} /></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </div>

            {/* Integrations */}
            <div id="integrations" className="scroll-mt-24">
              <Card>
                <SectionTitle
                  icon={Plug}
                  title="Third-Party Connectors & APIs"
                  description="Manage external services used by the platform."
                />
                <div className="space-y-3">
                  {connectors.map(({ key, name, description, status, icon: Icon }) => (
                    <div key={key} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-800"><Icon size={18} /></div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{name}</p>
                          <p className="mt-1 text-xs text-slate-500">{description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusPill connected={status === "Connected"} />
                        <button
                          type="button"
                          onClick={() => {
                            setConnectors((current) => current.map((item) => item.key === key ? { ...item, status: item.status === "Connected" ? "Not connected" : "Connected" } : item));
                            setSaved(false);
                          }}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          {status === "Connected" ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <Field label="Platform Master API Secret" hint="This demo displays a placeholder only. Store real secrets securely on the server, never in frontend source code.">
                    <div className="flex gap-2">
                      <input readOnly className={`${inputClass} font-mono`} type={showApiKey ? "text" : "password"} value={settings.apiKey} />
                      <button type="button" onClick={() => setShowApiKey((value) => !value)} className="rounded-lg border border-slate-200 px-3 text-sm text-slate-600 hover:bg-slate-50">{showApiKey ? "Hide" : "Show"}</button>
                      <button type="button" onClick={() => setMessage("API secret regeneration must be implemented securely in your backend.")} className="rounded-lg bg-[#075c3b] px-3 text-xs font-semibold text-white hover:bg-[#064b31]">Regenerate</button>
                    </div>
                  </Field>
                </div>
              </Card>
            </div>

            {/* Backup */}
            <div id="backup" className="scroll-mt-24">
              <Card>
                <SectionTitle
                  icon={Database}
                  title="Data Management & Redundancy"
                  description="Configure backup preferences and review data management actions."
                />
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-emerald-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"><CheckCircle2 size={20} /></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Last Cloud Backup Succeeded</p>
                      <p className="mt-1 text-xs text-slate-500">Sample status only — no real backup has been run.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setMessage("Connect a backend backup service before running a backup.")} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"><RefreshCw size={13} className="mr-1 inline" /> Back up now</button>
                    <button type="button" onClick={() => setMessage("Connect an authorized export endpoint to download real platform data.")} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"><Download size={13} className="mr-1 inline" /> Export all data</button>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Auto-backup Frequency">
                    <select className={inputClass} defaultValue="Daily (Recommended)">
                      <option>Daily (Recommended)</option><option>Weekly</option><option>Monthly</option><option>Disabled</option>
                    </select>
                  </Field>
                  <Field label="Snapshot Retention Cycle">
                    <select className={inputClass} defaultValue="12 months">
                      <option>3 months</option><option>6 months</option><option>12 months</option><option>24 months</option>
                    </select>
                  </Field>
                </div>
              </Card>
            </div>

            {/* Danger zone */}
            <div id="danger" className="scroll-mt-24">
              <Card className="border-red-100">
                <SectionTitle
                  icon={AlertTriangle}
                  title="Danger Zone"
                  description="These actions can affect the platform or remove important data."
                />
                <div className="space-y-4 rounded-xl border border-red-100 bg-red-50/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-red-900">Purge Cache Storage</p>
                      <p className="mt-1 text-xs leading-5 text-red-700">Clear cached data to refresh platform content.</p>
                    </div>
                    <button type="button" onClick={() => setMessage("Cache clearing requires a backend endpoint.")} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100">
                      <Trash2 size={13} className="mr-1 inline" /> Clear cache
                    </button>
                  </div>
                  <div className="border-t border-red-100 pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-red-900">Reset Global Parameters</p>
                        <p className="mt-1 text-xs leading-5 text-red-700">Restore the editable demo settings to their initial values.</p>
                      </div>
                      <button type="button" onClick={resetSettings} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100">
                        <RotateCcw size={13} className="mr-1 inline" /> Reset settings
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-red-100 pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-red-900">Emergency Platform Shutdown</p>
                        <p className="mt-1 text-xs leading-5 text-red-700">A real shutdown must require server-side authorization and confirmation.</p>
                      </div>
                      <button type="button" onClick={() => {
                        if (window.confirm("This is a demo action. No platform will be shut down. Continue?")) {
                          setMessage("Demo only: no platform shutdown was performed.");
                        }
                      }} className="rounded-lg bg-red-700 px-3 py-2 text-xs font-semibold text-white hover:bg-red-800">
                        <AlertTriangle size={13} className="mr-1 inline" /> Emergency action
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bottom save controls */}
            <div className="sticky bottom-3 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
              <p className="text-xs text-slate-500">
                {saved ? "Changes applied in this session." : "You may have unsaved changes."}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={resetSettings} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Discard</button>
                <button type="button" onClick={saveSettings} className="rounded-lg bg-[#075c3b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#064b31]"><Save size={13} className="mr-1 inline" /> Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
