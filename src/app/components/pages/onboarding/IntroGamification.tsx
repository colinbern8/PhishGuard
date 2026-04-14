import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Trophy, Flame, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';

export function OnboardingIntroGamification() {
  const navigate = useNavigate();

  const handleStart = () => {
    // Mark onboarding as complete
    localStorage.setItem('phishguard_onboarding_complete', 'true');
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F4E78] to-[#7C3AED] dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-6 shadow-2xl">
                <Trophy className="h-16 w-16 text-white" />
              </div>
              {/* Animated particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 6) * 60,
                    y: Math.sin((i * Math.PI * 2) / 6) * 60,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Welcome to Your League!
          </h1>
          <p className="text-xl text-blue-100 dark:text-gray-300">
            Let's explore how you'll level up and compete
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white dark:bg-gray-800 h-full">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 inline-block mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Earn XP
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Complete modules, quizzes, and daily quests to earn Experience Points and level up.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Level 1</span>
                  <span className="text-gray-500 dark:text-gray-400">Level 2</span>
                </div>
                <Progress value={30} className="h-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  30 / 100 XP
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white dark:bg-gray-800 h-full">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-3 inline-block mb-4">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Build Streaks
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Practice daily to build your streak. The longer your streak, the more rewards you unlock.
              </p>
              <div className="flex items-center space-x-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">0 days</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Start your streak today!</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-white dark:bg-gray-800 h-full">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-3 inline-block mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Compete in Leagues
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                You've been placed in Bronze League. Climb to Silver, Gold, Platinum, and Diamond!
              </p>
              <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                🥉 Bronze League
              </Badge>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            🎯 Your First Daily Quests
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Complete your first training module', xp: 50 },
              { title: 'Scan a suspicious email', xp: 20 },
              { title: 'Read an article in Knowledge Hub', xp: 15 },
            ].map((quest, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white/20 rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded border-2 border-white/50" />
                  <span className="text-white font-medium">{quest.title}</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-400 text-yellow-900">
                  +{quest.xp} XP
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={handleStart}
            className="bg-white text-[#1F4E78] hover:bg-gray-100 px-12 text-lg"
          >
            Start Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-blue-100 mt-4">
            Your journey to becoming a phishing expert starts now! 🚀
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 4 ? 'w-8 bg-white' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
