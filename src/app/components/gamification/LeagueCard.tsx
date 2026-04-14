import { Trophy, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';

interface LeagueCardProps {
  currentLeague: string;
  rank: number;
  totalUsers: number;
  xpThisWeek: number;
  xpToPromote: number;
  xpToStaySafe: number;
}

export function LeagueCard({
  currentLeague,
  rank,
  totalUsers,
  xpThisWeek,
  xpToPromote,
  xpToStaySafe
}: LeagueCardProps) {
  const leagueColors = {
    Bronze: 'from-orange-300 to-orange-600',
    Silver: 'from-gray-300 to-gray-500',
    Gold: 'from-yellow-300 to-yellow-600',
    Platinum: 'from-cyan-300 to-cyan-600',
    Diamond: 'from-purple-300 to-purple-600',
  };

  const leagueColor = leagueColors[currentLeague as keyof typeof leagueColors] || leagueColors.Bronze;
  const promotionProgress = (xpThisWeek / xpToPromote) * 100;
  const safeFromDemotion = xpThisWeek >= xpToStaySafe;

  return (
    <Card className="overflow-hidden bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
      <CardHeader className={`bg-gradient-to-r ${leagueColor} text-white pb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Trophy className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-white">{currentLeague} League</CardTitle>
              <p className="text-white/90 text-sm mt-1">
                Rank #{rank} of {totalUsers}
              </p>
            </div>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/20" size="sm">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        {/* This Week's XP */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This Week's XP</span>
            <span className="text-2xl font-bold text-[#1F4E78] dark:text-white">{xpThisWeek}</span>
          </div>
        </div>

        {/* Promotion Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Top 10 to Advance</span>
            </div>
            <span className="text-sm font-bold text-green-600">
              {xpToPromote - xpThisWeek} XP to go
            </span>
          </div>
          <Progress value={Math.min(promotionProgress, 100)} className="h-2 bg-gray-200 dark:bg-[#2E2E3E]" />
        </div>

        {/* Demotion Warning/Safe Zone */}
        <div className={`p-3 rounded-lg border-2 ${
          safeFromDemotion 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30' 
            : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/30'
        }`}>
          <div className="flex items-center gap-2">
            <Award className={`h-5 w-5 ${safeFromDemotion ? 'text-green-600' : 'text-orange-600'}`} />
            <p className={`text-sm font-medium ${
              safeFromDemotion ? 'text-green-700 dark:text-green-400' : 'text-orange-800 dark:text-orange-300'
            }`}>
              {safeFromDemotion 
                ? '✓ Safe from demotion this week!'
                : `⚠️ Earn ${xpToStaySafe - xpThisWeek} more XP to stay safe`
              }
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="text-center p-3 bg-gray-50 dark:bg-[#1E1E2E] border border-gray-200 dark:border-[#2E2E3E] rounded-lg">
            <div className="text-2xl font-bold text-[#1F4E78] dark:text-white">
              {rank <= 10 ? '🔥' : rank <= 20 ? '📈' : '💪'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {rank <= 10 ? 'Top 10!' : rank <= 20 ? 'Top 20!' : 'Keep Going!'}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-[#1E1E2E] border border-gray-200 dark:border-[#2E2E3E] rounded-lg">
            <div className="text-lg font-bold text-[#1F4E78] dark:text-white">{totalUsers}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Users</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
