import { Link, useNavigate } from 'react-router';
import { Shield, ArrowLeft, ShieldAlert, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ThemeToggle } from '../ui/theme-toggle';
import { useState, useEffect } from 'react';
import { mockLogin } from '../../lib/auth';

const LOCKOUT_KEY = 'phishguard_lockout_until';
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function isValidEmail(value: string): boolean {
  if (!value.includes('@')) return false;
  const afterAt = value.split('@')[1] ?? '';
  return afterAt.includes('.');
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // On mount: restore lockout from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCKOUT_KEY);
    if (stored) {
      const until = parseInt(stored, 10);
      if (!isNaN(until) && until > Date.now()) {
        setIsLocked(true);
        setLockoutEndTime(until);
      } else {
        localStorage.removeItem(LOCKOUT_KEY);
      }
    }
  }, []);

  // Countdown timer for lockout
  useEffect(() => {
    if (!isLocked || lockoutEndTime == null) return;
    const update = () => {
      const remaining = lockoutEndTime - Date.now();
      if (remaining <= 0) {
        localStorage.removeItem(LOCKOUT_KEY);
        setIsLocked(false);
        setLockoutEndTime(null);
        setRemainingTime('');
        setFailedAttempts(0);
        return;
      }
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      setRemainingTime(`${mins}:${secs.toString().padStart(2, '0')}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [isLocked, lockoutEndTime]);

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!isValidEmail(email.trim())) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
  };

  const handlePasswordBlur = () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }
    setPasswordError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLocked) return;

    const success = mockLogin(email, password);

    if (success) {
      setFailedAttempts(0);
      navigate('/app');
    } else {
      const next = failedAttempts + 1;
      setFailedAttempts(next);
      if (next >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem(LOCKOUT_KEY, String(until));
        setIsLocked(true);
        setLockoutEndTime(until);
      }
      setError('Invalid email or password. Try the test credentials below.');
    }
  };

  const fillTestCredentials = () => {
    setEmail('demo@phishguard.com');
    setPassword('PhishGuard2026!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F4E78] to-[#2E75B6] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/20 font-medium border border-white/30">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-white">
            <Shield className="h-12 w-12" />
            <span className="ml-3 text-3xl font-bold">PhishGuard</span>
          </Link>
        </div>

        {/* Test User Banner */}
        <Card className="mb-4 bg-[#28A745] bg-opacity-10 dark:bg-opacity-20 border-[#28A745]">
          <CardContent className="pt-4">
            <div className="text-sm space-y-2">
              <p className="font-semibold text-gray-900 dark:text-white">Test User Credentials:</p>
              <div className="bg-white dark:bg-gray-800 rounded p-3 font-mono text-xs space-y-1">
                <p><span className="text-gray-600 dark:text-gray-400">Email:</span> <span className="dark:text-white">demo@phishguard.com</span></p>
                <p><span className="text-gray-600 dark:text-gray-400">Password:</span> <span className="dark:text-white">PhishGuard2026!</span></p>
              </div>
              <Button
                type="button"
                onClick={fillTestCredentials}
                variant="outline"
                size="sm"
                className="w-full mt-2 border-[#28A745] text-[#28A745] hover:bg-[#28A745] hover:text-white dark:border-[#28A745] dark:text-[#28A745] dark:hover:bg-[#28A745] dark:hover:text-white"
              >
                Use Test Credentials
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your cybersecurity journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLocked ? (
                <>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-400 font-semibold">
                      <ShieldAlert className="w-4 h-4" />
                      Account Temporarily Locked
                    </div>
                    <p className="text-sm text-red-300 mt-1">
                      Too many failed attempts. Please try again in {remainingTime}.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Or reset your password to regain immediate access.
                    </p>
                  </div>
                  <div className="text-center">
                    <Link to="/reset-password" className="text-sm text-[#2E75B6] hover:underline">
                      Reset Password
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {error && (
                    <div className="bg-[#DC3545] bg-opacity-10 border border-[#DC3545] text-[#DC3545] px-4 py-3 rounded text-sm">
                      {error}
                    </div>
                  )}
                  {failedAttempts >= 3 && failedAttempts < MAX_ATTEMPTS && (
                    <p className="text-sm text-yellow-400">
                      Warning: {MAX_ATTEMPTS - failedAttempts} attempts remaining before your account is locked.
                    </p>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  required
                  disabled={isLocked}
                />
                {emailError && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {emailError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  required
                  disabled={isLocked}
                />
                {passwordError && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" disabled={isLocked} />
                  <label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link to="/reset-password" className="text-sm text-[#2E75B6] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className={`w-full bg-[#2E75B6] hover:bg-[#1F4E78] text-white font-medium ${!email && !password ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLocked}
              >
                Log In
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M23.5 12.3c0-1.2-.1-2.4-.3-3.6H12v6.8h6.5c-.3 1.5-1.2 2.8-2.5 3.6v3h4.1c2.4-2.2 3.4-5.5 3.4-9.8z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-4.1-3c-1.1.7-2.5 1.2-3.8 1.2-3 0-5.5-2-6.4-4.7H1.5v3.1C3.6 21.4 7.5 24 12 24z"
                    />
                  </svg>
                  Microsoft
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/signup" className="text-[#2E75B6] hover:underline font-medium">
                  Sign Up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white flex items-center justify-center">
            <Shield className="h-4 w-4 mr-2" />
            Your data is protected with enterprise-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
}