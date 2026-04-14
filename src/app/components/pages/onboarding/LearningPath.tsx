import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';

const pathSteps = [
  {
    id: 1,
    title: 'Email Security Basics',
    modules: 3,
    duration: '30 min',
    status: 'unlocked',
  },
  {
    id: 2,
    title: 'Recognizing Phishing Tactics',
    modules: 4,
    duration: '45 min',
    status: 'unlocked',
  },
  {
    id: 3,
    title: 'Web Safety & HTTPS',
    modules: 3,
    duration: '25 min',
    status: 'locked',
  },
  {
    id: 4,
    title: 'Social Engineering Defense',
    modules: 5,
    duration: '60 min',
    status: 'locked',
  },
  {
    id: 5,
    title: 'Advanced Threat Detection',
    modules: 4,
    duration: '50 min',
    status: 'locked',
  },
];

export function OnboardingLearningPath() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/onboarding/goals');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-xl">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
            Your Personalized Learning Path
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Based on your answers, we've created a custom curriculum just for you
          </p>
        </div>

        <div className="relative mb-8">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

          {pathSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-6 last:mb-0"
            >
              <Card className={`ml-16 p-6 ${
                step.status === 'locked'
                  ? 'bg-gray-50 dark:bg-gray-800/50'
                  : 'bg-white dark:bg-gray-800'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Badge
                        variant={step.status === 'unlocked' ? 'default' : 'secondary'}
                        className="mr-2"
                      >
                        Step {step.id}
                      </Badge>
                      {step.status === 'locked' && (
                        <Lock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold mb-1 ${
                      step.status === 'locked' ? 'text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>{step.modules} modules</span>
                      <span className="mx-2">•</span>
                      <span>{step.duration}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Circle Indicator */}
              <div
                className={`absolute left-8 top-6 -ml-2 w-4 h-4 rounded-full ring-4 ring-white dark:ring-gray-900 ${
                  step.status === 'unlocked'
                    ? 'bg-[#1F4E78]'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8"
        >
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            💡 Your Path Features
          </h4>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Modules unlock as you progress — build skills step by step</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Earn XP and badges for every completed module</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Track your progress with detailed analytics</span>
            </li>
          </ul>
        </motion.div>

        <div className="text-center">
          <Button size="lg" onClick={handleContinue} className="px-8">
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 2 ? 'w-8 bg-[#1F4E78]' : 'w-2 bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
