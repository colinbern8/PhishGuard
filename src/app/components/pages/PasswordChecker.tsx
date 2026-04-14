import { useState } from 'react';
import { Shield, Eye, EyeOff, Check, X, RefreshCw, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';

export function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [length, setLength] = useState([12]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 25;
    if (/\d/.test(password)) score += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) score += 12.5;

    if (score < 40) return { score, label: 'Weak', color: 'red' };
    if (score < 60) return { score, label: 'Fair', color: 'orange' };
    if (score < 80) return { score, label: 'Good', color: 'yellow' };
    return { score, label: 'Strong', color: 'green' };
  };

  const strength = getPasswordStrength();

  const checks = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /\d/.test(password) },
    { label: 'Contains special character', met: /[^a-zA-Z0-9]/.test(password) },
  ];

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowercase + uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    let result = '';
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center text-gray-900 dark:text-white">
            <Shield className="h-8 w-8 mr-3 text-[#1F4E78]" />
            Password Strength Checker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Test and generate strong passwords</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Check Password Strength</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Your password is checked locally and never sent to our servers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Enter Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password to check"
                    className="pr-10 bg-white dark:bg-[#1E1E2E] border border-gray-300 dark:border-[#2E2E3E] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {password && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Strength:
                      </span>
                      <span className={`text-sm font-medium text-${strength.color}-600`}>
                        {strength.label}
                      </span>
                    </div>
                    <Progress
                      value={strength.score}
                      className={`h-3 bg-gray-200 dark:bg-[#2E2E3E] [&>div]:bg-${strength.color}-500`}
                    />
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1E1E2E] border border-gray-200 dark:border-[#2E2E3E] p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estimated crack time:
                    </p>
                    <p className="text-lg font-bold text-[#1F4E78]">
                      {strength.score < 40 ? '2 hours' : strength.score < 60 ? '3 months' : strength.score < 80 ? '10 years' : '100+ years'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Requirements:
                    </p>
                    {checks.map((check, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {check.met ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        )}
                        <span
                          className={`text-sm ${
                            check.met ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Generate Strong Password</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Create a secure password with custom options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">
                  Password Length: {length[0]}
                </Label>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  min={8}
                  max={32}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                  />
                  <label
                    htmlFor="numbers"
                    className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    Include numbers (0-9)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                  />
                  <label
                    htmlFor="symbols"
                    className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    Include symbols (!@#$%...)
                  </label>
                </div>
              </div>

              <Button className="w-full" onClick={generatePassword}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Password
              </Button>

              {password && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-[#1E1E2E] border border-gray-200 dark:border-[#2E2E3E] rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono text-gray-900 dark:text-white">
                      {password}
                    </code>
                    <Button size="sm" variant="ghost">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    Best Practices
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Use unique passwords for each account</li>
                    <li>• Consider using a password manager</li>
                    <li>• Enable two-factor authentication</li>
                    <li>• Never share passwords via email</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
