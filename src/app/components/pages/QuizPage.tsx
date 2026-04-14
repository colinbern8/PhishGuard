import { useParams, useNavigate } from 'react-router';
import { Clock, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useState } from 'react';
import { mockQuizzes, mockModules } from '../../lib/mockData';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  
  // Get the module and its questions
  const module = mockModules.find(m => m.id === moduleId);
  const mockQuestions = mockQuizzes[moduleId || '1'] || mockQuizzes['1']; // Fallback to module 1
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const question = mockQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitClick = () => {
    setShowSubmitDialog(true);
  };

  const handleSubmitConfirm = () => {
    // Store in sessionStorage as fallback
    const quizData = {
      answers: selectedAnswers,
      questions: mockQuestions,
      timestamp: Date.now()
    };
    sessionStorage.setItem('quizResults', JSON.stringify(quizData));
    
    // Also try to pass via state
    navigate(`/app/training/${moduleId}/results`, { 
      state: quizData
    });
  };

  // Calculate unanswered and flagged questions
  const unansweredCount = mockQuestions.length - Object.keys(selectedAnswers).length;
  const flaggedCount = flaggedQuestions.size;

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Quiz Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{module?.title || 'Quiz'}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Question {currentQuestion + 1} of {mockQuestions.length}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>15:30</span>
                </div>
              </div>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold flex-1 dark:text-white">{question.question}</h2>
                <Button
                  variant={flaggedQuestions.has(currentQuestion) ? "default" : "outline"}
                  size="sm"
                  onClick={toggleFlag}
                >
                  <Flag className={`h-4 w-4 ${flaggedQuestions.has(currentQuestion) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <RadioGroup
                value={selectedAnswers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-[#2E75B6] bg-blue-50 dark:bg-blue-900/30 dark:border-[#2E75B6]'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="shrink-0" />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer text-base list-none dark:text-white"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {mockQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      index === currentQuestion
                        ? 'bg-[#1F4E78] text-white'
                        : selectedAnswers[index] !== undefined
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    } ${flaggedQuestions.has(index) ? 'ring-2 ring-orange-400' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {currentQuestion === mockQuestions.length - 1 ? (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleSubmitClick}
                  disabled={Object.keys(selectedAnswers).length !== mockQuestions.length}
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  className="bg-[#1F4E78] hover:bg-[#2E75B6]"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress Info */}
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            {Object.keys(selectedAnswers).length} of {mockQuestions.length} questions answered
            {flaggedQuestions.size > 0 && ` • ${flaggedQuestions.size} flagged for review`}
          </p>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit your quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              {flaggedCount > 0 && (
                <p className="mb-2">
                  You have {flaggedCount} flagged question{flaggedCount !== 1 ? 's' : ''}. Are you sure you want to submit?
                </p>
              )}
              {unansweredCount > 0 && (
                <p>
                  You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}.
                </p>
              )}
              {flaggedCount === 0 && unansweredCount === 0 && (
                <p>Are you ready to submit your quiz?</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitConfirm} className="bg-green-600 hover:bg-green-700">
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
