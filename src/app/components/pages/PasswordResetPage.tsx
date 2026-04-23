import { Link } from 'react-router';
import { Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useState } from 'react';
import { requestPasswordReset } from '../../lib/auth';

export function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = requestPasswordReset(email);
    if (res.ok) {
      setDevLink(`/reset-password/confirm?token=${encodeURIComponent(res.token)}`);
    } else {
      setDevLink(null);
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F4E78] to-[#2E75B6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-white">
            <Shield className="h-12 w-12" />
            <span className="ml-3 text-3xl font-bold">PhishGuard</span>
          </Link>
        </div>

        {/* Reset Password Card */}
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {!submitted 
                ? "Enter your email and we'll send you reset instructions" 
                : "Check your email for reset instructions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-[#1F4E78] hover:bg-[#2E75B6]">
                  Send Reset Link
                </Button>

                <div className="text-center text-sm">
                  <Link to="/login" className="text-[#2E75B6] hover:underline">
                    Back to Login
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="flex justify-center">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    We've sent password reset instructions to:
                  </p>
                  <p className="font-medium mt-1">{email}</p>
                </div>
                <p className="text-sm text-gray-600">
                  Check your inbox and click the reset link to create a new password.
                </p>

                {/* Prototype helper: show a clickable link instead of emailing */}
                {devLink && (
                  <div className="text-left bg-white/60 rounded-lg border border-white/40 p-4">
                    <p className="text-xs text-gray-500 mb-2">
                      Prototype mode: use this link to reset immediately
                    </p>
                    <Link
                      to={devLink}
                      className="inline-flex items-center gap-2 text-sm text-[#2E75B6] hover:underline break-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {devLink}
                    </Link>
                  </div>
                )}

                <div className="pt-4">
                  <Link to="/login">
                    <Button className="w-full bg-[#1F4E78] hover:bg-[#2E75B6]">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}
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
