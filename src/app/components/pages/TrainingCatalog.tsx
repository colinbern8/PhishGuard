import { Link } from 'react-router';
import { Mail, Link2, Users, Lock, Target, Smartphone, Shield, BookOpen, Clock, CheckCircle, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { mockModules, type Module } from '../../lib/mockData';
import { useState } from 'react';

const isModuleLocked = (module: Module): boolean => {
  if (!module.prerequisiteId) return false;
  const prerequisite = mockModules.find(m => m.id === module.prerequisiteId);
  return prerequisite ? (prerequisite.progress ?? 0) < 100 : false;
};

const getPrerequisiteName = (module: Module): string => {
  if (!module.prerequisiteId) return '';
  return mockModules.find(m => m.id === module.prerequisiteId)?.title ?? '';
};

const moduleIconMap: Record<string, { icon: React.ElementType; bg: string; color: string }> = {
  "1": { icon: Mail, bg: "bg-blue-100 dark:bg-blue-900/40", color: "text-blue-600 dark:text-blue-400" },
  "2": { icon: Link2, bg: "bg-purple-100 dark:bg-purple-900/40", color: "text-purple-600 dark:text-purple-400" },
  "3": { icon: Users, bg: "bg-orange-100 dark:bg-orange-900/40", color: "text-orange-600 dark:text-orange-400" },
  "4": { icon: Lock, bg: "bg-green-100 dark:bg-green-900/40", color: "text-green-600 dark:text-green-400" },
  "5": { icon: Target, bg: "bg-red-100 dark:bg-red-900/40", color: "text-red-600 dark:text-red-400" },
  "6": { icon: Smartphone, bg: "bg-teal-100 dark:bg-teal-900/40", color: "text-teal-600 dark:text-teal-400" },
};
const defaultIcon = { icon: Shield, bg: "bg-gray-100 dark:bg-gray-800", color: "text-gray-500" };

export function TrainingCatalog() {
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockModules.map(m => m.category)))];
  
  const filteredModules = mockModules.filter(module => {
    const matchesDifficulty = difficultyFilter === 'All' || module.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'All' || module.category === categoryFilter;
    return matchesDifficulty && matchesCategory;
  });

  const getStatusButton = (module: Module) => {
    if (module.status === 'completed') {
      return (
        <Link to={`/app/training/${module.id}`}>
          <Button size="sm" variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
            <CheckCircle className="h-4 w-4 mr-2" />
            Review
          </Button>
        </Link>
      );
    } else if (module.status === 'in-progress') {
      return (
        <Link to={`/app/training/${module.id}`}>
          <Button size="sm" className="bg-[#2E75B6] hover:bg-[#1F4E78]">
            <Play className="h-4 w-4 mr-2" />
            Continue
          </Button>
        </Link>
      );
    } else {
      return (
        <Link to={`/app/training/${module.id}`}>
          <Button size="sm" className="bg-[#1F4E78] hover:bg-[#2E75B6]">
            Start
          </Button>
        </Link>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Training Modules</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Master phishing detection through interactive learning</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Difficulty:</label>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Category:</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Progress Overview Sidebar */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completed</span>
                    <span className="font-medium">
                      {mockModules.filter(m => m.status === 'completed').length}/{mockModules.length}
                    </span>
                  </div>
                  <Progress 
                    value={(mockModules.filter(m => m.status === 'completed').length / mockModules.length) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-medium">
                      {mockModules.filter(m => m.status === 'in-progress').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Not Started</span>
                    <span className="font-medium">
                      {mockModules.filter(m => m.status === 'not-started').length}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/app/progress">
                    <Button variant="outline" className="w-full" size="sm">
                      View Detailed Progress
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Module Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredModules.map((module) => {
                const locked = isModuleLocked(module);
                return (
                <Card
                  key={module.id}
                  className={`hover:shadow-lg transition-shadow ${locked ? 'border-gray-700/50 dark:border-gray-800' : ''} ${locked ? 'relative' : ''}`}
                  onClick={locked ? (e) => e.preventDefault() : undefined}
                >
                  {locked && (
                    <div className="absolute inset-0 opacity-75 pointer-events-none rounded-[inherit] bg-gray-100 dark:bg-gray-900/50 z-0" aria-hidden />
                  )}
                  <CardHeader className={locked ? 'relative z-10' : ''}>
                    <div className="flex items-start justify-between mb-2">
                      {(() => {
                        const match = moduleIconMap[module.id] ?? defaultIcon;
                        const IconComponent = match.icon;
                        return (
                          <div className={`w-16 h-16 rounded-xl ${match.bg} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className={`w-8 h-8 ${match.color}`} strokeWidth={1.5} />
                          </div>
                        );
                      })()}
                      <div className="flex items-center gap-2">
                        {locked && (
                          <div className="flex items-center gap-1 bg-gray-700/80 text-gray-300 text-xs rounded-full px-2 py-1">
                            <Lock className="w-3 h-3" />
                            Locked
                          </div>
                        )}
                        <Badge 
                          variant="outline"
                          className={
                            module.difficulty === 'Beginner' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700' 
                              : module.difficulty === 'Intermediate' 
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700' 
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
                          }
                        >
                          {module.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className={locked ? 'relative z-10' : ''}>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {module.duration}
                      </div>

                      {module.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-gray-500">{module.category}</span>
                        {locked ? (
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Lock className="w-4 h-4" />
                            <span>Complete <span className="text-blue-400 font-medium">{getPrerequisiteName(module)}</span> first</span>
                          </div>
                        ) : (
                          getStatusButton(module)
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
              })}
            </div>

            {filteredModules.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No modules found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}