import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { mockLeaderboard, mockCurrentUser } from '../../lib/mockData';
import { getCurrentUserProfile } from '../../lib/auth';

export function LeaderboardPage() {
  const topThree = mockLeaderboard.slice(0, 3);
  const remaining = mockLeaderboard.slice(3);
  const currentUser = getCurrentUserProfile() ?? mockCurrentUser;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-gray-600 mt-2">Compete with other users and climb the ranks</p>
        </div>

        <Tabs defaultValue="all-time" className="mb-6">
          <TabsList>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[topThree[1], topThree[0], topThree[2]].map((entry, idx) => {
            if (!entry) return null;
            const actualRank = idx === 1 ? 1 : idx === 0 ? 2 : 3;
            return (
              <Card key={entry.rank} className={`${actualRank === 1 ? 'md:order-2 border-yellow-400 border-2' : actualRank === 2 ? 'md:order-1' : 'md:order-3'}`}>
                <CardContent className="pt-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className={actualRank === 1 ? 'h-24 w-24' : 'h-20 w-20'}>
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback>{entry.username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${
                      actualRank === 1 ? 'bg-yellow-400' : actualRank === 2 ? 'bg-gray-300' : 'bg-orange-400'
                    } text-white rounded-full w-10 h-10 flex items-center justify-center font-bold`}>
                      {actualRank}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">{entry.username}</h3>
                  <p className="text-2xl font-bold text-[#1F4E78] mt-2">{entry.points.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">points</p>
                  <Badge className="mt-2">{entry.badges} badges</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
            <CardDescription>All active participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {remaining.map((entry) => {
                const isCurrentUser = entry.username === currentUser.username;
                return (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="font-bold text-lg w-12 text-center">#{entry.rank}</span>
                      <Avatar>
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback>{entry.username.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{entry.username}</p>
                        <p className="text-sm text-gray-600">{entry.badges} badges</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{entry.points.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                      {entry.trend === 'up' && <TrendingUp className="h-5 w-5 text-green-600" />}
                      {entry.trend === 'down' && <TrendingDown className="h-5 w-5 text-red-600" />}
                      {entry.trend === 'same' && <Minus className="h-5 w-5 text-gray-400" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Your Stats */}
        <Card className="mt-6 bg-gradient-to-r from-[#1F4E78] to-[#2E75B6] text-white">
          <CardContent className="pt-6">
            <h3 className="font-bold text-lg mb-4">Your Stats</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm opacity-90">Current Rank</p>
                <p className="text-2xl font-bold">#{currentUser.rank}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-2xl font-bold">{currentUser.totalPoints.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Points to Next Rank</p>
                <p className="text-2xl font-bold">250</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
