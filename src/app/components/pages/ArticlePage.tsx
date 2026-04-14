import { Link } from 'react-router';
import { Clock, User, Bookmark, Share2, ChevronLeft, Mail, Link2, Lock, Users, Shield, AlertTriangle, BookOpen, Globe, Smartphone, Key } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';

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

export function ArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/app/knowledge" className="text-gray-900 dark:text-white">
                  Knowledge Hub
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 dark:text-white">Email Security</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="bg-white dark:bg-[#12121A]">
          <ArticleBanner category="Email Security" size="large" />
          <CardContent className="pt-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              The Anatomy of a Phishing Email: What to Look For
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-400 dark:text-gray-500 mb-8">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                5 min read
              </span>
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Dr. Sarah Chen
              </span>
              <span>February 10, 2026</span>
            </div>

            <div className="flex gap-2 mb-8">
              <Button variant="outline" size="sm" className="text-gray-900 dark:text-white">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </Button>
              <Button variant="outline" size="sm" className="text-gray-900 dark:text-white">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Learn to dissect phishing emails and identify the telltale signs of malicious intent before you become a victim.
              </p>

              <h2 className="text-gray-900 dark:text-white">Introduction</h2>
              <p>
                Phishing emails are one of the most common attack vectors used by cybercriminals. Understanding how to identify these threats is crucial for protecting yourself and your organization.
              </p>

              <h2 className="text-gray-900 dark:text-white">Key Warning Signs</h2>
              <h3 className="text-gray-900 dark:text-white">1. Sender Address Mismatch</h3>
              <p>
                Always verify that the sender's email address matches the organization they claim to represent. Phishers often use addresses that look similar but have subtle differences.
              </p>

              <h3 className="text-gray-900 dark:text-white">2. Urgent or Threatening Language</h3>
              <p>
                Legitimate organizations rarely demand immediate action through email. Be suspicious of messages that threaten account closure or legal action if you don't respond quickly.
              </p>

              <h3 className="text-gray-900 dark:text-white">3. Suspicious Links</h3>
              <p>
                Hover over links before clicking to see the actual URL. Phishing links often lead to domains that look similar to legitimate sites but have misspellings or unusual extensions.
              </p>

              <div className="bg-blue-50 dark:bg-[#12121A] border-l-4 border-blue-500 p-4 my-6">
                <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Pro Tip</p>
                <p className="text-blue-800 dark:text-blue-300">
                  Never click links in suspicious emails. Instead, manually type the organization's official URL into your browser or use a saved bookmark.
                </p>
              </div>

              <h2 className="text-gray-900 dark:text-white">Real-World Example</h2>
              <p>
                Consider an email claiming to be from your bank, requesting you to "verify your account" by clicking a link. A legitimate bank would never ask for sensitive information via email.
              </p>

              <h2 className="text-gray-900 dark:text-white">What to Do If You Receive a Phishing Email</h2>
              <ol>
                <li>Do not click any links or download attachments</li>
                <li>Report the email to your IT department or email provider</li>
                <li>Delete the email</li>
                <li>If you clicked a link, change your passwords immediately</li>
              </ol>

              <h2 className="text-gray-900 dark:text-white">Conclusion</h2>
              <p>
                By staying vigilant and knowing what to look for, you can protect yourself from phishing attacks. Remember: when in doubt, verify through official channels.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-[#1E1E2E]">
              <Link to="/app/knowledge">
                <Button variant="outline" className="text-gray-900 dark:text-white">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Knowledge Hub
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
