import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { Bell, User, Shield, BookOpen, ScanSearch, Trophy, Users, Wrench, Home, LogOut, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { mockCurrentUser } from '../../lib/mockData';
import { getCurrentUserProfile, getCurrentUserRole, mockLogout } from '../../lib/auth';
import { ThemeToggle } from '../ui/theme-toggle';
import { StreakRiskBanner } from '../shared/StreakRiskBanner';
import { SessionTimeoutWarning } from '../shared/SessionTimeoutWarning';

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUserProfile() ?? mockCurrentUser;
  const role = getCurrentUserRole();

  const handleLogout = () => {
    mockLogout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/app', label: 'Dashboard', icon: Home, exact: true },
    { path: '/app/training', label: 'Training', icon: BookOpen },
    { path: '/app/scanner', label: 'Scanner', icon: ScanSearch },
    { path: '/app/knowledge', label: 'Knowledge Hub', icon: Shield },
    { path: '/app/community', label: 'Community', icon: Users },
    { path: '/app/forum', label: 'Forum', icon: MessageSquare },
  ];

  // Mock: Check if user is at risk of losing streak (< 3 hours left in day)
  const currentHour = new Date().getHours();
  const hoursLeftInDay = 24 - currentHour;
  const showStreakRisk = hoursLeftInDay <= 3;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SessionTimeoutWarning />
      {/* Streak Risk Banner */}
      {showStreakRisk && (
        <StreakRiskBanner 
          streakDays={currentUser.currentStreak} 
          hoursLeft={hoursLeftInDay}
        />
      )}
      
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Main Nav */}
            <div className="flex">
              <Link to="/app" className="flex items-center">
                <Shield className="h-8 w-8 text-[#1F4E78]" />
                <span className="ml-2 text-xl font-bold text-[#1F4E78]">PhishGuard</span>
              </Link>
              
              <div className="hidden md:ml-8 md:flex md:space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = item.exact 
                    ? location.pathname === item.path 
                    : isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        item.path === '/app/knowledge' ? 'whitespace-nowrap ' : ''
                      }${
                        active
                          ? 'bg-[#1F4E78] text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Tools Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive('/app/tools')
                          ? 'bg-[#1F4E78] text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Wrench className="h-4 w-4 mr-2" />
                      Tools
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/app/tools/password" className="cursor-pointer">Password Checker</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/app/tools/breach" className="cursor-pointer">Breach Checker</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/app/tools/url-expander" className="cursor-pointer">URL Expander</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Right side - Notifications and User */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2">
                    <p className="font-semibold mb-2">Notifications</p>
                    <div className="space-y-2">
                      <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                        <p className="text-sm font-medium">New weekly challenge available!</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                      <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                        <p className="text-sm font-medium">You earned the "Week Warrior" badge</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                      </div>
                      <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                        <p className="text-sm font-medium">New article: Top Phishing Scams of 2026</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                      <AvatarFallback>{currentUser.username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">{currentUser.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{currentUser.username}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/app/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/app/achievements" className="cursor-pointer">
                      <Trophy className="mr-2 h-4 w-4" />
                      Achievements
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/app/progress" className="cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Progress
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/app/leaderboard" className="cursor-pointer">
                      <Trophy className="mr-2 h-4 w-4" />
                      Leaderboard
                    </Link>
                  </DropdownMenuItem>
                  {role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/app/admin" className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Console
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <button onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}