import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, BookOpen, Clock, User, Mail, Link2, Lock, Users, Shield, AlertTriangle, Globe, Smartphone, Key, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { mockArticles } from '../../lib/mockData';

const categoryBannerConfig: Record<string, { gradient: string; icon: React.ElementType; iconColor: string; pattern: string }> = {
  "Email Security": {
    gradient: "from-blue-900 via-blue-800 to-indigo-900",
    icon: Mail,
    iconColor: "text-blue-300",
    pattern: "opacity-10"
  },
  "Threat Intelligence": {
    gradient: "from-red-900 via-rose-800 to-orange-900",
    icon: AlertTriangle,
    iconColor: "text-red-300",
    pattern: "opacity-10"
  },
  "Password Safety": {
    gradient: "from-green-900 via-emerald-800 to-teal-900",
    icon: Lock,
    iconColor: "text-green-300",
    pattern: "opacity-10"
  },
  "Social Engineering": {
    gradient: "from-orange-900 via-amber-800 to-yellow-900",
    icon: Users,
    iconColor: "text-orange-300",
    pattern: "opacity-10"
  },
  "Best Practices": {
    gradient: "from-purple-900 via-violet-800 to-purple-900",
    icon: Shield,
    iconColor: "text-purple-300",
    pattern: "opacity-10"
  },
  "Web Safety": {
    gradient: "from-cyan-900 via-sky-800 to-blue-900",
    icon: Globe,
    iconColor: "text-cyan-300",
    pattern: "opacity-10"
  },
  "Malware": {
    gradient: "from-red-950 via-red-900 to-rose-900",
    icon: AlertTriangle,
    iconColor: "text-red-400",
    pattern: "opacity-10"
  },
};

const defaultBanner = {
  gradient: "from-slate-900 via-slate-800 to-slate-900",
  icon: BookOpen,
  iconColor: "text-slate-300",
  pattern: "opacity-10"
};

function ArticleBanner({ category, title, size = "large" }: { category: string; title?: string; size?: "large" | "small" }) {
  const config = categoryBannerConfig[category] ?? defaultBanner;
  const IconComponent = config.icon;
  const isLarge = size === "large";

  return (
    <div className={`relative w-full ${isLarge ? "h-48" : "h-36"} rounded-t-xl overflow-hidden bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
      <IconComponent
        className={`absolute right-6 bottom-4 ${isLarge ? "w-32 h-32" : "w-24 h-24"} ${config.iconColor} opacity-10`}
        strokeWidth={1}
      />
      <div className="flex flex-col items-center gap-3 z-10">
        <div className={`${isLarge ? "w-16 h-16" : "w-12 h-12"} rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20`}>
          <IconComponent className={`${isLarge ? "w-8 h-8" : "w-6 h-6"} ${config.iconColor}`} strokeWidth={1.5} />
        </div>
        <span className="text-xs font-medium text-white/70 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
          {category}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}

const categories = ['All', 'Email Security', 'Password Safety', 'Social Engineering', 'Malware', 'Best Practices'];

export function KnowledgeHub() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article as { description?: string }).description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredFromFiltered = filteredArticles.filter(a => a.featured);
  const featuredToShow = featuredFromFiltered.length > 0 ? featuredFromFiltered : filteredArticles.slice(0, 2);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Knowledge Hub</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, guides, and resources..."
              className="pl-10 pr-10 bg-white dark:bg-[#12121A] border border-gray-300 dark:border-[#1E1E2E] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-[#12121A] text-gray-600 dark:text-gray-400 border-gray-300 dark:border-[#1E1E2E] hover:border-blue-400 hover:text-blue-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 mb-8">
          {filteredArticles.length === 0
            ? 'No results'
            : `Showing ${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}${activeCategory !== 'All' ? ` in ${activeCategory}` : ''}${searchQuery ? ` for "${searchQuery}"` : ''}`
          }
        </p>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-lg">No articles found</h3>
            <p className="text-gray-500 text-sm mt-1">
              Try a different search term or category
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-blue-400 text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {filteredArticles.length > 0 && featuredToShow.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {isLoading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-[#12121A] rounded-xl overflow-hidden border border-gray-200 dark:border-[#1E1E2E]"
                    >
                      <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                  ))
                : featuredToShow.map((article) => (
                    <Link key={article.id} to={`/app/knowledge/${article.id}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
                        <ArticleBanner category={article.category} size="large" />
                        <CardContent className="pt-4">
                          <Badge className="mb-2">{article.category}</Badge>
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h3>
                          <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">{article.excerpt}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime}
                            </span>
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {article.author}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
            </div>
          </div>
        )}

        {filteredArticles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">All Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#12121A] rounded-xl overflow-hidden border border-gray-200 dark:border-[#1E1E2E]"
                  >
                    <div className="h-36 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                ))
              : (() => {
                  const featuredIds = new Set(featuredToShow.map(a => a.id));
                  const articlesForGrid = filteredArticles.filter(a => !featuredIds.has(a.id));
                  return articlesForGrid.map((article) => (
                  <Link key={article.id} to={`/app/knowledge/${article.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
                      <ArticleBanner category={article.category} size="small" />
                      <CardContent className="pt-4">
                        <Badge variant="outline" className="mb-2">{article.category}</Badge>
                        <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h3>
                        <p className="text-sm mb-4 line-clamp-2 text-gray-500 dark:text-gray-400">{article.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.readTime}
                          </span>
                          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  ));
                })()}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
