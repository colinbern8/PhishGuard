import { Link, useNavigate, useSearchParams } from "react-router";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { resetPasswordWithToken } from "../../lib/auth";

export function PasswordResetConfirmPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = useMemo(() => params.get("token") ?? "", [params]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const passwordCriteria = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter", met: /[a-z]/.test(password) },
    { label: "Number", met: /\d/.test(password) },
    { label: "Special character (!@#$%^&*)", met: /[!@#$%^&*]/.test(password) },
  ];
  const allMet = passwordCriteria.every((c) => c.met);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Missing reset token. Please request a new reset link.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!allMet) {
      setError("Password does not meet the minimum requirements.");
      return;
    }

    const res = resetPasswordWithToken(token, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }

    setDone(true);
    window.setTimeout(() => navigate("/login"), 1200);
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

        <Card>
          <CardHeader>
            <CardTitle>Set a new password</CardTitle>
            <CardDescription>
              This reset link is valid for 1 hour (prototype token).
            </CardDescription>
          </CardHeader>
          <CardContent>
            {done ? (
              <div className="text-center py-6 space-y-4">
                <div className="flex justify-center">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Password updated. Redirecting you to login…
                </p>
                <Link to="/login">
                  <Button className="w-full bg-[#1F4E78] hover:bg-[#2E75B6]">
                    Go to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-[#DC3545] bg-opacity-10 border border-[#DC3545] text-[#DC3545] px-4 py-3 rounded text-sm flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    Requirements
                  </p>
                  <ul className="space-y-1">
                    {passwordCriteria.map((c) => (
                      <li
                        key={c.label}
                        className={`text-xs ${c.met ? "text-green-700" : "text-gray-500"}`}
                      >
                        {c.met ? "✓" : "•"} {c.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1F4E78] hover:bg-[#2E75B6]"
                  disabled={!token || !allMet || password !== confirmPassword}
                >
                  Update Password
                </Button>

                <div className="text-center text-sm">
                  <Link to="/reset-password" className="text-[#2E75B6] hover:underline">
                    Request a new reset link
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

