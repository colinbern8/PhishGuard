import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ScanSearch, FileText, Link as LinkIcon, Upload, AlertTriangle, Clock, Loader2, Check } from 'lucide-react';
import { ApiNotice } from '../ApiNotice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ANALYSIS_STEPS = [
  { text: 'Extracting email headers...', duration: 800 },
  { text: 'Analyzing sender reputation...', duration: 800 },
  { text: 'Scanning for malicious links...', duration: 800 },
  { text: 'Checking threat database...', duration: 800 },
  { text: 'Running AI classification...', duration: 1000 },
  { text: 'Generating report...', duration: 600 },
];

const URL_ANALYSIS_STEPS = [
  { text: 'Resolving URL...', duration: 800 },
  { text: 'Analyzing domain reputation...', duration: 800 },
  { text: 'Scanning for malicious patterns...', duration: 800 },
  { text: 'Checking threat database...', duration: 800 },
  { text: 'Running AI classification...', duration: 1000 },
  { text: 'Generating report...', duration: 600 },
];

export function PhishingScanner() {
  const navigate = useNavigate();
  const [emailContent, setEmailContent] = useState('');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [scanType, setScanType] = useState<'email' | 'url' | null>(null);
  const [scanContent, setScanContent] = useState<string>('');

  const steps = scanType === 'email' ? ANALYSIS_STEPS : URL_ANALYSIS_STEPS;

  useEffect(() => {
    if (!isAnalyzing) return;

    if (analysisStep < steps.length) {
      const timeout = setTimeout(() => {
        setAnalysisStep(analysisStep + 1);
      }, steps[analysisStep].duration);

      return () => clearTimeout(timeout);
    } else {
      // All steps complete, navigate after 500ms pause
      const timeout = setTimeout(() => {
        navigate('/app/scanner/results', { 
          state: { 
            type: scanType, 
            content: scanContent 
          } 
        });
        // Reset state
        setIsAnalyzing(false);
        setAnalysisStep(0);
        setScanType(null);
        setScanContent('');
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isAnalyzing, analysisStep, steps, navigate, scanType, scanContent]);

  const handleScanEmail = () => {
    if (!emailContent.trim()) {
      alert('Please enter email content to scan');
      return;
    }
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setScanType('email');
    setScanContent(emailContent);
  };

  const handleScanURL = () => {
    if (!url.trim()) {
      alert('Please enter a URL to scan');
      return;
    }
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setScanType('url');
    setScanContent(url);
  };

  const exampleEmail = `From: security@paypa1-verify.com
To: user@example.com
Subject: Urgent: Your PayPal Account Has Been Limited

Dear Valued Customer,

We have detected unusual activity on your PayPal account. To protect your account, 
we have temporarily limited access until you verify your information.

Please click here to verify your account immediately:
https://paypal-secure-login.tk/verify

If you do not verify within 24 hours, your account will be permanently suspended.

Thank you for your cooperation.
PayPal Security Team`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <ScanSearch className="h-8 w-8 mr-3 text-[#1F4E78]" />
            Phishing Scanner
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Analyze suspicious emails and URLs for potential threats before clicking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Scanner */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Scan for Threats</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Paste email content or enter a URL to check for phishing indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApiNotice api="VirusTotal / PhishTank" />
                <Tabs defaultValue="email" disabled={isAnalyzing}>
                  <TabsList className="grid w-full grid-cols-2 mb-6" disabled={isAnalyzing}>
                    <TabsTrigger
                      value="email"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-gray-100 dark:bg-[#1E1E2E] text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isAnalyzing}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Scan Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="url"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-gray-100 dark:bg-[#1E1E2E] text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isAnalyzing}
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Scan URL
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4">
                    <div>
                      <Label htmlFor="email-content" className="text-gray-900 dark:text-white">
                        Email Content
                      </Label>
                      <Textarea
                        id="email-content"
                        placeholder="Paste email content here (including headers if available)"
                        className="min-h-[300px] font-mono text-sm bg-gray-100 dark:bg-[#1E1E2E] text-gray-900 dark:text-white border border-gray-300 dark:border-[#2E2E3E] disabled:opacity-50 disabled:cursor-not-allowed"
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        disabled={isAnalyzing}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Include email headers, subject, sender, and body for best results
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor="email-file" className="cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-[#2E75B6] transition-colors text-center bg-gray-50 dark:bg-[#1E1E2E]">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Or upload .eml file
                            </p>
                          </div>
                        </Label>
                        <Input id="email-file" type="file" accept=".eml,.msg" className="hidden" />
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#1F4E78] hover:bg-[#2E75B6] disabled:opacity-50 disabled:cursor-not-allowed"
                      size="lg"
                      onClick={handleScanEmail}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing && scanType === 'email' ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <ScanSearch className="mr-2 h-5 w-5" />
                          Analyze Email
                        </>
                      )}
                    </Button>

                    {isAnalyzing && scanType === 'email' && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg border border-gray-200 dark:border-[#2E2E3E] animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-3">
                          {steps.map((step, index) => {
                            const isPending = index > analysisStep;
                            const isActive = index === analysisStep;
                            const isComplete = index < analysisStep;

                            return (
                              <div
                                key={index}
                                className={`flex items-center gap-3 transition-all duration-300 ${
                                  isComplete ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-60'
                                }`}
                              >
                                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                  {isPending && (
                                    <Clock className="h-4 w-4 text-gray-400" />
                                  )}
                                  {isActive && (
                                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                                  )}
                                  {isComplete && (
                                    <Check className="h-4 w-4 text-green-600" />
                                  )}
                                </div>
                                <span
                                  className={`text-sm ${
                                    isComplete
                                      ? 'text-gray-500 dark:text-gray-400 line-through'
                                      : isActive
                                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                                      : 'text-gray-600 dark:text-gray-400'
                                  }`}
                                >
                                  {step.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <Button 
                      variant="link" 
                      onClick={() => setEmailContent(exampleEmail)}
                      className="w-full"
                      disabled={isAnalyzing}
                    >
                      Load example suspicious email
                    </Button>
                  </TabsContent>

                  <TabsContent value="url" className="space-y-4">
                    <div>
                      <Label htmlFor="url-input" className="text-gray-900 dark:text-white">
                        URL to Check
                      </Label>
                      <Input
                        id="url-input"
                        type="text"
                        placeholder="https://example.com or bit.ly/abc123"
                        className="font-mono bg-gray-100 dark:bg-[#1E1E2E] text-gray-900 dark:text-white border border-gray-300 dark:border-[#2E2E3E] disabled:opacity-50 disabled:cursor-not-allowed"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isAnalyzing}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Enter any URL including shortened links (bit.ly, tinyurl, etc.)
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-[#1F4E78] hover:bg-[#2E75B6] disabled:opacity-50 disabled:cursor-not-allowed"
                      size="lg"
                      onClick={handleScanURL}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing && scanType === 'url' ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <ScanSearch className="mr-2 h-5 w-5" />
                          Check URL
                        </>
                      )}
                    </Button>

                    {isAnalyzing && scanType === 'url' && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg border border-gray-200 dark:border-[#2E2E3E] animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-3">
                          {steps.map((step, index) => {
                            const isPending = index > analysisStep;
                            const isActive = index === analysisStep;
                            const isComplete = index < analysisStep;

                            return (
                              <div
                                key={index}
                                className={`flex items-center gap-3 transition-all duration-300 ${
                                  isComplete ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-60'
                                }`}
                              >
                                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                  {isPending && (
                                    <Clock className="h-4 w-4 text-gray-400" />
                                  )}
                                  {isActive && (
                                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                                  )}
                                  {isComplete && (
                                    <Check className="h-4 w-4 text-green-600" />
                                  )}
                                </div>
                                <span
                                  className={`text-sm ${
                                    isComplete
                                      ? 'text-gray-500 dark:text-gray-400 line-through'
                                      : isActive
                                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                                      : 'text-gray-600 dark:text-gray-400'
                                  }`}
                                >
                                  {step.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Recent Scans</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-mono">paypal-verify.tk</span>
                          </div>
                          <span className="text-xs text-red-600 font-medium">High Risk</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-mono">amazon.com</span>
                          </div>
                          <span className="text-xs text-green-600 font-medium">Safe</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-mono">bit.ly/package123</span>
                          </div>
                          <span className="text-xs text-orange-600 font-medium">Suspicious</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">What We Check</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 dark:bg-[#1E1E2E] p-1 rounded">
                    <ScanSearch className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Sender Reputation</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Verify email sender authenticity</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 dark:bg-[#1E1E2E] p-1 rounded">
                    <LinkIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Malicious Links</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Detect dangerous URLs</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 dark:bg-[#1E1E2E] p-1 rounded">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Known Threats</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Compare against threat database</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 dark:bg-[#1E1E2E] p-1 rounded">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Content Analysis</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">AI-powered pattern detection</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardContent className="pt-6">
                <div className="flex gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <p className="text-sm font-medium text-blue-900 dark:text-white">Privacy Notice</p>
                </div>
                <p className="text-xs text-blue-800 dark:text-gray-300">
                  Your data is analyzed locally and securely. We do not store or share 
                  the content you scan.
                </p>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full bg-gray-100 dark:bg-[#1E1E2E] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2E2E3E]"
              asChild
            >
              <a href="/app/scanner/history">View Scan History</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
