import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertCircle, Send, CheckCircle2, Copy, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

const ATTACK_TAGS = [
  'Credential Theft',
  'Urgency Tactic',
  'Impersonation',
  'Prize/Reward',
  'IT/Tech Support',
  'Financial',
  'Government'
];

export function ReportPhishing() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('email');
  const [content, setContent] = useState('');
  const [context, setContext] = useState('');
  const [category, setCategory] = useState('');
  const [impact, setImpact] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedReportId = '#' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setReportId(generatedReportId);
    setSubmitted(true);
    toast.success("Report submitted! +25 XP earned 🎯");
  };

  const handleReset = () => {
    setReportType('email');
    setContent('');
    setContext('');
    setCategory('');
    setImpact('');
    setSelectedTags([]);
    setSubmitted(false);
    setReportId(null);
  };

  const handleCopyReportId = async () => {
    if (reportId) {
      try {
        await navigator.clipboard.writeText(reportId);
        toast.success('Report ID copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy report ID');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <AlertCircle className="h-8 w-8 mr-3 text-red-600" />
            Report a Phishing Attempt
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Help protect the community by reporting real threats</p>
        </div>

        {submitted && reportId ? (
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                    Report Submitted Successfully!
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 dark:text-gray-300">Report ID:</span>
                      <code className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-sm text-gray-900 dark:text-gray-100">
                        {reportId}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyReportId}
                        className="h-8"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our team will review your report within 24-48 hours
                    </p>
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                        You've earned 25 XP for this submission. Bonus XP if verified!
                      </p>
                    </div>
                    <div className="flex gap-4 pt-2">
                      <Button onClick={handleReset} variant="outline">
                        Submit Another Report
                      </Button>
                      <Button onClick={() => navigate('/app/community')} className="bg-blue-600 hover:bg-blue-700">
                        View Community Feed
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>Provide as much information as possible to help verify the threat</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Report Type</Label>
                  <RadioGroup value={reportType} onValueChange={setReportType} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email" className="cursor-pointer">Phishing Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="url" id="url" />
                      <Label htmlFor="url" className="cursor-pointer">Suspicious URL</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="sms" />
                      <Label htmlFor="sms" className="cursor-pointer">SMS Phishing (Smishing)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste the suspicious email content, URL, or SMS message here"
                    className="min-h-[200px] font-mono text-sm"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="context">Additional Context</Label>
                  <Textarea
                    id="context"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="How did you receive this? Why do you think it's phishing?"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banking">Banking/Financial</SelectItem>
                      <SelectItem value="tech">Tech Support Scam</SelectItem>
                      <SelectItem value="govt">Government Impersonation</SelectItem>
                      <SelectItem value="delivery">Package Delivery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="impact">Estimated Impact</Label>
                  <Input
                    id="impact"
                    type="number"
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    placeholder="How many people might have received this?"
                  />
                </div>

                <div>
                  <Label>Attack Type Tags</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ATTACK_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Report
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Tips for Good Reports</h3>
            <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Include full email headers if possible</li>
              <li>• Provide screenshots or attachments as evidence</li>
              <li>• Describe the specific threat or deception</li>
              <li>• Note any URLs or phone numbers included</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
