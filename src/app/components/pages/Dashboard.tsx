import { Link } from 'react-router';
import { Trophy, Flame, Star, TrendingUp, BookOpen, ScanSearch, AlertCircle, Award, BookCheck, Bookmark, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { mockCurrentUser, mockModules, mockAchievements } from '../../lib/mockData';
import { DuolingoProgressBar } from '../gamification/DuolingoProgressBar';
import { StreakCalendar } from '../gamification/StreakCalendar';
import { LeagueCard } from '../gamification/LeagueCard';
import { DailyQuests } from '../gamification/DailyQuests';

function getBookmarksFromStorage(): { label: string; path: string }[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  const items: { label: string; path: string }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('phishguard_bookmark_')) continue;
    const rest = key.replace(/^phishguard_bookmark_/, '');
    const lastUnderscore = rest.lastIndexOf('_');
    if (lastUnderscore === -1) continue;
    const moduleId = rest.slice(0, lastUnderscore);
    const sectionIndex = parseInt(rest.slice(lastUnderscore + 1), 10);
    if (Number.isNaN(sectionIndex)) continue;
    const module = mockModules.find(m => m.id === moduleId);
    const sectionTitle = module?.sections?.[sectionIndex]?.title;
    const label = sectionTitle
      ? `${module?.title ?? 'Module'} — ${sectionTitle}`
      : module?.title
        ? `${module.title} — Section ${sectionIndex + 1}`
        : 'Bookmarked Section';
    items.push({ label, path: `/app/training/${moduleId}` });
  }
  return items;
}

export function Dashboard() {
  const bookmarks = getBookmarksFromStorage();
  const activeChallenge = {
    title: 'Scan 20 URLs This Week',
    current: 12,
    goal: 20,
    deadline: 'Sunday',
    bonusXP: 500,
  };

  const recentActivities = [
    { action: 'Completed "Email Phishing 101" module', time: '2 hours ago', icon: BookOpen },
    { action: 'Earned "Week Warrior" badge', time: '1 day ago', icon: Award },
    { action: 'Scored 90% on URL Analysis quiz', time: '2 days ago', icon: Trophy },
    { action: 'Scanned suspicious email', time: '3 days ago', icon: ScanSearch },
    { action: 'Reported phishing attempt', time: '5 days ago', icon: AlertCircle },
  ];

  const recommendedModules = mockModules.filter(m => m.status === 'not-started').slice(0, 3);
  const earnedBadges = mockAchievements.filter(a => a.earned).slice(0, 5);
  
  const overallProgress = 48; // Mock overall completion percentage

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {mockCurrentUser.username}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Continue your cybersecurity learning journey</p>
        </div>

        {/* Duolingo-Style Progress Bar */}
        <div className="mb-8">
          <DuolingoProgressBar 
            currentXP={35}
            dailyGoal={50}
            streak={mockCurrentUser.currentStreak}
            gems={250}
          />
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Modules Completed</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                    {mockCurrentUser.modulesCompleted}/25
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <BookCheck className="w-7 h-7 text-blue-400" strokeWidth={1.5} />
                </div>
              </div>
              <div className="mt-4">
                <Progress
                  value={(mockCurrentUser.modulesCompleted / 25) * 100}
                  className="h-2 bg-gray-200 dark:bg-[#2E2E3E]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                    {mockCurrentUser.currentStreak} days
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-7 h-7 text-orange-400" strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Keep learning to maintain your streak!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Points</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                    {mockCurrentUser.totalPoints.toLocaleString()}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-7 h-7 text-yellow-400" strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-4">+100 points this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Rank</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                    #{mockCurrentUser.rank}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-7 h-7 text-green-400" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex items-center mt-4 text-green-600 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>Up 5 places this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Left 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Quests */}
            <DailyQuests />

            {/* Progress Section */}
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Your Learning Journey</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Track your overall progress across all modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Overall Completion
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {overallProgress}%
                      </span>
                    </div>
                    <Progress
                      value={overallProgress}
                      className="h-3 bg-gray-200 dark:bg-[#2E2E3E]"
                    />
                  </div>
                  <Link to="/app/training">
                    <Button className="bg-[#1F4E78] hover:bg-[#2E75B6]">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* My Bookmarks */}
            <div className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">My Bookmarks</h3>
                </div>
                <span className="text-xs text-gray-400">{bookmarks.length} saved</span>
              </div>
              {bookmarks.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No bookmarks yet. Bookmark sections while reading modules.
                </p>
              ) : (
                <ul className="space-y-2">
                  {bookmarks.slice(0, 3).map((b, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300 truncate">{b.label || 'Bookmarked Section'}</span>
                      <Link to={b.path || '/app/training'} className="text-blue-400 text-xs hover:underline ml-2 flex-shrink-0">View →</Link>
                    </li>
                  ))}
                  {bookmarks.length > 3 && (
                    <Link to="/app/training" className="text-xs text-blue-400 hover:underline">View all {bookmarks.length} bookmarks</Link>
                  )}
                </ul>
              )}
            </div>

            {/* Recommended Modules */}
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Recommended for You</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Continue your cybersecurity education
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedModules.map((module) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#1E1E2E] last:border-b-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{module.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{module.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="outline"
                            className={
                              module.difficulty === 'Beginner' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700' 
                                : module.difficulty === 'Intermediate' 
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700' 
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
                            }
                          >
                            {module.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {module.duration}
                          </span>
                        </div>
                      </div>
                      <Link to={`/app/training/${module.id}`}>
                        <Button size="sm">Start</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Link to="/app/scanner">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]"
                    >
                      <ScanSearch className="h-6 w-6 mb-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Scan Email/URL</span>
                    </Button>
                  </Link>
                  <Link to="/app/training">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]"
                    >
                      <BookOpen className="h-6 w-6 mb-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Take Quiz</span>
                    </Button>
                  </Link>
                  <Link to="/app/report">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]"
                    >
                      <AlertCircle className="h-6 w-6 mb-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Report Phishing</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right column */}
          <div className="space-y-6">
            {/* League Card */}
            <LeagueCard
              currentLeague="Gold"
              rank={12}
              totalUsers={50}
              xpThisWeek={450}
              xpToPromote={600}
              xpToStaySafe={200}
            />

            {/* Streak Calendar */}
            <StreakCalendar />

            {/* Weekly Challenge */}
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-white">Weekly Challenge</h3>
                </div>
                <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                  +{activeChallenge.bonusXP} XP
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{activeChallenge.title}</p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-white">{activeChallenge.current}</span>
                <span className="text-gray-400 text-sm">/ {activeChallenge.goal}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-purple-500 rounded-full transition-all"
                  style={{ width: `${(activeChallenge.current / activeChallenge.goal) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">Ends {activeChallenge.deadline}</span>
                <Link to="/app/challenges" className="text-xs text-purple-400 hover:underline">View All →</Link>
              </div>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-gray-100 dark:bg-[#1E1E2E] p-2 rounded">
                          <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Recent Achievements</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {mockCurrentUser.badgesEarned} badges earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {earnedBadges.map((badge) => (
                    <div key={badge.id} className="aspect-square bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center" title={badge.name}>
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                  ))}
                </div>
                <Link to="/app/achievements">
                  <Button variant="outline" className="w-full" size="sm">
                    View All Achievements
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}