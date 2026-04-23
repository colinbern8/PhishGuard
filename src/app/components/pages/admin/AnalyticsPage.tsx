import { useMemo } from "react";
import { BarChart3, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { listIncidentReports, listCampaigns, listManagedModules } from "../../../lib/prototypeStorage";

type ScanEntry = {
  id: string;
  type: "email" | "url";
  content: string;
  riskScore: number;
  verdict: "safe" | "suspicious" | "dangerous";
  timestamp: string;
};

function exportJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function AnalyticsPage() {
  const scans = useMemo(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("phishguard_scan_history_v1") || "[]") as ScanEntry[];
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  }, []);

  const reports = useMemo(() => listIncidentReports(), []);
  const campaigns = useMemo(() => listCampaigns(), []);
  const modules = useMemo(() => listManagedModules(), []);

  const stats = useMemo(() => {
    const safe = scans.filter((s) => s.verdict === "safe").length;
    const suspicious = scans.filter((s) => s.verdict === "suspicious").length;
    const dangerous = scans.filter((s) => s.verdict === "dangerous").length;
    const pending = reports.filter((r) => r.status === "pending").length;
    const verified = reports.filter((r) => r.status === "verified").length;
    const rejected = reports.filter((r) => r.status === "rejected").length;
    const publishedModules = modules.filter((m) => m.published).length;
    return { safe, suspicious, dangerous, pending, verified, rejected, publishedModules };
  }, [reports, scans, modules]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-[#1F4E78]" />
            Analytics Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Prototype UC-021: quick platform analytics + export.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-[#12121A]">
            <CardHeader>
              <CardTitle>Scans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm"><span>Safe</span><span className="font-semibold">{stats.safe}</span></div>
              <div className="flex justify-between text-sm"><span>Suspicious</span><span className="font-semibold">{stats.suspicious}</span></div>
              <div className="flex justify-between text-sm"><span>High Risk</span><span className="font-semibold">{stats.dangerous}</span></div>
              <div className="pt-3">
                <Button variant="outline" onClick={() => exportJson("phishguard-analytics-scans.json", scans)}>
                  <Download className="w-4 h-4 mr-2" /> Export Scans JSON
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#12121A]">
            <CardHeader>
              <CardTitle>Incident Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm"><span>Pending</span><span className="font-semibold">{stats.pending}</span></div>
              <div className="flex justify-between text-sm"><span>Verified</span><span className="font-semibold">{stats.verified}</span></div>
              <div className="flex justify-between text-sm"><span>Rejected</span><span className="font-semibold">{stats.rejected}</span></div>
              <div className="pt-3">
                <Button variant="outline" onClick={() => exportJson("phishguard-analytics-reports.json", reports)}>
                  <Download className="w-4 h-4 mr-2" /> Export Reports JSON
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#12121A]">
            <CardHeader>
              <CardTitle>Admin Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm"><span>Campaigns</span><span className="font-semibold">{campaigns.length}</span></div>
              <div className="flex justify-between text-sm"><span>Published Modules</span><span className="font-semibold">{stats.publishedModules}</span></div>
              <div className="pt-3 flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => exportJson("phishguard-analytics-campaigns.json", campaigns)}>
                  <Download className="w-4 h-4 mr-2" /> Campaigns JSON
                </Button>
                <Button variant="outline" onClick={() => exportJson("phishguard-analytics-modules.json", modules)}>
                  <Download className="w-4 h-4 mr-2" /> Modules JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

