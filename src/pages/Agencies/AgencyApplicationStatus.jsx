
export default function AgencyApplicationStatus() {
  return (
    <main className="min-h-screen bg-emerald-50 px-4 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-5 text-4xl">🏢</div>

        <h1 className="text-3xl font-bold text-slate-900">
          Agency Application Status
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Thank you for registering your agency with FuturePath.
          Your application will be reviewed by our administration team.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900">
            Application submitted
          </h2>
          <p className="mt-2 text-sm text-amber-800">
            Your application is awaiting verification.
          </p>
          <p className="mt-3 font-bold text-amber-900">
            Status: Pending
          </p>
        </div>

        <a
          href="/"
          className="mt-8 inline-block rounded-lg bg-emerald-800 px-6 py-3 font-semibold text-white hover:bg-emerald-900"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
