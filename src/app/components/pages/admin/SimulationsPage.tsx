import { useMemo, useState } from "react";
import { Radar, Play, Save, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";
import { toast } from "sonner";
import { createCampaign, listCampaigns } from "../../../lib/prototypeStorage";

const TEMPLATES = [
  "Password Expiry Notice",
  "Shared Document Invitation",
  "Package Delivery Issue",
  "Payroll Update Required",
] as const;

const GROUPS = ["All Users", "New Hires", "Finance Team", "IT Team"] as const;

export function SimulationsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState<(typeof TEMPLATES)[number]>(TEMPLATES[0]);
  const [targetGroup, setTargetGroup] = useState<(typeof GROUPS)[number]>(GROUPS[0]);
  const [schedule, setSchedule] = useState<"immediate" | "scheduled" | "recurring">("immediate");
  const [scheduledFor, setScheduledFor] = useState<string>("");
  const [opens, setOpens] = useState(true);
  const [clicks, setClicks] = useState(true);
  const [replies, setReplies] = useState(false);

  const campaigns = useMemo(() => listCampaigns(), []);

  const canCreate = name.trim().length >= 3;

  const handleSaveDraft = () => {
    if (!canCreate) return;
    createCampaign({
      name: name.trim(),
      description: description.trim() || undefined,
      template,
      targetGroup,
      schedule,
      scheduledFor: schedule === "scheduled" ? (scheduledFor || null) : null,
      tracking: { opens, clicks, replies },
      status: "draft",
    });
    toast.success("Campaign saved as draft.");
    setName("");
    setDescription("");
  };

  const handleLaunch = () => {
    if (!canCreate) return;
    const status = schedule === "immediate" ? "running" : "scheduled";
    createCampaign({
      name: name.trim(),
      description: description.trim() || undefined,
      template,
      targetGroup,
      schedule,
      scheduledFor: schedule === "scheduled" ? (scheduledFor || null) : null,
      tracking: { opens, clicks, replies },
      status,
    });
    toast.success(schedule === "immediate" ? "Campaign launched (prototype)." : "Campaign scheduled (prototype).");
    setName("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Radar className="w-8 h-8 text-[#1F4E78]" />
            Simulated Phishing Campaigns
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Prototype UC-020: create, preview, save draft, and launch campaigns.
          </p>
        </div>

        <Card className="bg-white dark:bg-[#12121A]">
          <CardHeader>
            <CardTitle>Create Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Q4 Security Awareness Simulation" />
              </div>
              <div className="space-y-2">
                <Label>Target Group</Label>
                <Select value={targetGroup} onValueChange={(v) => setTargetGroup(v as any)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {GROUPS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What are you testing? What should users learn?" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Template</Label>
                <Select value={template} onValueChange={(v) => setTemplate(v as any)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TEMPLATES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Schedule</Label>
                <Select value={schedule} onValueChange={(v) => setSchedule(v as any)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Scheduled For (optional)</Label>
                <Input
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  placeholder="2026-04-30 09:00"
                  disabled={schedule !== "scheduled"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tracking</Label>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Checkbox checked={opens} onCheckedChange={(v) => setOpens(Boolean(v))} />
                  <span className="text-sm">Opens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={clicks} onCheckedChange={(v) => setClicks(Boolean(v))} />
                  <span className="text-sm">Clicks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={replies} onCheckedChange={(v) => setReplies(Boolean(v))} />
                  <span className="text-sm">Replies</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" disabled={!canCreate} onClick={() => toast("Preview (prototype): template content rendered in email client.")}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" disabled={!canCreate} onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-[#1F4E78] hover:bg-[#2E75B6]" disabled={!canCreate} onClick={handleLaunch}>
                <Play className="w-4 h-4 mr-2" />
                {schedule === "immediate" ? "Launch" : "Schedule"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#12121A]">
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {campaigns.length === 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">No campaigns yet.</p>
            ) : (
              campaigns.slice(0, 10).map((c) => (
                <div key={c.id} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-gray-50 dark:bg-[#1E1E2E]">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Template: {c.template} • Group: {c.targetGroup} • Schedule: {c.schedule}
                    </p>
                  </div>
                  <Badge variant={c.status === "running" ? "default" : c.status === "draft" ? "secondary" : "outline"}>
                    {c.status.toUpperCase()}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

