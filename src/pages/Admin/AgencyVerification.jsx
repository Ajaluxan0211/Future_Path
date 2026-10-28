
import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  FileText,
  RefreshCw,
  Building2,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

const API = "http://localhost:5000/api/agency";

const DOCUMENTS = [
  {
    key: "businessRegistrationUrl",
    label: "Business Registration Certificate",
  },
  {
    key: "migrationLicenseUrl",
    label: "Migration License",
  },
  {
    key: "governmentCertificateUrl",
    label: "Government Registration Certificate",
  },
  {
    key: "officePhotoUrl",
    label: "Office Photo (optional)",
  },
];

export default function AgencyVerification() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busyId, setBusyId] = useState("");
  const [notes, setNotes] = useState({});
  const [filter, setFilter] = useState("PENDING");

  const loadAgencies = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/admin/list`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            (response.status === 401
              ? "Please log in as an administrator."
              : response.status === 403
                ? "Administrator access is required."
                : "Could not load agency applications.")
        );
      }

      setAgencies(result.agencies || []);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the backend. Make sure it is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAgencies();
  }, [loadAgencies]);

  async function review(agencyId, status) {
    let rejectionReason = "";

    if (status === "REJECTED") {
      rejectionReason = (
        window.prompt("Enter the reason for rejecting this agency:")
        || ""
      ).trim();

      if (!rejectionReason) {
        return;
      }
    }

    const confirmed = window.confirm(
      `Are you sure you want to ${status.toLowerCase()} this agency?`
    );

    if (!confirmed) return;

    setBusyId(agencyId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API}/admin/${encodeURIComponent(agencyId)}/decision`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            rejectionReason,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not update the agency application."
        );
      }

      setSuccess(
        result.message ||
          `Agency ${status.toLowerCase()} successfully.`
      );

      await loadAgencies();
    } catch (err) {
      setError(err.message || "Agency review failed.");
    } finally {
      setBusyId("");
    }
  }

  function openDocument(agency, documentKey) {
    const relativeUrl = agency[documentKey];

    if (!relativeUrl) {
      setError("This document has not been uploaded.");
      return;
    }

    // The backend returns URLs beginning with
    // /uploads/agency-documents/<generated-filename>
    const documentUrl = new URL(
      relativeUrl,
      "http://localhost:5000"
    );

    // Do not allow an unexpected external URL.
    if (documentUrl.origin !== "http://localhost:5000") {
      setError("The document URL is invalid.");
      return;
    }

    window.open(
      documentUrl.href,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const shown =
    filter === "ALL"
      ? agencies
      : agencies.filter(
          (agency) => agency.verificationStatus === filter
        );

  const counts = {
    PENDING: agencies.filter(
      (agency) => agency.verificationStatus === "PENDING"
    ).length,
    APPROVED: agencies.filter(
      (agency) => agency.verificationStatus === "APPROVED"
    ).length,
    REJECTED: agencies.filter(
      (agency) => agency.verificationStatus === "REJECTED"
    ).length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Agency Verification
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review submitted agency information and supporting documents.
            </p>
          </div>

          <button
            type="button"
            onClick={loadAgencies}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:opacity-50"
          >
            <RefreshCw size={15} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Pending", counts.PENDING],
            ["Approved", counts.APPROVED],
            ["Rejected", counts.REJECTED],
          ].map(([label, count]) => (
            <div
              key={label}
              className="rounded-xl border bg-white p-4"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {count}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {[
            ["PENDING", "Pending"],
            ["APPROVED", "Approved"],
            ["REJECTED", "Rejected"],
            ["ALL", "All applications"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                filter === value
                  ? "bg-emerald-800 text-white"
                  : "border bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            {success}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border bg-white p-8 text-slate-500">
            Loading agency applications...
          </div>
        ) : shown.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <Building2
              className="mx-auto mb-3 text-slate-400"
              size={32}
            />
            <p className="font-semibold text-slate-800">
              No applications found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              There are no applications in this category.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {shown.map((agency) => (
              <article
                key={agency.id}
                className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {agency.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-600">
                      Owner: {agency.ownerName || agency.user?.name || "—"}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Email: {agency.user?.email || "—"}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {[agency.address, agency.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Submitted:{" "}
                      {agency.submittedAt
                        ? new Date(
                            agency.submittedAt
                          ).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      agency.verificationStatus === "APPROVED"
                        ? "bg-emerald-100 text-emerald-800"
                        : agency.verificationStatus === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {agency.verificationStatus}
                  </span>
                </div>

                {agency.description && (
                  <p className="mt-3 text-sm text-slate-600">
                    {agency.description}
                  </p>
                )}

                <div className="mt-5">
                  <h3 className="mb-3 font-semibold text-slate-800">
                    Submitted documents
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {DOCUMENTS.map(({ key, label }) => {
                      const url = agency[key];

                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between gap-3 rounded-xl border p-3"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <FileText
                              className="shrink-0 text-emerald-800"
                              size={19}
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-700">
                                {label}
                              </p>
                              <p className="text-xs text-slate-400">
                                {url
                                  ? "Document uploaded"
                                  : "Not uploaded"}
                              </p>
                            </div>
                          </div>

                          {url ? (
                            <button
                              type="button"
                              onClick={() =>
                                openDocument(agency, key)
                              }
                              className="flex shrink-0 items-center gap-1 rounded-lg border border-emerald-800 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                            >
                              View <ExternalLink size={13} />
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400">
                              Unavailable
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {agency.rejectionReason && (
                  <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    Previous rejection reason: {agency.rejectionReason}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={
                      busyId === agency.id ||
                      agency.verificationStatus === "APPROVED"
                    }
                    onClick={() => review(agency.id, "APPROVED")}
                    className="flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckCircle size={16} />
                    {busyId === agency.id
                      ? "Saving..."
                      : "Approve agency"}
                  </button>

                  <button
                    type="button"
                    disabled={
                      busyId === agency.id ||
                      agency.verificationStatus === "REJECTED"
                    }
                    onClick={() => review(agency.id, "REJECTED")}
                    className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XCircle size={16} />
                    Reject application
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
