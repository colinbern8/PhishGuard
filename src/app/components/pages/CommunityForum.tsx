import { useState, useMemo } from 'react';
import {
  MessageSquare,
  Lightbulb,
  HelpCircle,
  AlertTriangle,
  Pin,
  ThumbsUp,
  Star,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

const CATEGORIES = [
  { id: 'General Discussion', label: 'General Discussion', icon: MessageSquare },
  { id: 'Tips & Tricks', label: 'Tips & Tricks', icon: Lightbulb },
  { id: 'Ask Experts', label: 'Ask Experts', icon: HelpCircle },
  { id: 'Threat Alerts', label: 'Threat Alerts', icon: AlertTriangle },
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

interface ForumThread {
  id: number;
  category: string;
  title: string;
  author: string;
  authorAvatar: string;
  body: string;
  replies: number;
  upvotes: number;
  date: string;
  tags: string[];
  isBestAnswer?: boolean;
  isExpert?: boolean;
  isPinned?: boolean;
}

const initialMockThreads: ForumThread[] = [
  {
    id: 1,
    category: 'General Discussion',
    title: 'How do you explain phishing to non-tech family members?',
    author: 'SecurityPro',
    authorAvatar: 'SP',
    body: 'I have been trying to teach my parents about phishing but they keep falling for obvious scams...',
    replies: 14,
    upvotes: 32,
    date: '2 hours ago',
    tags: ['education', 'family'],
    isBestAnswer: false,
    isExpert: false,
  },
  {
    id: 2,
    category: 'Tips & Tricks',
    title: 'Top 5 browser extensions for phishing protection',
    author: 'CyberNinja',
    authorAvatar: 'CN',
    body: 'After testing dozens of extensions I have narrowed it down to the best ones...',
    replies: 8,
    upvotes: 47,
    date: '5 hours ago',
    tags: ['browser', 'tools'],
    isBestAnswer: true,
    isExpert: true,
  },
  {
    id: 3,
    category: 'Ask Experts',
    title: 'Is this email from PayPal legitimate?',
    author: 'NewUser42',
    authorAvatar: 'NU',
    body: 'I received this email claiming my account was compromised. The sender looks real but something feels off...',
    replies: 6,
    upvotes: 12,
    date: '1 day ago',
    tags: ['email', 'paypal'],
    isBestAnswer: false,
    isExpert: false,
  },
  {
    id: 4,
    category: 'Threat Alerts',
    title: '⚠️ New LinkedIn phishing campaign targeting professionals',
    author: 'PhishHunter',
    authorAvatar: 'PH',
    body: 'Multiple users have reported receiving fake LinkedIn messages claiming their account will be suspended...',
    replies: 23,
    upvotes: 89,
    date: '3 hours ago',
    tags: ['linkedin', 'alert', 'urgent'],
    isExpert: true,
    isPinned: true,
  },
  {
    id: 5,
    category: 'General Discussion',
    title: 'Weekly check-in: Share your phishing catch of the week!',
    author: 'Moderator',
    authorAvatar: 'MO',
    body: 'Drop the most interesting phishing attempt you spotted this week in the comments below...',
    replies: 31,
    upvotes: 56,
    date: '1 day ago',
    tags: ['community', 'weekly'],
    isPinned: true,
    isExpert: false,
  },
];

const TOP_CONTRIBUTORS = [
  { name: 'PhishHunter', avatar: 'PH', isExpert: true },
  { name: 'CyberNinja', avatar: 'CN', isExpert: true },
  { name: 'SecurityPro', avatar: 'SP', isExpert: false },
];

const FORUM_RULES = [
  'Be respectful. No personal attacks or harassment.',
  'No sharing of real phishing links or sensitive data.',
  'Use the correct category and tags so others can find your posts.',
];

const avatarColors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
];

function getAvatarColor(initials: string) {
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % avatarColors.length;
  return avatarColors[idx];
}

export function CommunityForum() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('General Discussion');
  const [searchQuery, setSearchQuery] = useState('');
  const [showComposer, setShowComposer] = useState(false);
  const [threads, setThreads] = useState<ForumThread[]>(initialMockThreads);
  const [upvotedIds, setUpvotedIds] = useState<Set<number>>(new Set());
  const [nextId, setNextId] = useState(6);

  // Composer form
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryId>('General Discussion');

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      const matchesCategory = t.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.body.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [threads, activeCategory, searchQuery]);

  const handleUpvote = (id: number) => {
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setThreads((threads) =>
          threads.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes - 1 } : t))
        );
      } else {
        next.add(id);
        setThreads((threads) =>
          threads.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
        );
      }
      return next;
    });
  };

  const handlePostThread = () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    const thread: ForumThread = {
      id: nextId,
      category: newCategory,
      title: newTitle.trim(),
      author: 'You',
      authorAvatar: 'YO',
      body: newBody.trim(),
      replies: 0,
      upvotes: 0,
      date: 'Just now',
      tags: [],
      isExpert: false,
    };
    setThreads((prev) => [thread, ...prev]);
    setNextId((n) => n + 1);
    setNewTitle('');
    setNewBody('');
    setNewCategory('General Discussion');
    setShowComposer(false);
    toast.success('+5 XP earned for your contribution!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Community Forum
              </h1>
              <Button
                onClick={() => setShowComposer(true)}
                className="bg-[#1F4E78] hover:bg-[#163a5c] dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] shrink-0"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                New Thread
              </Button>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-[#1E1E2E] mb-6">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      active
                        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                        : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search threads by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white dark:bg-[#12121A] border-gray-200 dark:border-[#1E1E2E]"
              />
            </div>

            {/* New thread composer (inline) */}
            {showComposer && (
              <Card className="mb-6 bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">New thread</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      Title
                    </label>
                    <Input
                      placeholder="Thread title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="bg-white dark:bg-[#0A0A0F] border-gray-200 dark:border-[#1E1E2E]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      Body
                    </label>
                    <Textarea
                      placeholder="What's on your mind?"
                      value={newBody}
                      onChange={(e) => setNewBody(e.target.value)}
                      rows={4}
                      className="bg-white dark:bg-[#0A0A0F] border-gray-200 dark:border-[#1E1E2E]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      Category
                    </label>
                    <Select
                      value={newCategory}
                      onValueChange={(v) => setNewCategory(v as CategoryId)}
                    >
                      <SelectTrigger className="w-full sm:w-56 bg-white dark:bg-[#0A0A0F] border-gray-200 dark:border-[#1E1E2E]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handlePostThread}
                      disabled={!newTitle.trim() || !newBody.trim()}
                      className="bg-[#1F4E78] hover:bg-[#163a5c] dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8]"
                    >
                      Post Thread
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowComposer(false);
                        setNewTitle('');
                        setNewBody('');
                      }}
                      className="border-gray-300 dark:border-[#1E1E2E]"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Thread list */}
            <div className="space-y-4">
              {filteredThreads.length === 0 ? (
                <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
                  <CardContent className="py-12 text-center text-gray-500 dark:text-gray-400">
                    No threads match your filters. Try another category or search.
                  </CardContent>
                </Card>
              ) : (
                filteredThreads.map((thread) => (
                  <Card
                    key={thread.id}
                    className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] hover:border-gray-300 dark:hover:border-[#2a2a3a] transition-colors"
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex gap-3 sm:gap-4">
                        {/* Upvote column */}
                        <div className="flex flex-col items-center shrink-0">
                          <button
                            onClick={() => handleUpvote(thread.id)}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-[#1E1E2E] transition-colors"
                            aria-label="Upvote"
                          >
                            <ThumbsUp
                              className={`h-5 w-5 ${
                                upvotedIds.has(thread.id)
                                  ? 'fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            />
                          </button>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                            {thread.upvotes}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Pinned badge */}
                          {thread.isPinned && (
                            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 mb-2">
                              <Pin className="h-4 w-4" />
                              <span className="text-sm font-medium">Pinned</span>
                            </div>
                          )}

                          {/* Title */}
                          <a
                            href="#"
                            className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block mb-2 line-clamp-2"
                          >
                            {thread.title}
                          </a>

                          {/* Author row */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(thread.authorAvatar)}`}
                            >
                              {thread.authorAvatar}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {thread.author}
                            </span>
                            {thread.isExpert && (
                              <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Community Expert
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {thread.date}
                            </span>
                          </div>

                          {/* Body preview */}
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                            {thread.body}
                          </p>

                          {/* Tags */}
                          {thread.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {thread.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#1E1E2E] text-gray-600 dark:text-gray-400"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Bottom row: reply count, best answer */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {thread.replies} replies
                            </span>
                            {thread.isBestAnswer && (
                              <Badge variant="secondary" className="text-xs">
                                Best Answer
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            {/* Community Stats */}
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>Total Threads: 1,247</p>
                <p>Active Members: 3,891</p>
                <p>Posts Today: 47</p>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {TOP_CONTRIBUTORS.map((user) => (
                    <li
                      key={user.name}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(user.avatar)}`}
                      >
                        {user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        {user.isExpert && (
                          <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 text-xs mt-0.5">
                            <Star className="h-3 w-3 mr-1" />
                            Community Expert
                          </Badge>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Forum Rules */}
            <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Forum Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                  {FORUM_RULES.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
