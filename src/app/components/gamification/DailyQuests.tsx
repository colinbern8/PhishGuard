import { CheckCircle2, Circle, Zap, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
}

export function DailyQuests() {
  const quests: Quest[] = [
    {
      id: '1',
      title: 'Complete 1 Module',
      description: 'Finish any training module',
      xpReward: 10,
      progress: 1,
      target: 1,
      completed: true
    },
    {
      id: '2',
      title: 'Scan 3 Emails',
      description: 'Use the phishing scanner',
      xpReward: 15,
      progress: 2,
      target: 3,
      completed: false
    },
    {
      id: '3',
      title: 'Earn 50 XP',
      description: 'Complete activities to gain XP',
      xpReward: 25,
      progress: 35,
      target: 50,
      completed: false
    },
    {
      id: '4',
      title: 'Read 1 Article',
      description: 'Explore the Knowledge Hub',
      xpReward: 5,
      progress: 0,
      target: 1,
      completed: false
    }
  ];

  const totalXP = quests.reduce((sum, q) => sum + (q.completed ? q.xpReward : 0), 0);
  const totalAvailableXP = quests.reduce((sum, q) => sum + q.xpReward, 0);

  return (
    <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] dark:shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-2 rounded-lg">
              <Star className="h-5 w-5 text-white" />
            </div>
            Daily Quests
          </CardTitle>
          <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
            <Zap className="h-4 w-4 text-yellow-600 fill-yellow-600" />
            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
              {totalXP}/{totalAvailableXP} XP
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {quests.map((quest) => {
          const progress = (quest.progress / quest.target) * 100;
          
          return (
            <div
              key={quest.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                quest.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30'
                  : 'bg-gray-50 dark:bg-[#1A1A2E] border-gray-200 dark:border-[#2E2E3E] hover:border-gray-300 dark:hover:border-[#2E2E3E]'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <div className="mt-0.5">
                  {quest.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600 fill-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        quest.completed
                          ? 'text-green-800 dark:text-gray-500 line-through'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {quest.title}
                      </h4>
                      <p className={`text-sm mt-0.5 ${
                        quest.completed
                          ? 'text-gray-400 dark:text-gray-600'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {quest.description}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      quest.completed
                        ? 'bg-green-200 dark:bg-green-900/40 text-green-800 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      <Zap className="h-3 w-3" />
                      +{quest.xpReward}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {!quest.completed && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                        <span>{quest.progress}/{quest.target}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5 bg-gray-200 dark:bg-[#2E2E3E]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* All Complete Message */}
        {quests.every(q => q.completed) && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800/30 rounded-lg text-center">
            <div className="text-3xl mb-2">🎉</div>
            <p className="font-bold text-green-800 dark:text-green-300">All daily quests completed!</p>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">Come back tomorrow for new challenges</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
