import { Flame, Zap, Trophy } from 'lucide-react';
import { Progress } from '../ui/progress';

interface DuolingoProgressBarProps {
  currentXP: number;
  dailyGoal: number;
  streak: number;
  gems?: number;
}

export function DuolingoProgressBar({ currentXP, dailyGoal, streak, gems = 0 }: DuolingoProgressBarProps) {
  const progress = (currentXP / dailyGoal) * 100;

  return (
    <div className="bg-white dark:bg-[#12121A] border-2 border-gray-200 dark:border-[#1E1E2E] rounded-xl p-4 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2 rounded-lg">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{streak}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">day streak</div>
            </div>
          </div>

          {/* Gems */}
          {gems > 0 && (
            <div className="flex items-center gap-2 ml-4">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{gems}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">gems</div>
              </div>
            </div>
          )}
        </div>

        {/* Daily Goal */}
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-400">Daily Goal</div>
          <div className="text-lg font-bold text-[#1F4E78] dark:text-white">
            {currentXP} / {dailyGoal} XP
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <Progress 
          value={Math.min(progress, 100)} 
          className="h-4 bg-gray-200 dark:bg-[#2E2E3E]"
        />
        {progress >= 100 && (
          <div className="absolute -top-1 right-0">
            <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-500 animate-bounce" />
          </div>
        )}
      </div>

      {/* Motivational Text */}
      <div className="mt-2 text-center">
        {progress >= 100 ? (
          <p className="text-sm font-medium text-green-600">🎉 Daily goal complete! Keep going!</p>
        ) : progress >= 75 ? (
          <p className="text-sm font-medium text-orange-600">🔥 Almost there! Keep it up!</p>
        ) : progress >= 50 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">Halfway to your goal!</p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">{dailyGoal - currentXP} XP to go today</p>
        )}
      </div>
    </div>
  );
}
