import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Award, Activity, Settings as SettingsIcon, LogOut, Shield, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
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
import { toast } from 'sonner';
import { mockCurrentUser, mockAchievements } from '../../lib/mockData';
import { getCurrentUserProfile, getCurrentUserRole, mockLogout, setCurrentUserRole, type UserRole } from '../../lib/auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function ProfilePage() {
  const navigate = useNavigate();
  const earnedAchievements = mockAchievements.filter(a => a.earned);
  const currentUser = getCurrentUserProfile() ?? mockCurrentUser;
  const [role, setRole] = useState<UserRole>(() => getCurrentUserRole());
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const handleLogout = () => {
    mockLogout();
    toast('You have been logged out successfully');
    navigate('/');
  };

  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      profile: { username: currentUser.username, email: currentUser.email },
      progress: JSON.parse(localStorage.getItem('phishguard_progress') || '{}'),
      bookmarks: Object.keys(localStorage).filter(k => k.startsWith('phishguard_bookmark')),
      settings: {
        theme: localStorage.getItem('phishguard-ui-theme'),
        dailyCommitment: localStorage.getItem('phishguard_daily_commitment'),
      }
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phishguard-data-export.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const handleDeleteAccount = () => {
    // Clear all phishguard_* keys from localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('phishguard_')) {
        localStorage.removeItem(key);
      }
    });
    setDeleteAccountDialogOpen(false);
    setDeleteConfirmText('');
    setDeletePassword('');
    toast.error("Account deleted. We're sorry to see you go.");
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleRoleChange = (nextRole: UserRole) => {
    setRole(nextRole);
    setCurrentUserRole(nextRole);
    toast.success(`Role switched to ${nextRole}.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>{currentUser.username.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-bold text-xl">{currentUser.username}</h2>
                  <p className="text-sm text-gray-600">Member since {new Date(currentUser.memberSince).toLocaleDateString()}</p>
                  <Button className="mt-4 w-full" size="sm">Edit Profile</Button>
                </div>

                <div className="mt-6 pt-6 border-t space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Points</span>
                    <span className="font-bold">{currentUser.totalPoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rank</span>
                    <span className="font-bold">#{currentUser.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Modules Completed</span>
                    <span className="font-bold">{currentUser.modulesCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Badges Earned</span>
                    <span className="font-bold">{currentUser.badgesEarned}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Bio</Label>
                      <p className="text-sm text-gray-600 mt-1">{currentUser.bio}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm text-gray-600 mt-1">{currentUser.email}</p>
                    </div>
                    <div>
                      <Label>Learning Preferences</Label>
                      <p className="text-sm text-gray-600 mt-1">Beginner to Intermediate modules</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earned Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {earnedAchievements.map(achievement => (
                        <div key={achievement.id} className="text-center p-4 border rounded-lg">
                          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Award className="h-8 w-8 text-white" />
                          </div>
                          <p className="font-semibold text-sm">{achievement.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Earned {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: 'Completed Email Phishing 101', date: '2 hours ago' },
                        { action: 'Earned Week Warrior badge', date: '1 day ago' },
                        { action: 'Scored 90% on quiz', date: '2 days ago' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Activity className="h-5 w-5 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.action}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Prototype Role</Label>
                      <p className="text-xs text-gray-500 mt-1">
                        This is a prototype toggle to access Instructor/Admin use cases (not real RBAC).
                      </p>
                      <div className="mt-2">
                        <Select value={role} onValueChange={(v) => handleRoleChange(v as UserRole)}>
                          <SelectTrigger className="w-full sm:w-72">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard User</SelectItem>
                            <SelectItem value="instructor">Instructor / Content Manager</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue={currentUser.username} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={currentUser.email} />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={currentUser.bio} />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      Privacy & Data
                    </CardTitle>
                    <CardDescription>Manage your personal data in compliance with data protection regulations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Export Data */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Export Your Data</p>
                        <p className="text-xs text-gray-500 mt-0.5">Download a copy of all your personal data, progress, and activity</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleExportData} className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export JSON
                      </Button>
                    </div>
                    {/* Clear Activity */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Clear Activity Data</p>
                        <p className="text-xs text-gray-500 mt-0.5">Remove your scan history and activity logs while keeping your account</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-500/10">
                        Clear Activity
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your data is processed in accordance with applicable data protection regulations.
                      You have the right to access, correct, and delete your personal data.
                    </p>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-500">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Permanently delete your account and all associated data. This cannot be undone.
                    </p>
                    <AlertDialog open={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen}>
                      <Button
                        variant="destructive"
                        onClick={() => setDeleteAccountDialogOpen(true)}
                      >
                        Delete Account
                      </Button>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete your account, progress, and all data. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="delete-confirm">Type "DELETE" to confirm</Label>
                            <Input
                              id="delete-confirm"
                              value={deleteConfirmText}
                              onChange={(e) => setDeleteConfirmText(e.target.value)}
                              placeholder="DELETE"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="delete-password">Enter your current password to confirm</Label>
                            <Input
                              id="delete-password"
                              type="password"
                              value={deletePassword}
                              onChange={(e) => setDeletePassword(e.target.value)}
                              placeholder="Enter password"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => {
                            setDeleteAccountDialogOpen(false);
                            setDeleteConfirmText('');
                            setDeletePassword('');
                          }}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            disabled={deleteConfirmText !== 'DELETE' || !deletePassword}
                            className="bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-600/20 dark:focus-visible:ring-red-600/40 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Permanently Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>

                {/* Logout Button */}
                <Card>
                  <CardContent className="pt-6">
                    <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                      <Button
                        variant="outline"
                        onClick={() => setLogoutDialogOpen(true)}
                        className="w-full"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                          <AlertDialogDescription>
                            You'll need to log back in to access your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Log Out
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
