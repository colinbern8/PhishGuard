import { useParams, useLocation, Link, useNavigate } from 'react-router';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight, Zap, Star, Flame, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Badge } from '../ui/badge';
import { XPReward } from '../gamification/XPReward';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export function QuizResults() {
  const { moduleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get data from state first, then fallback to sessionStorage
  let state = location.state as { answers?: {[key: number]: number}, questions?: any[], timestamp?: number } | null;
  
  // Fallback to sessionStorage if state is not available
  if (!state || !state.questions || state.questions.length === 0) {
    const stored = sessionStorage.getItem('quizResults');
    if (stored) {
      try {
        state = JSON.parse(stored);
        // Clear it after reading to prevent reuse
        sessionStorage.removeItem('quizResults');
      } catch (e) {
        console.error('Failed to parse stored quiz results:', e);
      }
    }
  }
  
  const answers = state?.answers || {};
  const questions = state?.questions || [];

  // If no quiz data, show error message
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="pt-8 text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 dark:text-white">No Quiz Data Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Unable to load quiz results. Please try taking the quiz again.
              </p>
              <Link to={`/app/training/${moduleId}/quiz`}>
                <Button className="bg-[#1F4E78] hover:bg-[#2E75B6]">
                  Back to Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Calculate score
  const correctCount = questions.filter((q: any, idx: number) => 
    answers[idx] === q.correctAnswer
  ).length;
  const totalQuestions = questions.length || 1; // Prevent division by zero
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = score >= 80;

  // Retake cooldown state
  const [retakeCooldown, setRetakeCooldown] = useState<{ hours: number; minutes: number } | null>(null);

  // Store failed attempt timestamp if score < 80% and check cooldown
  useEffect(() => {
    if (!moduleId || passed) {
      setRetakeCooldown(null);
      return;
    }

    const storageKey = `phishguard_quiz_failed_${moduleId}`;
    const failedTimestamp = localStorage.getItem(storageKey);
    
    // If no timestamp exists, store current time (first failed attempt)
    if (!failedTimestamp) {
      localStorage.setItem(storageKey, Date.now().toString());
    }

    // Function to calculate and update cooldown
    const updateCooldown = () => {
      const storedTimestamp = localStorage.getItem(storageKey);
      if (!storedTimestamp) {
        setRetakeCooldown(null);
        return;
      }

      const failedTime = parseInt(storedTimestamp, 10);
      const now = Date.now();
      const elapsed = now - failedTime;
      const cooldownMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (elapsed < cooldownMs) {
        const remaining = cooldownMs - elapsed;
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        setRetakeCooldown({ hours, minutes });
      } else {
        // Cooldown expired, clear storage
        localStorage.removeItem(storageKey);
        setRetakeCooldown(null);
      }
    };

    // Update immediately
    updateCooldown();

    // Update every minute to show countdown
    const interval = setInterval(updateCooldown, 60000);

    return () => clearInterval(interval);
  }, [moduleId, passed]);

  // Show points award toast on mount if passed
  useEffect(() => {
    if (passed) {
      toast.success("🏆 +100 XP earned for completing this quiz!");
    }
  }, [passed]);
  
  // XP Calculation
  const baseXP = 10;
  const perfectBonus = score === 100 ? 15 : 0;
  const scoreBonus = Math.floor(score / 10);
  const totalXP = baseXP + scoreBonus + perfectBonus;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Score Card */}
        <Card className="mb-8 overflow-hidden">
          <div className={`h-2 ${passed ? 'bg-gradient-to-r from-green-400 to-emerald-600' : 'bg-gradient-to-r from-orange-400 to-red-500'}`} />
          <CardContent className="pt-8 text-center">
            <div className="mb-6">
              {passed ? (
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full mb-4 animate-bounce">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-full mb-4">
                  <XCircle className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-2 dark:text-white">
              Your Score: {correctCount}/{questions.length} — {score}%
            </h1>

            {/* Pass/Fail Threshold Banner */}
            {passed ? (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border-2 border-green-500 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-xl font-bold">✓ Passed!</span>
                </div>
                <p className="text-green-600 dark:text-green-400 mt-2">
                  Great work! You've earned the completion badge.
                </p>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-2 border-red-500 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <XCircle className="h-6 w-6" />
                  <span className="text-xl font-bold">✗ Not quite</span>
                </div>
                <p className="text-red-600 dark:text-red-400 mt-2">
                  You need 80% to pass. Review the material and try again.
                </p>
              </div>
            )}
            
            <p className={`text-xl mb-6 ${passed ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
              {passed 
                ? score === 100 
                  ? '🎉 Perfect Score! Outstanding work!' 
                  : 'Great job! You passed!' 
                : 'Keep practicing!'}
            </p>

            {/* XP Rewards */}
            {passed && (
              <div className="space-y-3 mb-6">
                {/* Main XP Reward */}
                <div className="inline-block">
                  <XPReward xp={totalXP} reason="Quiz Complete" showAnimation />
                </div>
                
                {/* Breakdown */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4 max-w-md mx-auto">
                  <p className="font-semibold text-gray-700 mb-3">XP Breakdown</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Quiz Completion</span>
                      <div className="flex items-center gap-1 text-yellow-700 font-bold">
                        <Zap className="h-3 w-3" />
                        +{baseXP}
                      </div>
                    </div>
                    {scoreBonus > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Score Bonus ({score}%)</span>
                        <div className="flex items-center gap-1 text-yellow-700 font-bold">
                          <Star className="h-3 w-3" />
                          +{scoreBonus}
                        </div>
                      </div>
                    )}
                    {perfectBonus > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          Perfect Score!
                        </span>
                        <div className="flex items-center gap-1 text-yellow-700 font-bold">
                          <Trophy className="h-3 w-3 fill-yellow-700" />
                          +{perfectBonus}
                        </div>
                      </div>
                    )}
                    <div className="pt-2 border-t border-yellow-300 flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Total XP Earned</span>
                      <div className="flex items-center gap-1 text-lg text-yellow-700 font-bold">
                        <Zap className="h-4 w-4 fill-yellow-700" />
                        {totalXP}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Streak Maintained */}
                <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border-2 border-orange-300">
                  <Flame className="h-5 w-5 text-orange-600 fill-orange-600" />
                  <span className="text-sm font-bold text-orange-700">7 day streak maintained! 🔥</span>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4 mt-6">
              {!passed && (
                retakeCooldown ? (
                  <Button 
                    disabled 
                    className="bg-gray-400 cursor-not-allowed"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retake available in {retakeCooldown.hours}h {retakeCooldown.minutes}m
                  </Button>
                ) : (
                  <Link to={`/app/training/${moduleId}/quiz`}>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Retake Quiz
                    </Button>
                  </Link>
                )
              )}
              {passed && (
                <Link to={`/app/training/${moduleId}/quiz`}>
                  <Button variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retake for Practice
                  </Button>
                </Link>
              )}
              <Link to="/app/training">
                <Button className="bg-[#1F4E78] hover:bg-[#2E75B6]">
                  {passed ? (
                    <>
                      Continue to Next Module
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    'Back to Modules'
                  )}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {questions.map((question: any, idx: number) => {
                const isCorrect = answers[idx] === question.correctAnswer;
                return (
                  <AccordionItem key={idx} value={`question-${idx}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-start gap-3 text-left">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <span className="font-medium">Question {idx + 1}</span>
                          <p className="text-sm font-normal text-gray-600 mt-1">
                            {question.question}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-8 space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Your Answer:</p>
                          <div className={`p-3 rounded-lg ${
                            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                          }`}>
                            <p className={isCorrect ? 'text-green-800' : 'text-red-800'}>
                              {question.options[answers[idx]]}
                            </p>
                          </div>
                        </div>

                        {!isCorrect && (
                          <div>
                            <p className="text-sm font-medium mb-2">Correct Answer:</p>
                            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                              <p className="text-green-800">
                                {question.options[question.correctAnswer]}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                          <p className="text-sm font-medium text-blue-900 mb-1">Explanation:</p>
                          <p className="text-sm text-blue-800">{question.explanation}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}