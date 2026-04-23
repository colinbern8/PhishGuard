export type IncidentReportStatus = 'pending' | 'verified' | 'rejected';

export type IncidentReport = {
  id: string;
  reportType: 'email' | 'url' | 'sms';
  content: string;
  context?: string;
  category?: string;
  impact?: number | null;
  tags: string[];
  submittedBy: string;
  submittedDate: string; // YYYY-MM-DD
  status: IncidentReportStatus;
  adminNotes?: string;
  upvotes: number;
  verified: boolean;
  threatLevel: 'low' | 'medium' | 'high';
};

export type SimCampaignStatus = 'draft' | 'scheduled' | 'running' | 'completed';

export type SimulatedCampaign = {
  id: string;
  name: string;
  description?: string;
  template: string;
  targetGroup: string;
  schedule: 'immediate' | 'scheduled' | 'recurring';
  scheduledFor?: string | null;
  tracking: { opens: boolean; clicks: boolean; replies: boolean };
  status: SimCampaignStatus;
  createdAt: string;
};

export type ManagedModule = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  contentHtml: string;
  prerequisiteId?: string | null;
  published: boolean;
  updatedAt: string;
};

const REPORTS_KEY = 'phishguard_incident_reports_v1';
const CAMPAIGNS_KEY = 'phishguard_sim_campaigns_v1';
const MODULES_KEY = 'phishguard_managed_modules_v1';

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function genId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function listIncidentReports(): IncidentReport[] {
  return safeParse<IncidentReport[]>(localStorage.getItem(REPORTS_KEY)) ?? [];
}

export function saveIncidentReports(reports: IncidentReport[]) {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

export function createIncidentReport(input: Omit<IncidentReport, 'id' | 'status' | 'verified' | 'upvotes'> & { threatLevel?: IncidentReport['threatLevel'] }): IncidentReport {
  const report: IncidentReport = {
    id: genId('ir'),
    reportType: input.reportType,
    content: input.content,
    context: input.context,
    category: input.category,
    impact: input.impact ?? null,
    tags: input.tags ?? [],
    submittedBy: input.submittedBy,
    submittedDate: input.submittedDate,
    threatLevel: input.threatLevel ?? 'medium',
    status: 'pending',
    verified: false,
    upvotes: 0,
  };
  const next = [report, ...listIncidentReports()].slice(0, 300);
  saveIncidentReports(next);
  return report;
}

export function updateIncidentReport(id: string, patch: Partial<IncidentReport>) {
  const reports = listIncidentReports();
  const idx = reports.findIndex(r => r.id === id);
  if (idx === -1) return;
  reports[idx] = { ...reports[idx], ...patch };
  saveIncidentReports(reports);
}

export function listCampaigns(): SimulatedCampaign[] {
  return safeParse<SimulatedCampaign[]>(localStorage.getItem(CAMPAIGNS_KEY)) ?? [];
}

export function saveCampaigns(campaigns: SimulatedCampaign[]) {
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
}

export function createCampaign(input: Omit<SimulatedCampaign, 'id' | 'status' | 'createdAt'> & { status?: SimulatedCampaign['status'] }): SimulatedCampaign {
  const campaign: SimulatedCampaign = {
    id: genId('camp'),
    name: input.name,
    description: input.description,
    template: input.template,
    targetGroup: input.targetGroup,
    schedule: input.schedule,
    scheduledFor: input.scheduledFor ?? null,
    tracking: input.tracking,
    status: input.status ?? (input.schedule === 'immediate' ? 'running' : 'scheduled'),
    createdAt: new Date().toISOString(),
  };
  const next = [campaign, ...listCampaigns()].slice(0, 100);
  saveCampaigns(next);
  return campaign;
}

export function updateCampaign(id: string, patch: Partial<SimulatedCampaign>) {
  const campaigns = listCampaigns();
  const idx = campaigns.findIndex(c => c.id === id);
  if (idx === -1) return;
  campaigns[idx] = { ...campaigns[idx], ...patch };
  saveCampaigns(campaigns);
}

export function listManagedModules(): ManagedModule[] {
  return safeParse<ManagedModule[]>(localStorage.getItem(MODULES_KEY)) ?? [];
}

export function saveManagedModules(modules: ManagedModule[]) {
  localStorage.setItem(MODULES_KEY, JSON.stringify(modules));
}

export function upsertManagedModule(input: Omit<ManagedModule, 'id' | 'updatedAt'> & { id?: string }): ManagedModule {
  const now = new Date().toISOString();
  const modules = listManagedModules();
  const id = input.id ?? genId('mod');
  const next: ManagedModule = {
    id,
    title: input.title,
    description: input.description,
    difficulty: input.difficulty,
    duration: input.duration,
    category: input.category,
    contentHtml: input.contentHtml,
    prerequisiteId: input.prerequisiteId ?? null,
    published: input.published,
    updatedAt: now,
  };
  const idx = modules.findIndex(m => m.id === id);
  if (idx === -1) {
    saveManagedModules([next, ...modules].slice(0, 200));
  } else {
    modules[idx] = next;
    saveManagedModules(modules);
  }
  return next;
}

