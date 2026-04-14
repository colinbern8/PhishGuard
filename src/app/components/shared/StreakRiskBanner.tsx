import { AlertTriangle, Flame, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

interface StreakRiskBannerProps {
  streakDays: number;
  hoursLeft: number;
}

export function StreakRiskBanner({ streakDays, hoursLeft }: StreakRiskBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  // Only show if less than 3 hours left and user hasn't completed today's activity
  const shouldShow = hoursLeft <= 3 && !dismissed;

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Flame className="h-6 w-6" />
              </motion.div>
              <div>
                <p className="font-semibold">
                  ⚠️ Don't lose your {streakDays}-day streak!
                </p>
                <p className="text-sm opacity-90">
                  Complete any activity in the next {hoursLeft} hours to keep it alive.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate('/app/training')}
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Quick Quiz (2 min)
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate('/app/scanner')}
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Scan Email (1 min)
              </Button>
              <button
                onClick={() => setDismissed(true)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
