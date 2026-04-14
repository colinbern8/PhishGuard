// Simple authentication utility for PhishGuard
// This is a frontend-only mock implementation for testing purposes

export interface TestUser {
  email: string;
  password: string;
  userId: string;
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

// Log test credentials on load for easy reference
if (typeof window !== 'undefined') {
  console.log('%c🛡️ PhishGuard Test Credentials', 'color: #28A745; font-size: 16px; font-weight: bold;');
  console.log('%cEmail: demo@phishguard.com', 'color: #1F4E78; font-size: 14px;');
  console.log('%cPassword: PhishGuard2026!', 'color: #1F4E78; font-size: 14px;');
  console.log('%cOr use the "Use Test Credentials" button on the login page', 'color: #666; font-size: 12px; font-style: italic;');
}

/**
 * Mock login function
 * In production, this would make an API call to a secure backend
 */
export function mockLogin(email: string, password: string): boolean {
  const user = testUsers.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    // Store minimal auth state in localStorage (not secure - for demo only!)
    localStorage.setItem('phishguard_auth', JSON.stringify({
      userId: user.userId,
      email: user.email,
      timestamp: Date.now(),
    }));
    return true;
  }
  
  return false;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const authData = localStorage.getItem('phishguard_auth');
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
  localStorage.removeItem('phishguard_auth');
}

/**
 * Get current user auth data
 */
export function getCurrentAuth() {
  const authData = localStorage.getItem('phishguard_auth');
  if (!authData) return null;
  
  try {
    return JSON.parse(authData);
  } catch {
    return null;
  }
}