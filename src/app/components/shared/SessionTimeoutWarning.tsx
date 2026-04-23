import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Clock } from 'lucide-react';
import { toast } from 'sonner';
import { mockLogout } from '../../lib/auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

// SRS PG-F1-08: Session terminates after 30 minutes of inactivity.
// For QA testing, you can shorten to e.g. WARNING_MS = 30_000 (30s), LOGOUT_MS = 60_000 (1 min).
const WARNING_MS = 25 * 60 * 1000; // 25 minutes
const LOGOUT_MS = 30 * 60 * 1000;  // 30 minutes

const COUNTDOWN_SECONDS = 300; // 5 minutes in seconds

export function SessionTimeoutWarning() {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleLogout = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    setShowWarning(false);
    setCountdown(COUNTDOWN_SECONDS);
    mockLogout();
    localStorage.removeItem('phishguard_onboarding_complete');
    toast('Your session has expired. Please log in again.');
    navigate('/login');
  };

  const resetTimer = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    setShowWarning(false);
    setCountdown(COUNTDOWN_SECONDS);

    warningTimerRef.current = setTimeout(() => {
      warningTimerRef.current = null;
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
      setShowWarning(true);
      setCountdown(COUNTDOWN_SECONDS);
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
              countdownIntervalRef.current = null;
            }
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, WARNING_MS);

    logoutTimerRef.current = setTimeout(() => {
      logoutTimerRef.current = null;
      handleLogout();
    }, LOGOUT_MS);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'] as const;
    const onActivity = () => resetTimer();

    resetTimer();

    for (const event of events) {
      window.addEventListener(event, onActivity);
    }

    return () => {
      for (const event of events) {
        window.removeEventListener(event, onActivity);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
        warningTimerRef.current = null;
      }
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
    };
  }, []);

  return (
    <AlertDialog open={showWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            Session Expiring Soon
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your session will expire in {Math.floor(countdown / 60)}:
            {String(countdown % 60).padStart(2, '0')} due to inactivity. Click
            &quot;Stay Logged In&quot; to continue your session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={resetTimer}>Stay Logged In</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700"
          >
            Log Out Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
