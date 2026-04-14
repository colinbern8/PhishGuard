import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { mockModules } from '../../lib/mockData';

export function ProgressTracking() {
  const totalModules = mockModules.length;
  const completedModules = mockModules.filter(m => m.status === 'completed').length;
  const inProgressModules = mockModules.filter(m => m.status === 'in-progress').length;
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Learning Progress</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#1F4E78] mb-2">{completedModules}</div>
                <p className="text-sm text-gray-600">Modules Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2E75B6] mb-2">{inProgressModules}</div>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
                <p className="text-sm text-gray-600">Avg Quiz Score</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">24h</div>
                <p className="text-sm text-gray-600">Total Study Time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overall Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>Progress</span>
              <span className="font-bold">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Module History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockModules.filter(m => m.status === 'completed').map((module) => (
                <div key={module.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">{module.title}</p>
                      <p className="text-sm text-gray-600">{module.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">Completed</p>
                    <p className="text-xs text-gray-500">Score: 95%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
