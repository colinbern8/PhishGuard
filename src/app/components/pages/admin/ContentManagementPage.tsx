import { useMemo, useState } from "react";
import { FileText, Plus, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Badge } from "../../ui/badge";
import { toast } from "sonner";
import { listManagedModules, upsertManagedModule, type ManagedModule } from "../../../lib/prototypeStorage";

export function ContentManagementPage() {
  const existing = useMemo(() => listManagedModules(), []);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<ManagedModule["difficulty"]>("Beginner");
  const [duration, setDuration] = useState("20 min");
  const [category, setCategory] = useState("Custom");
  const [prerequisiteId, setPrerequisiteId] = useState<string>("none");
  const [contentHtml, setContentHtml] = useState("<h2>New Module</h2><p>Add content here…</p>");
  const [published, setPublished] = useState(false);

  const startNew = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setDifficulty("Beginner");
    setDuration("20 min");
    setCategory("Custom");
    setPrerequisiteId("none");
    setContentHtml("<h2>New Module</h2><p>Add content here…</p>");
    setPublished(false);
  };

  const load = (m: ManagedModule) => {
    setEditingId(m.id);
    setTitle(m.title);
    setDescription(m.description);
    setDifficulty(m.difficulty);
    setDuration(m.duration);
    setCategory(m.category);
    setPrerequisiteId(m.prerequisiteId ?? "none");
    setContentHtml(m.contentHtml);
    setPublished(m.published);
  };

  const save = () => {
    if (title.trim().length < 3) return;
    upsertManagedModule({
      id: editingId ?? undefined,
      title: title.trim(),
      description: description.trim(),
      difficulty,
      duration,
      category,
      prerequisiteId: prerequisiteId === "none" ? null : prerequisiteId,
      contentHtml,
      published,
    });
    toast.success(published ? "Module saved & published (prototype)." : "Module saved as draft (prototype).");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-8 h-8 text-[#1F4E78]" />
              Content Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Prototype UC-022: create/edit/publish training modules.
            </p>
          </div>
          <Button variant="outline" onClick={startNew}>
            <Plus className="w-4 h-4 mr-2" />
            New Module
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-[#12121A] lg:col-span-1">
            <CardHeader>
              <CardTitle>Library</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {existing.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">No custom modules yet.</p>
              ) : (
                existing.slice(0, 30).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => load(m)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-[#1E1E2E] hover:bg-gray-100 dark:hover:bg-[#2A2A3A] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">{m.title}</span>
                      <Badge variant={m.published ? "default" : "secondary"}>
                        {m.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Updated {new Date(m.updatedAt).toLocaleString()}</p>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#12121A] lg:col-span-2">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Module" : "Create Module"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module title" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short summary shown in catalog." />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={(v) => setDifficulty(v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="45 min" />
                </div>
                <div className="space-y-2">
                  <Label>Prerequisite</Label>
                  <Select value={prerequisiteId} onValueChange={setPrerequisiteId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {existing.map((m) => (
                        <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Module Content (HTML)</Label>
                <Textarea
                  value={contentHtml}
                  onChange={(e) => setContentHtml(e.target.value)}
                  className="min-h-[220px] font-mono text-sm"
                />
                <p className="text-xs text-gray-500">This prototype stores HTML and renders it in the custom module viewer.</p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  <span>Published</span>
                </div>
                <Button onClick={save} disabled={title.trim().length < 3} className="bg-[#1F4E78] hover:bg-[#2E75B6]">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

