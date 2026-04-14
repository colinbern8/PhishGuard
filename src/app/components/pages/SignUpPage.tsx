import { Link, useNavigate } from 'react-router';
import { Shield, ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ThemeToggle } from '../ui/theme-toggle';
import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Inline validation touched / error state
  const [emailTouched, setEmailTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const emailValid = !email || EMAIL_REGEX.test(email);
  const emailError = emailTouched && email && !emailValid;

  const usernameValid = !username || USERNAME_REGEX.test(username);
  const usernameError = usernameTouched && username && !usernameValid;

  // Password strength: 5 criteria → 4-segment bar (0-1 → 1 red, 2 → 2 orange, 3-4 → 3 yellow, 5 → 4 green)
  const passwordCriteria = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number', met: /\d/.test(password) },
    { label: 'Special character', met: /[!@#$%^&*]/.test(password) },
  ];
  const criteriaMet = passwordCriteria.filter((c) => c.met).length;
  const strengthScore =
    criteriaMet <= 1 ? 1 : criteriaMet === 2 ? 2 : criteriaMet <= 4 ? 3 : 4;
  const strengthColor =
    criteriaMet <= 1
      ? 'bg-red-500'
      : criteriaMet === 2
        ? 'bg-orange-500'
        : criteriaMet <= 4
          ? 'bg-yellow-500'
          : 'bg-green-500';

  const showPasswordStrength = passwordFocused || password.length > 0;
  const showConfirmMessage = confirmPasswordTouched && confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Mock signup - redirect to onboarding flow
    navigate('/onboarding');
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

        {/* Sign Up Card */}
        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Join thousands learning to defend against phishing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  required
                />
                {emailError && (
                  <p className="text-xs text-red-500 animate-in fade-in duration-200">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setUsernameTouched(true)}
                  required
                />
                {usernameError && (
                  <p className="text-xs text-red-500 animate-in fade-in duration-200">
                    Username must be 3-20 characters (letters, numbers, underscores only)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                />
                {showPasswordStrength && (
                  <div className="animate-in fade-in duration-200">
                    <ul className="mt-2 space-y-1">
                      {passwordCriteria.map(({ label, met }) => (
                        <li
                          key={label}
                          className={`text-xs flex items-center gap-2 ${met ? 'text-green-400' : 'text-gray-500'}`}
                        >
                          {met ? (
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                          ) : (
                            <Circle className="w-3 h-3 shrink-0" />
                          )}
                          {label}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-1 mt-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${i < strengthScore ? strengthColor : 'bg-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordTouched(true);
                  }}
                  required
                />
                {showConfirmMessage && (
                  <p
                    className={`text-xs animate-in fade-in duration-200 ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {passwordsMatch ? '✓ Passwords match' : '✗ Passwords don\'t match'}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  required
                />
                <label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-[#2E75B6] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#2E75B6] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#2E75B6] hover:bg-[#1F4E78] text-white font-medium"
                disabled={!agreed || password !== confirmPassword}
              >
                Create Account
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
                <span className="text-gray-600">Already have an account? </span>
                <Link to="/login" className="text-[#2E75B6] hover:underline font-medium">
                  Sign In
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