import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Progress } from '../../ui/progress';

const questions = [
  {
    id: 1,
    question: 'Have you ever clicked on a suspicious link in an email?',
    options: [
      { id: 'a', text: 'Yes, multiple times', score: 1 },
      { id: 'b', text: 'Once or twice', score: 2 },
      { id: 'c', text: 'Never', score: 3 },
    ],
  },
  {
    id: 2,
    question: 'Can you identify the difference between HTTP and HTTPS?',
    options: [
      { id: 'a', text: 'Not sure what those are', score: 1 },
      { id: 'b', text: 'I\'ve heard of them', score: 2 },
      { id: 'c', text: 'Yes, I know the difference', score: 3 },
    ],
  },
  {
    id: 3,
    question: 'How often do you check the sender\'s email address before opening attachments?',
    options: [
      { id: 'a', text: 'Rarely or never', score: 1 },
      { id: 'b', text: 'Sometimes', score: 2 },
      { id: 'c', text: 'Always', score: 3 },
    ],
  },
];

export function OnboardingAssessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswer = answers[currentQ.id] !== undefined;

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [currentQ.id]: score });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate total score and store
      const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
      localStorage.setItem('phishguard_assessment_score', totalScore.toString());
      navigate('/onboarding/path');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Quick Skill Assessment
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Let's see where you're starting from — no judgment!
          </p>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="p-8 bg-white dark:bg-gray-800 mb-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((option) => {
                const isSelected = answers[currentQ.id] === option.score;

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswer(option.score)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-[#1F4E78] text-white ring-2 ring-[#1F4E78] ring-offset-2 dark:ring-offset-gray-800'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                          isSelected ? 'border-white' : 'border-gray-300 dark:border-gray-500'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-white rounded-full"
                          />
                        )}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!hasAnswer}>
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 1 ? 'w-8 bg-[#1F4E78]' : 'w-2 bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
