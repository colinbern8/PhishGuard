import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

const commitmentOptions = [
  {
    id: '5min',
    minutes: 5,
    title: '5 minutes/day',
    description: 'Perfect for busy schedules',
    estimatedCompletion: '8 weeks',
    icon: '☕',
  },
  {
    id: '15min',
    minutes: 15,
    title: '15 minutes/day',
    description: 'Balanced and effective',
    estimatedCompletion: '4 weeks',
    icon: '🎯',
    recommended: true,
  },
  {
    id: '30min',
    minutes: 30,
    title: '30 minutes/day',
    description: 'Fast-track your learning',
    estimatedCompletion: '2 weeks',
    icon: '🚀',
  },
];

export function OnboardingGoals() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>('15min');

  const handleContinue = () => {
    // Store commitment in localStorage
    localStorage.setItem('phishguard_daily_commitment', selected);
    navigate('/onboarding/intro-gamification');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-4 shadow-xl">
              <Clock className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
            Set Your Daily Goal
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            How much time can you commit each day?
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {commitmentOptions.map((option, index) => {
            const isSelected = selected === option.id;

            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-[#1F4E78] shadow-lg bg-white dark:bg-gray-800'
                      : 'hover:shadow-md bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => setSelected(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{option.icon}</div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {option.title}
                          </h3>
                          {option.recommended && (
                            <span className="px-2 py-0.5 bg-[#28A745] text-white text-xs font-medium rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          Finish in
                        </div>
                        <div className="text-lg font-semibold text-[#1F4E78] dark:text-blue-400">
                          {option.estimatedCompletion}
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-[#1F4E78] bg-[#1F4E78]'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 mb-8"
        >
          <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
            💪 Commitment Tip
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Studies show that consistent daily practice — even just 5 minutes — is more effective than
            sporadic longer sessions. Choose what you can sustain, not what sounds impressive.
          </p>
        </motion.div>

        <div className="text-center">
          <Button size="lg" onClick={handleContinue} className="px-8">
            Set My Goal
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            You can always change this later in settings
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 3 ? 'w-8 bg-[#1F4E78]' : 'w-2 bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
