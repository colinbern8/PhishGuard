// Simple authentication utility for PhishGuard
// This is a frontend-only mock implementation for testing purposes

export interface TestUser {
  email: string;
  password: string;
  userId: string;
}

export interface RegisteredUser {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: number;
}

export interface CurrentUserProfile {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  memberSince: string;
  bio?: string;
  totalPoints: number;
  rank: number;
  modulesCompleted: number;
  badgesEarned: number;
  currentStreak: number;
}

// Test users - DO NOT use in production!
export const testUsers: TestUser[] = [
  {
    email: 'demo@phishguard.com',
    password: 'PhishGuard2026!',
    userId: '1', // Maps to mockCurrentUser
  },
  {
    email: 'test@example.com',
    password: 'Test123456!',
    userId: '1', // Same user for now
  },
];

const AUTH_KEY = 'phishguard_auth';
const USERS_KEY = 'phishguard_registered_users';
const PROFILE_KEY = 'phishguard_current_user_profile';
const PASSWORD_RESET_KEY = 'phishguard_password_resets';
const ROLE_KEY = 'phishguard_role';

export type UserRole = 'standard' | 'instructor' | 'admin';

export type PasswordResetRequestResult =
  | { ok: true; token: string; expiresAt: number }
  | { ok: false; error: string };

type StoredPasswordReset = {
  token: string;
  email: string;
  expiresAt: number;
  used: boolean;
};

// Log test credentials on load for easy reference
if (typeof window !== 'undefined') {
  console.log('%c🛡️ PhishGuard Test Credentials', 'color: #28A745; font-size: 16px; font-weight: bold;');
  console.log('%cEmail: demo@phishguard.com', 'color: #1F4E78; font-size: 14px;');
  console.log('%cPassword: PhishGuard2026!', 'color: #1F4E78; font-size: 14px;');
  console.log('%cOr use the "Use Test Credentials" button on the login page', 'color: #666; font-size: 12px; font-style: italic;');
}

function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function genId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `u_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function getRegisteredUsers(): RegisteredUser[] {
  return safeParseJson<RegisteredUser[]>(localStorage.getItem(USERS_KEY)) ?? [];
}

function setRegisteredUsers(users: RegisteredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function mockSignUp(email: string, username: string, password: string): { ok: true } | { ok: false; error: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim();
  if (!normalizedEmail || !normalizedUsername || !password) {
    return { ok: false, error: 'Missing required fields' };
  }

  const users = getRegisteredUsers();
  const emailTaken =
    users.some((u) => u.email.toLowerCase() === normalizedEmail) ||
    testUsers.some((u) => u.email.toLowerCase() === normalizedEmail);
  if (emailTaken) return { ok: false, error: 'Email is already in use' };

  const newUser: RegisteredUser = {
    id: genId(),
    email: normalizedEmail,
    username: normalizedUsername,
    password,
    createdAt: Date.now(),
  };
  setRegisteredUsers([newUser, ...users]);

  // Log the newly created user in (separate from test user)
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ userId: newUser.id, email: newUser.email, timestamp: Date.now() })
  );

  // Provide a lightweight profile the UI can display
  const profile: CurrentUserProfile = {
    id: newUser.id,
    email: newUser.email,
    username: newUser.username,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newUser.username)}`,
    memberSince: new Date().toISOString(),
    bio: 'New PhishGuard member.',
    totalPoints: 0,
    rank: 0,
    modulesCompleted: 0,
    badgesEarned: 0,
    currentStreak: 0,
  };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

  // Ensure onboarding starts for the new account
  localStorage.removeItem('phishguard_onboarding_complete');

  return { ok: true };
}

/**
 * Mock login function
 * In production, this would make an API call to a secure backend
 */
