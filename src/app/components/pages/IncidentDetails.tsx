import { Link, useParams } from 'react-router';
import { ThumbsUp, Shield, AlertTriangle, ChevronLeft, CheckCircle2, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { listIncidentReports } from '../../lib/prototypeStorage';

export function IncidentDetails() {
  const { incidentId } = useParams();
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(45); // fallback
  const incident = incidentId ? listIncidentReports().find((r) => r.id === incidentId) : null;

  // Check localStorage on mount
  useEffect(() => {
    if (incidentId) {
      const confirmed = localStorage.getItem(`phishguard_confirmed_${incidentId}`);
      if (confirmed === 'true') {
        setHasConfirmed(true);
      }
    }
  }, [incidentId]);

  const handleConfirm = () => {
    if (!incidentId) return;
    
    setHasConfirmed(true);
    localStorage.setItem(`phishguard_confirmed_${incidentId}`, 'true');
    setUpvoteCount(prev => prev + 1);
    toast("Thanks! Your input helps the community 🛡️");
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/app/community">
          <Button
            variant="ghost"
            className="mb-6 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E1E2E]"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Community Feed
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive">HIGH RISK</Badge>
                  {incident?.verified ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-[#1E1E2E] dark:text-green-400">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified by Admin
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Under Review</Badge>
                  )}
                </div>
                <CardTitle className="text-gray-900 dark:text-white">
                  {incident?.context?.slice(0, 80) || 'Incident Details'}
                </CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Report {incidentId ? `#${incidentId.slice(-6)}` : '#'} • Submitted {incident?.submittedDate ?? '—'}
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{incident?.upvotes ?? upvoteCount} people received this</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-[#12121A] p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Email Content:</p>
                  <div className="font-mono text-sm bg-white dark:bg-[#0A0A0F] p-4 rounded border border-gray-200 dark:border-[#1E1E2E] text-gray-600 dark:text-gray-300">
                    <pre className="whitespace-pre-wrap">{incident?.content ?? 'No incident data found (prototype).'}</pre>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Indicators of Compromise:</p>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• Suspicious sender domain: paypa1-verify.com</li>
                    <li>• Urgent language creating false sense of emergency</li>
                    <li>• Generic greeting instead of personalized name</li>
                    <li>• Malicious link to fake PayPal login page</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="hover:bg-gray-100 dark:hover:bg-[#1E1E2E] hover:border-gray-200 dark:hover:border-[#1E1E2E]"
                  >
                    Share Alert
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* "I Received This Too" Confirmation Section */}
            {hasConfirmed ? (
              <Card className="bg-white dark:bg-[#12121A] border border-green-500/30 dark:border-green-500/30">
                <CardContent className="pt-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="text-green-400 w-5 h-5" />
                    <p className="text-green-400 text-sm font-medium">You confirmed receiving this phishing attempt</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white dark:bg-[#12121A] border border-orange-500/30 dark:border-orange-500/30">
                <CardContent className="pt-6">
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-orange-400">Did you receive this too?</p>
                      <p className="text-sm text-gray-400 mt-1">Help us track how widespread this attack is</p>
                    </div>
                    <Button onClick={handleConfirm} className="bg-orange-500 hover:bg-orange-600 text-white">
                      I Received This Too
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Community Comments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-[#12121A] rounded-lg">
                  <p className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">PhishHunter</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    I got the same email yesterday! Thanks for reporting.
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">2 hours ago</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#12121A] rounded-lg">
                  <p className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">CyberGuard</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This is definitely fake - notice the "1" instead of "l" in PayPal.
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">5 hours ago</p>
                </div>
                <Textarea placeholder="Add a comment..." />
                <Button className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500">
                  Post Comment
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Threat Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Report ID</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{incidentId ?? '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Submitted By</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{incident?.submittedBy ?? '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Submission Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{incident?.submittedDate ?? '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Status</p>
                  <Badge className={incident?.verified ? "bg-green-100 text-green-800 dark:bg-[#1E1E2E] dark:text-green-400" : ""} variant={incident?.verified ? "default" : "secondary"}>
                    {incident?.verified ? "Verified" : "Under Review"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Upvotes</p>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <p className="font-semibold text-gray-900 dark:text-white">{incident?.upvotes ?? upvoteCount} people</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-[#12121A] border border-orange-200 dark:border-[#1E1E2E]">
              <CardContent className="pt-6">
                <div className="flex gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <p className="font-semibold text-orange-900 dark:text-orange-300">Safety Tips</p>
                </div>
                <ul className="text-sm text-orange-800 dark:text-orange-300 space-y-1">
                  <li>• Never click links in suspicious emails</li>
                  <li>• Verify sender addresses carefully</li>
                  <li>• Contact PayPal directly if concerned</li>
                  <li>• Report to phishing@paypal.com</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
