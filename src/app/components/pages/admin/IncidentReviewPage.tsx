import { useMemo, useState } from "react";
import { MailWarning, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Textarea } from "../../ui/textarea";
import { toast } from "sonner";
import { listIncidentReports, updateIncidentReport, type IncidentReport } from "../../../lib/prototypeStorage";

export function IncidentReviewPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const reports = useMemo(() => listIncidentReports(), []);
  const selected = useMemo(() => reports.find((r) => r.id === selectedId) ?? null, [reports, selectedId]);

  const select = (r: IncidentReport) => {
    setSelectedId(r.id);
    setNotes(r.adminNotes ?? "");
  };

  const verify = () => {
    if (!selected) return;
    updateIncidentReport(selected.id, {
      status: "verified",
      verified: true,
      adminNotes: notes.trim() || undefined,
    });
    toast.success("Marked as VERIFIED (prototype). Refresh page to see status update.");
  };

  const reject = () => {
    if (!selected) return;
    updateIncidentReport(selected.id, {
      status: "rejected",
      verified: false,
      adminNotes: notes.trim() || undefined,
    });
    toast("Marked as REJECTED (prototype). Refresh page to see status update.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MailWarning className="w-8 h-8 text-[#1F4E78]" />
            Incident Review Queue
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Prototype UC-023: review pending reports, verify/reject, and add notes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-[#12121A] lg:col-span-1">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {reports.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">No reports submitted yet.</p>
              ) : (
                reports.slice(0, 50).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => select(r)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      r.id === selectedId ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-[#1E1E2E] hover:bg-gray-100 dark:hover:bg-[#2A2A3A]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                        {r.reportType.toUpperCase()} • {r.submittedBy}
                      </span>
                      <Badge variant={r.status === "pending" ? "secondary" : r.status === "verified" ? "default" : "destructive"}>
                        {r.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{r.submittedDate}</p>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#12121A] lg:col-span-2">
            <CardHeader>
              <CardTitle>Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selected ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">Select a report to review.</p>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{selected.reportType.toUpperCase()}</Badge>
                    <Badge variant="outline">Threat: {selected.threatLevel.toUpperCase()}</Badge>
                    <Badge variant={selected.status === "pending" ? "secondary" : selected.status === "verified" ? "default" : "destructive"}>
                      {selected.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Submitted by</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selected.submittedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Content</p>
                    <pre className="text-xs font-mono whitespace-pre-wrap bg-gray-50 dark:bg-[#1E1E2E] p-3 rounded border border-gray-200 dark:border-[#2E2E3E]">
                      {selected.content}
                    </pre>
                  </div>
                  {selected.context && (
                    <div>
                      <p className="text-sm font-medium mb-2">Context</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{selected.context}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium mb-2">Admin Notes</p>
                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-[120px]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={verify} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Verify
                    </Button>
                    <Button onClick={reject} variant="destructive">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Prototype note: this updates localStorage. Refresh to see changes reflected in the list.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