export function mockLogin(email: string, password: string): boolean {
  const normalizedEmail = email.trim().toLowerCase();
  const testUser = testUsers.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  const registeredUser = getRegisteredUsers().find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );
  
  const authed = testUser
    ? { userId: testUser.userId, email: testUser.email }
    : registeredUser
      ? { userId: registeredUser.id, email: registeredUser.email }
      : null;

  if (authed) {
    // Store minimal auth state in localStorage (not secure - for demo only!)
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      userId: authed.userId,
      email: authed.email,
      timestamp: Date.now(),
    }));

    // If this is a registered user, also hydrate a display profile
    if (registeredUser) {
      const existing = safeParseJson<CurrentUserProfile>(localStorage.getItem(PROFILE_KEY));
      const profile: CurrentUserProfile = existing && existing.email === registeredUser.email
        ? existing
        : {
            id: registeredUser.id,
            email: registeredUser.email,
            username: registeredUser.username,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(registeredUser.username)}`,
            memberSince: new Date(registeredUser.createdAt).toISOString(),
            bio: 'New PhishGuard member.',
            totalPoints: 0,
            rank: 0,
            modulesCompleted: 0,
            badgesEarned: 0,
            currentStreak: 0,
          };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }
    return true;
  }
  
  return false;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;
  
  try {
    const parsed = JSON.parse(authData);
    // Check if session is less than 24 hours old
    const isRecent = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
    return isRecent;
  } catch {
    return false;
  }
}

/**
 * Log out the current user
 */
export function mockLogout(): void {
  localStorage.removeItem(AUTH_KEY);
}

function getPasswordResets(): StoredPasswordReset[] {
  return safeParseJson<StoredPasswordReset[]>(localStorage.getItem(PASSWORD_RESET_KEY)) ?? [];
}

function setPasswordResets(resets: StoredPasswordReset[]) {
  localStorage.setItem(PASSWORD_RESET_KEY, JSON.stringify(resets));
}

export function requestPasswordReset(email: string): PasswordResetRequestResult {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return { ok: false, error: 'Email is required' };

  // In a real app we would not reveal whether the email exists.
  const exists =
    testUsers.some((u) => u.email.toLowerCase() === normalizedEmail) ||
    getRegisteredUsers().some((u) => u.email.toLowerCase() === normalizedEmail);

  const token = genId();
  const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
  const next: StoredPasswordReset = {
    token,
    email: normalizedEmail,
    expiresAt,
    used: false,
  };

  // Store regardless (prototype); consumer UI still shows generic success.
  const all = [next, ...getPasswordResets()].slice(0, 25);
  setPasswordResets(all);

  if (!exists) {
    // still return ok to mimic anti-enumeration behavior
    return { ok: true, token, expiresAt };
  }

  return { ok: true, token, expiresAt };
}

export function resetPasswordWithToken(
  token: string,
  newPassword: string,
): { ok: true } | { ok: false; error: string } {
  const normalizedToken = token.trim();
  if (!normalizedToken) return { ok: false, error: 'Invalid reset token' };
  if (!newPassword) return { ok: false, error: 'Password is required' };

  const resets = getPasswordResets();
  const idx = resets.findIndex((r) => r.token === normalizedToken);
  if (idx === -1) return { ok: false, error: 'Invalid reset token' };

  const entry = resets[idx];
  if (entry.used) return { ok: false, error: 'This reset link has already been used' };
  if (Date.now() > entry.expiresAt) return { ok: false, error: 'This reset link has expired' };

  // Update registered users only (test users stay fixed)
  const users = getRegisteredUsers();
  const uIdx = users.findIndex((u) => u.email.toLowerCase() === entry.email.toLowerCase());
  if (uIdx !== -1) {
    users[uIdx] = { ...users[uIdx], password: newPassword };
    setRegisteredUsers(users);
  }

  resets[idx] = { ...entry, used: true };
  setPasswordResets(resets);

  return { ok: true };
}

/**
 * Get current user auth data
 */
export function getCurrentAuth() {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  
  try {
    return JSON.parse(authData);
  } catch {
    return null;
  }
}

export function getCurrentUserProfile(): CurrentUserProfile | null {
  return safeParseJson<CurrentUserProfile>(localStorage.getItem(PROFILE_KEY));
}

export function getCurrentUserRole(): UserRole {
  const stored = localStorage.getItem(ROLE_KEY);
  if (stored === 'admin' || stored === 'instructor' || stored === 'standard') return stored;
  return 'standard';
}

export function setCurrentUserRole(role: UserRole) {
  localStorage.setItem(ROLE_KEY, role);
}