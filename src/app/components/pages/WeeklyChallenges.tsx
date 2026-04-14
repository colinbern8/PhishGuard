import { useState, useEffect, useRef } from 'react';
import { Trophy, Clock, Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

interface Challenge {
  id: number;
  title: string;
  description: string;
  goal: number;
  progress: number;
  deadline: Date;
  reward: string;
}

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: 'URL Scanner Marathon',
    description: 'Scan 20 URLs this week to earn exclusive rewards',
    goal: 20,
    progress: 12,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // 3 days 14 hours
    reward: '500 bonus points + Exclusive badge',
  },
];

function formatTimeRemaining(deadline: Date): { text: string; isUrgent: boolean } {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  
  if (diff < 0) {
    return { text: 'Expired', isUrgent: true };
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (hours < 24) {
    return { text: `${hours}h remaining`, isUrgent: true };
  }
  
  if (days === 1) {
    return { text: '1 day remaining', isUrgent: true };
  }
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return { text: `Ends ${dayNames[deadline.getDay()]}`, isUrgent: false };
}

export function WeeklyChallenges() {
  const [joinedChallenges, setJoinedChallenges] = useState<Set<number>>(new Set());
  const completionToastShown = useRef<Set<number>>(new Set());

  // Load joined challenges from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('phishguard_joined_challenges');
      if (stored) {
        const arr = JSON.parse(stored) as number[];
        if (Array.isArray(arr)) {
          setJoinedChallenges(new Set(arr));
        }
      }
    } catch {
      // ignore invalid stored data
    }
  }, []);

  // Save joined challenges to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('phishguard_joined_challenges', JSON.stringify([...joinedChallenges]));
  }, [joinedChallenges]);

  const handleJoinChallenge = (challengeId: number) => {
    setJoinedChallenges(prev => new Set(prev).add(challengeId));
    toast.success('Challenge accepted! Good luck! 🎯');
  };

  const challenge = mockChallenges[0];
  const isJoined = joinedChallenges.has(challenge.id);
  const isCompleted = challenge.progress >= challenge.goal;
  const progressPercent = Math.round((challenge.progress / challenge.goal) * 100);
  const timeRemaining = formatTimeRemaining(challenge.deadline);

  // Show completion toast once when challenge is completed
  useEffect(() => {
    if (isJoined && isCompleted && !completionToastShown.current.has(challenge.id)) {
      completionToastShown.current.add(challenge.id);
      toast.success('🏆 Challenge complete! +500 XP awarded!', {
        duration: 5000,
      });
    }
  }, [isJoined, isCompleted, challenge.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Weekly Challenges</h1>

        <Card 
          className={`mb-8 bg-gradient-to-r from-[#1F4E78] to-[#2E75B6] text-white ${
            isCompleted ? 'border-2 border-yellow-500' : ''
          }`}
        >
          <CardContent className="pt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{challenge.title}</h2>
                  {isCompleted && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-yellow-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed!
                    </Badge>
                  )}
                  {isJoined && !isCompleted && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Joined
                    </Badge>
                  )}
                </div>
                <p className="opacity-90">{challenge.description}</p>
              </div>
              <Badge className={`bg-white text-[#1F4E78] ${timeRemaining.isUrgent ? 'text-red-600' : ''}`}>
                <Clock className="h-4 w-4 mr-1" />
                <span className={timeRemaining.isUrgent ? 'text-red-400' : ''}>
                  {timeRemaining.text}
                </span>
              </Badge>
            </div>
            
            {isJoined && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Your Progress</span>
                  <span>{challenge.progress} / {challenge.goal} URLs — {progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-3 bg-white/20" />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Reward</p>
                <p className="font-bold">{challenge.reward}</p>
              </div>
              {!isJoined ? (
                <Button 
                  className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2"
                  onClick={() => handleJoinChallenge(challenge.id)}
                >
                  Join Challenge
                </Button>
              ) : (
                <Button className="bg-white/20 text-white hover:bg-white/30" disabled>
                  {isCompleted ? 'Challenge Complete!' : 'Continue Challenge'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Challenge Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, user: 'CyberNinja', progress: 20 },
                { rank: 2, user: 'PhishHunter', progress: 18 },
                { rank: 3, user: 'SecurityPro', progress: 12 },
              ].map((entry) => (
                <div key={entry.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-bold w-8">#{entry.rank}</span>
                    <span>{entry.user}</span>
                  </div>
                  <span className="font-semibold">{entry.progress}/20</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Past Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Module Marathon</p>
                    <p className="text-sm text-gray-600">Complete 5 modules</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
              <div className="p-4 border rounded-lg opacity-60">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Quiz Master</p>
                    <p className="text-sm text-gray-600">Score 100% on 3 quizzes</p>
                  </div>
                  <Badge variant="outline">Not Completed</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
