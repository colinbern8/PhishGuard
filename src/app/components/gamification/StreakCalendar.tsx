import { Flame, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface StreakDay {
  date: string;
  completed: boolean;
  isToday: boolean;
}

export function StreakCalendar() {
  // Generate last 7 days
  const days: StreakDay[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    days.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: i <= 6, // All days completed (mock data)
      isToday: i === 0
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2 rounded-lg">
            <Flame className="h-5 w-5 text-white" />
          </div>
          Keep Your Streak Going!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">
                {day.date}
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto transition-all ${
                  day.completed
                    ? day.isToday
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 ring-4 ring-orange-200 shadow-lg scale-110'
                      : 'bg-gradient-to-br from-orange-300 to-orange-500'
                    : 'bg-gray-100 border-2 border-dashed border-gray-300'
                }`}
              >
                {day.completed ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800 text-center font-medium">
            🔥 7 day streak! Complete today's lessons to keep it going!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
