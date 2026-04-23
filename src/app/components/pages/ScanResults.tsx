import { useLocation, Link, useNavigate } from 'react-router';
import { Shield, AlertTriangle, XCircle, CheckCircle, Link as LinkIcon, Mail, FileText, AlertOctagon } from 'lucide-react';
import { ApiNotice } from '../ApiNotice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { useEffect, useMemo, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

export function ScanResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? null) as
    | { type?: 'email' | 'url'; content?: string; riskScore?: number; verdict?: 'safe' | 'suspicious' | 'dangerous' }
    | null;

  const type = state?.type ?? 'email';
  const content = state?.content ?? '';

  // Mock scan results
  const riskScore = state?.riskScore ?? 75; // 0-100
  const verdict = state?.verdict ?? (riskScore < 30 ? 'safe' : riskScore < 70 ? 'suspicious' : 'dangerous');

  // Persist to scan history (prototype)
  useEffect(() => {
    if (!content) return;
    const key = 'phishguard_scan_history_v1';
    const entry = {
      id: `scan_${Date.now()}`,
      type,
      content,
      riskScore,
      verdict,
      timestamp: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem(key) || '[]') as any[];
      const next = [entry, ...(Array.isArray(existing) ? existing : [])].slice(0, 200);
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // ignore storage errors in prototype
    }
  }, [content, riskScore, type, verdict]);

  const verdictConfig = {
    safe: {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-500',
      icon: CheckCircle,
      label: 'Safe',
      description: 'No significant threats detected'
    },
    suspicious: {
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-500',
      icon: AlertTriangle,
      label: 'Suspicious',
      description: 'Exercise caution - potential phishing indicators found'
    },
    dangerous: {
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-500',
      icon: XCircle,
      label: 'High Risk',
      description: 'Strong phishing indicators detected - DO NOT interact'
    }
  };

  const config = verdictConfig[verdict];
  const VerdictIcon = config.icon;

  const analysis = {
    knownMalicious: true,
    blacklisted: true,
    similarThreats: 127,
    suspiciousLinks: type === 'email' ? [
      'https://paypal-secure-login.tk/verify',
      'http://bit.ly/2xYz9wK'
    ] : [],
    keywords: ['urgent', 'verify', 'suspended', 'immediately', 'click here'],
    aiConfidence: 94
  };

  const recommendations = [
    'Do not click any links in this email',
    'Do not provide any personal information',
    'Verify directly with PayPal through their official website',
    'Report this email to your IT department',
    'Delete this email immediately'
  ];

  // False positive reporting (prototype)
  const [fpOpen, setFpOpen] = useState(false);
  const [fpReason, setFpReason] = useState('');
  const fpKey = 'phishguard_false_positive_reports_v1';
  const canReportFalsePositive = verdict !== 'safe';

  const submitFalsePositive = () => {
    const report = {
      id: `fp_${Date.now()}`,
      createdAt: new Date().toISOString(),
      scan: { type, content, riskScore, verdict },
      reason: fpReason.trim(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem(fpKey) || '[]') as any[];
      const next = [report, ...(Array.isArray(existing) ? existing : [])].slice(0, 100);
      localStorage.setItem(fpKey, JSON.stringify(next));
    } catch {
      // ignore
    }
    setFpOpen(false);
    setFpReason('');
    toast.success('Thanks! Your false-positive report was recorded for review.');
  };

  const canNavigateToReport = useMemo(() => Boolean(content), [content]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <ApiNotice api="Threat intelligence APIs" />
        {/* Risk Score Display */}
        <Card className={`mb-6 border-2 ${config.borderColor}`}>
          <CardContent className="pt-8">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-32 h-32 ${config.bgColor} rounded-full mb-4`}>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${config.color}`}>{riskScore}</div>
                  <div className="text-xs text-gray-600">Risk Score</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <VerdictIcon className={`h-8 w-8 ${config.color}`} />
                  <h1 className={`text-3xl font-bold ${config.color}`}>{config.label}</h1>
                </div>
                <p className="text-gray-600">{config.description}</p>
              </div>

              <Progress 
                value={riskScore} 
                className={`h-3 mb-6 ${
                  verdict === 'safe' ? '[&>div]:bg-green-500' :
                  verdict === 'suspicious' ? '[&>div]:bg-orange-500' :
                  '[&>div]:bg-red-500'
                }`}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Detailed Analysis */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Intelligence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Known Malicious</span>
                  <Badge variant={analysis.knownMalicious ? "destructive" : "default"}>
                    {analysis.knownMalicious ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Blacklist Status</span>
                  <Badge variant={analysis.blacklisted ? "destructive" : "default"}>
                    {analysis.blacklisted ? 'Blacklisted' : 'Clear'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Similar Threats Reported</span>
                  <Badge variant="secondary">{analysis.similarThreats}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Confidence</span>
                  <Badge>{analysis.aiConfidence}%</Badge>
                </div>
              </CardContent>
            </Card>

            {type === 'email' && (
              <Card>
                <CardHeader>
                  <CardTitle>Email Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Sender Reputation</p>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="flex-1 [&>div]:bg-red-500" />
                      <span className="text-sm text-red-600">Poor</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Suspicious Links Detected</p>
                    <div className="space-y-2">
                      {analysis.suspiciousLinks.map((link, idx) => (
                        <div key={idx} className="p-2 bg-red-50 rounded border border-red-200">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-red-600" />
                            <code className="text-xs text-red-800 break-all">{link}</code>
                          </div>
                          <Badge variant="destructive" className="mt-1 text-xs">
                            High Risk
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Suspicious Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {type === 'url' && (
              <Card>
                <CardHeader>
                  <CardTitle>URL Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Domain Information</p>
                    <p className="text-xs text-gray-600">paypal-secure-login.tk</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Registration Date</p>
                    <p className="text-xs text-gray-600">Registered 3 days ago</p>
                    <Badge variant="destructive" className="mt-1">
                      Recently Created
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Country</p>
                    <p className="text-xs text-gray-600">Unknown / Privacy Protected</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">SSL Certificate</p>
                    <Badge variant="destructive">No Valid Certificate</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900">Recommended Actions</CardTitle>
                <CardDescription className="text-orange-700">
                  Follow these steps to stay safe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertOctagon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-orange-900">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Take Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/app/report">
                  <Button className="w-full bg-red-600 hover:bg-red-700" disabled={!canNavigateToReport}>
                    <Shield className="mr-2 h-4 w-4" />
                    Report as Phishing
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={!canReportFalsePositive}
                  onClick={() => setFpOpen(true)}
                >
                  Report False Positive
                </Button>
                <Link to="/app/scanner">
                  <Button variant="outline" className="w-full">
                    Scan Another
                  </Button>
                </Link>
                <Link to="/app/scanner/history">
                  <Button variant="ghost" className="w-full">
                    View Scan History
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Scanned Content Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Scanned Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg max-h-64 overflow-auto">
                  <pre className="text-xs font-mono whitespace-pre-wrap">
                    {content.slice(0, 500)}{content.length > 500 ? '...' : ''}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={fpOpen} onOpenChange={setFpOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report false positive?</AlertDialogTitle>
            <AlertDialogDescription>
              If this scan was flagged incorrectly, send quick feedback so we can improve the prototype rules.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <p className="text-sm font-medium">What went wrong?</p>
            <Textarea
              value={fpReason}
              onChange={(e) => setFpReason(e.target.value)}
              placeholder="Example: This is a legitimate corporate login link, flagged due to unusual domain."
              className="min-h-[120px]"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={submitFalsePositive}
              disabled={fpReason.trim().length < 5}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
