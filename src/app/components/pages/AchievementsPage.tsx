"use client";

import { useState, useEffect } from 'react';
import { Trophy, Lock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { mockAchievements } from '../../lib/mockData';

type CategoryFilter = 'All' | 'Training' | 'Security' | 'Community' | 'Expert';

export function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [showCelebration, setShowCelebration] = useState(false);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);

  const earnedCount = mockAchievements.filter(a => a.earned).length;

  // Check for new achievement on mount
  useEffect(() => {
    const newAchievementName = localStorage.getItem('phishguard_new_achievement');
    if (newAchievementName) {
      setNewAchievement(newAchievementName);
      setShowCelebration(true);
    }
  }, []);

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    localStorage.removeItem('phishguard_new_achievement');
    setNewAchievement(null);
  };

  // Filter achievements by category
  const filteredAchievements = mockAchievements.filter(achievement => 
    selectedCategory === 'All' || achievement.category === selectedCategory
  );

  // Get locked achievements with progress
  const lockedAchievements = mockAchievements.filter(a => !a.earned && a.progress !== undefined && a.progressMax !== undefined);
  
  // Calculate progress percentage and get recommended achievements (top 2-3 by progress %)
  const recommendedAchievements = lockedAchievements
    .map(a => ({
      ...a,
      progressPercent: a.progress && a.progressMax ? (a.progress / a.progressMax) * 100 : 0
    }))
    .sort((a, b) => b.progressPercent - a.progressPercent)
    .slice(0, 3);

  const categories: CategoryFilter[] = ['All', 'Training', 'Security', 'Community', 'Expert'];

  // Confetti particles component
  const ConfettiParticles = () => {
    const [windowHeight, setWindowHeight] = useState(800);
    
    useEffect(() => {
      setWindowHeight(window.innerHeight);
    }, []);
    
    const particles = Array.from({ length: 50 }, (_, i) => i);
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    
    return (
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        {particles.map((i) => {
          const delay = Math.random() * 2;
          const duration = 2 + Math.random() * 2;
          const left = Math.random() * 100;
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: color, left: `${left}%` }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{ 
                y: windowHeight + 20, 
                opacity: [1, 1, 0],
                rotate: 360,
                x: (Math.random() - 0.5) * 100
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
            Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Earn badges and unlock rewards as you learn</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">{earnedCount} of {mockAchievements.length} badges earned</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round((earnedCount / mockAchievements.length) * 100)}% complete</span>
            </div>
            <Progress value={(earnedCount / mockAchievements.length) * 100} />
          </CardContent>
        </Card>

        {/* Recommended Next Section */}
        {recommendedAchievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              Almost There 🎯
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedAchievements.map((achievement) => {
                const progressPercent = achievement.progress && achievement.progressMax 
                  ? (achievement.progress / achievement.progressMax) * 100 
                  : 0;
                
                return (
                  <Card key={achievement.id} className="border-blue-300 dark:border-blue-600 border-2">
                    <CardContent className="pt-6 text-center">
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                        <Lock className="h-10 w-10 text-gray-500" />
                      </div>
                      <h3 className="font-bold mb-1">{achievement.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                      <Badge variant="outline">{achievement.rarity}</Badge>
                      {achievement.progress !== undefined && achievement.progressMax !== undefined && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                            <span>{achievement.progress}/{achievement.progressMax} completed</span>
                            <span>{Math.round(progressPercent)}%</span>
                          </div>
                          <Progress 
                            value={progressPercent} 
                            className="h-1.5 bg-gray-200 dark:bg-gray-700"
                          />
                        </div>
                      )}
                      {achievement.requirement && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{achievement.requirement}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="earned">Earned</TabsTrigger>
            <TabsTrigger value="locked">Locked</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAchievements.map((achievement) => {
                const progressPercent = !achievement.earned && achievement.progress !== undefined && achievement.progressMax !== undefined
                  ? (achievement.progress / achievement.progressMax) * 100
                  : 0;

                return (
                  <Card key={achievement.id} className={achievement.earned ? 'border-yellow-200 dark:border-yellow-700' : 'opacity-60'}>
                    <CardContent className="pt-6 text-center">
                      <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                          : 'bg-gray-300 dark:bg-gray-700'
                      }`}>
                        {achievement.earned ? (
                          <Trophy className="h-10 w-10 text-white" />
                        ) : (
                          <Lock className="h-10 w-10 text-gray-500" />
                        )}
                      </div>
                      <h3 className="font-bold mb-1">{achievement.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                      <Badge variant={
                        achievement.rarity === 'Common' ? 'secondary' :
                        achievement.rarity === 'Rare' ? 'default' :
                        achievement.rarity === 'Epic' ? 'destructive' :
                        'outline'
                      }>
                        {achievement.rarity}
                      </Badge>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{achievement.points} points</p>
                      {achievement.earned && achievement.earnedDate && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                      {!achievement.earned && achievement.requirement && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{achievement.requirement}</p>
                      )}
                      {!achievement.earned && achievement.progress !== undefined && achievement.progressMax !== undefined && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                            <span>{achievement.progress}/{achievement.progressMax} completed</span>
                            <span>{Math.round(progressPercent)}%</span>
                          </div>
                          <Progress 
                            value={progressPercent} 
                            className="h-1.5 bg-gray-200 dark:bg-gray-700"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="earned" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAchievements.filter(a => a.earned).map((achievement) => (
                <Card key={achievement.id} className="border-yellow-200 dark:border-yellow-700">
                  <CardContent className="pt-6 text-center">
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold mb-1">{achievement.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                    <Badge>{achievement.rarity}</Badge>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                      Earned {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locked" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAchievements.filter(a => !a.earned).map((achievement) => {
                const progressPercent = achievement.progress !== undefined && achievement.progressMax !== undefined
                  ? (achievement.progress / achievement.progressMax) * 100
                  : 0;

                return (
                  <Card key={achievement.id} className="opacity-60">
                    <CardContent className="pt-6 text-center">
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                        <Lock className="h-10 w-10 text-gray-500" />
                      </div>
                      <h3 className="font-bold mb-1">{achievement.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                      <Badge variant="outline">{achievement.rarity}</Badge>
                      {achievement.requirement && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{achievement.requirement}</p>
                      )}
                      {achievement.progress !== undefined && achievement.progressMax !== undefined && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                            <span>{achievement.progress}/{achievement.progressMax} completed</span>
                            <span>{Math.round(progressPercent)}%</span>
                          </div>
                          <Progress 
                            value={progressPercent} 
                            className="h-1.5 bg-gray-200 dark:bg-gray-700"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <>
            <ConfettiParticles />
            <Dialog open={showCelebration} onOpenChange={(open) => {
              if (!open) {
                handleCloseCelebration();
              }
            }}>
              <DialogContent className="max-w-md bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 0.6,
                      repeat: 2,
                      repeatType: "reverse"
                    }}
                    className="flex justify-center mb-4"
                  >
                    <Award className="w-20 h-20 text-yellow-500 dark:text-yellow-400" />
                  </motion.div>
                  
                  <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2"
                  >
                    Achievement Unlocked! 🎉
                  </motion.h2>
                  
                  <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2"
                  >
                    {newAchievement || 'New Achievement'}
                  </motion.p>
                  
                  <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg font-bold text-green-600 dark:text-green-400 mb-6"
                  >
                    +250 XP
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={handleCloseCelebration}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-2 rounded-full"
                    >
                      Awesome!
                    </Button>
                  </motion.div>
                </motion.div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
