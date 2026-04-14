import { useState } from 'react';
import { Link as LinkIcon, ArrowRight, Shield, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { ApiNotice } from '../ApiNotice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

export function URLExpander() {
  const [url, setUrl] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleExpand = async () => {
    setIsExpanding(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExpanding(false);
    setExpanded(true);
  };

  const redirectChain = [
    'bit.ly/2xYz9wK',
    't.co/abc123def',
    'paypal-secure-login.tk/verify'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center text-gray-900 dark:text-white">
            <LinkIcon className="h-8 w-8 mr-3 text-[#1F4E78]" />
            URL Expander & Analyzer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            See where shortened links really go before clicking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Expand Shortened URL</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Enter a shortened URL to see its destination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ApiNotice api="URL intelligence service" />
                <div>
                  <Label htmlFor="url" className="text-gray-700 dark:text-gray-300">
                    Shortened URL
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="url"
                      type="text"
                      placeholder="bit.ly/abc123, tinyurl.com/xyz..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 font-mono bg-white dark:bg-[#1E1E2E] border border-gray-300 dark:border-[#2E2E3E] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                    <Button
                      disabled={isExpanding}
                      onClick={handleExpand}
                      className="bg-[#1F4E78] hover:bg-[#2E75B6]"
                    >
                      {isExpanding ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Tracing redirects...
                        </>
                      ) : (
                        'Expand URL'
                      )}
                    </Button>
                  </div>
                </div>

                {isExpanding && (
                  <div className="space-y-3 mt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-14 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                )}

                {expanded && !isExpanding && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                        Redirect Chain
                      </h3>
                      <div className="space-y-2">
                        {redirectChain.map((step, idx) => (
                          <div key={idx}>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg">
                              <span className="text-xs font-semibold bg-gray-200 dark:bg-[#2E2E3E] text-gray-900 dark:text-white px-2 py-1 rounded">
                                {idx + 1}
                              </span>
                              <code className="text-sm flex-1 text-gray-900 dark:text-white">
                                {step}
                              </code>
                              {idx < redirectChain.length - 1 && (
                                <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                              )}
                            </div>
                            {idx < redirectChain.length - 1 && (
                              <div className="ml-8 h-4 border-l-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <p className="font-semibold text-red-900 dark:text-red-200">
                          Warning: Suspicious Destination
                        </p>
                      </div>
                      <p className="text-sm text-red-800 dark:text-red-200">
                        This URL leads to a potentially malicious website. Do not visit this link.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                        Final Destination Analysis
                      </h3>
                      <div className="bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-[#2E2E3E] rounded-lg p-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Full URL</p>
                          <code className="text-sm bg-gray-50 dark:bg-[#12121A] text-gray-900 dark:text-white p-2 rounded block break-all">
                            https://paypal-secure-login.tk/verify?user=12345
                          </code>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Domain</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              paypal-secure-login.tk
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                              Registration
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">3 days ago</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Country</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Unknown</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                              SSL Status
                            </p>
                            <Badge variant="destructive">No Certificate</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        Scan for Phishing
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Report Suspicious
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Recent Expansions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { short: 'bit.ly/abc123', dest: 'example.com', safe: true },
                    { short: 'tinyurl.com/xyz789', dest: 'paypal-fake.tk', safe: false },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-mono text-gray-900 dark:text-white">
                          {item.short}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          → {item.dest}
                        </p>
                      </div>
                      {item.safe ? (
                        <Badge className="bg-green-100 text-green-800">Safe</Badge>
                      ) : (
                        <Badge variant="destructive">Suspicious</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  Safety Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Number of Redirects
                  </p>
                  <p className="text-2xl font-bold text-[#1F4E78]">3</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Resolution Time
                  </p>
                  <p className="text-2xl font-bold text-[#1F4E78]">1.2s</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Safety Assessment
                  </p>
                  <Badge variant="destructive" className="text-sm">Dangerous</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <p className="font-semibold text-blue-700 dark:text-blue-300">
                    Why Expand URLs?
                  </p>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• See the real destination before clicking</li>
                  <li>• Detect phishing and malicious sites</li>
                  <li>• Identify tracking parameters</li>
                  <li>• Understand redirect chains</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
