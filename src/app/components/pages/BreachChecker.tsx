import { useState } from 'react';
import { Shield, Search, AlertTriangle, CheckCircle, Database, Loader2 } from 'lucide-react';
import { ApiNotice } from '../ApiNotice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export function BreachChecker() {
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const [breachesFound, setBreachesFound] = useState(true);

  const handleCheck = () => {
    if (!email.trim()) return;

    setIsChecking(true);
    setChecked(false);

    // Mock "API" latency; replace with real call later.
    window.setTimeout(() => {
      setBreachesFound(true);
      setIsChecking(false);
      setChecked(true);
    }, 1200);
  };

  const mockBreaches = [
    {
      name: 'Adobe',
      date: 'October 2013',
      records: '153 million',
      types: ['Email addresses', 'Passwords', 'Password hints', 'Usernames'],
      severity: 'High'
    },
    {
      name: 'LinkedIn',
      date: 'June 2012',
      records: '164 million',
      types: ['Email addresses', 'Passwords'],
      severity: 'High'
    },
    {
      name: 'Dropbox',
      date: 'August 2012',
      records: '68 million',
      types: ['Email addresses', 'Passwords'],
      severity: 'Medium'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center text-gray-900 dark:text-white">
            <Database className="h-8 w-8 mr-3 text-[#1F4E78]" />
            Data Breach Checker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Check if your email has been exposed in data breaches
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Check Your Email</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  We use secure hash verification to protect your privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ApiNotice api="HaveIBeenPwned" />
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white dark:bg-[#1E1E2E] border border-gray-300 dark:border-[#2E2E3E] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                    <Button
                      disabled={isChecking}
                      onClick={handleCheck}
                      className="bg-[#1F4E78] hover:bg-[#2E75B6]"
                    >
                      {isChecking ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Checking databases...
                        </>
                      ) : (
                        'Check for Breaches'
                      )}
                    </Button>
                  </div>
                </div>

                {isChecking && (
                  <div className="space-y-3 mt-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                )}

                {checked && !isChecking && (
                  <div>
                    {breachesFound ? (
                      <div className="space-y-6">
                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                            <p className="font-bold text-red-900 dark:text-red-200">
                              Your email appears in {mockBreaches.length} data breaches
                            </p>
                          </div>
                          <p className="text-sm text-red-800 dark:text-red-200">
                            Take immediate action to secure your accounts
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                            Breach Details
                          </h3>
                          <Accordion type="single" collapsible>
                            {mockBreaches.map((breach, idx) => (
                              <AccordionItem key={idx} value={`breach-${idx}`}>
                                <AccordionTrigger>
                                  <div className="flex items-center gap-3 text-left">
                                    <div>
                                      <p className="font-semibold text-gray-900 dark:text-white">
                                        {breach.name}
                                      </p>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {breach.date} • {breach.records} accounts
                                      </p>
                                    </div>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="pl-4 space-y-3">
                                    <div>
                                      <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Compromised Data:
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {breach.types.map((type) => (
                                          <Badge key={type} variant="destructive">{type}</Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Severity:
                                      </p>
                                      <Badge variant={breach.severity === 'High' ? 'destructive' : 'secondary'}>
                                        {breach.severity}
                                      </Badge>
                                    </div>
                                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                                      <p className="text-sm font-semibold text-orange-900 dark:text-orange-200 mb-1">
                                        What to do:
                                      </p>
                                      <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                                        <li>• Change your {breach.name} password immediately</li>
                                        <li>• Enable two-factor authentication</li>
                                        <li>• Change passwords on other sites using the same credentials</li>
                                      </ul>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded text-center">
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <p className="font-bold text-green-900 dark:text-green-200 text-lg mb-2">
                          Great news!
                        </p>
                        <p className="text-green-800 dark:text-green-200">
                          Your email was not found in any known data breaches.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Privacy Notice</p>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  We use k-anonymity hashing to check your email without storing or exposing it.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Action Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="text-sm space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#1F4E78]">1.</span>
                    <span>Change passwords for affected services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#1F4E78]">2.</span>
                    <span>Enable 2FA on all accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#1F4E78]">3.</span>
                    <span>Monitor accounts for suspicious activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#1F4E78]">4.</span>
                    <span>Consider credit monitoring services</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
