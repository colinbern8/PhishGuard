import { useParams, Link } from 'react-router';
import { Mail, Link2, Users, Lock, Target, Smartphone, Shield, ChevronRight, CheckCircle2, Bookmark, Flag } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { mockModules } from '../../lib/mockData';
import { useState, useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

/** Wraps consecutive h4 + p in a card div for numbered sections (presentation only). */
function wrapNumberedSections(html: string): string {
  return html.replace(
    /<h4>([^<]*)<\/h4>\s*<p>([\s\S]*?)<\/p>/g,
    (_, title, desc) =>
      `<div class="numbered-card bg-gray-800/50 dark:bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700"><div class="font-semibold text-white">${title}</div><p class="text-gray-300 text-sm leading-6 mt-1">${desc}</p></div>`
  );
}

const moduleIconMap: Record<string, { icon: React.ElementType; bg: string; color: string }> = {
  "1": { icon: Mail, bg: "bg-blue-100 dark:bg-blue-900/40", color: "text-blue-600 dark:text-blue-400" },
  "2": { icon: Link2, bg: "bg-purple-100 dark:bg-purple-900/40", color: "text-purple-600 dark:text-purple-400" },
  "3": { icon: Users, bg: "bg-orange-100 dark:bg-orange-900/40", color: "text-orange-600 dark:text-orange-400" },
  "4": { icon: Lock, bg: "bg-green-100 dark:bg-green-900/40", color: "text-green-600 dark:text-green-400" },
  "5": { icon: Target, bg: "bg-red-100 dark:bg-red-900/40", color: "text-red-600 dark:text-red-400" },
  "6": { icon: Smartphone, bg: "bg-teal-100 dark:bg-teal-900/40", color: "text-teal-600 dark:text-teal-400" },
};
const defaultIcon = { icon: Shield, bg: "bg-gray-100 dark:bg-gray-800", color: "text-gray-500" };

const BOOKMARK_KEY = (moduleId: string, sectionIndex: number) =>
  `phishguard_bookmark_${moduleId}_${sectionIndex}`;
const PROGRESS_KEY = (moduleId: string) => `phishguard_progress_${moduleId}`;
const MODULE_COMPLETE_KEY = (moduleId: string) => `phishguard_module_complete_${moduleId}`;

export function ModuleContent() {
  const { moduleId } = useParams();
  const module = mockModules.find(m => m.id === moduleId);
  const [currentSection, setCurrentSection] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const moduleCompleteToastShown = useRef(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (moduleId == null) return;
    try {
      const key = PROGRESS_KEY(moduleId);
      const stored = localStorage.getItem(key);
      if (stored) {
        const arr = JSON.parse(stored) as number[];
        if (Array.isArray(arr)) setCompletedSections(new Set(arr));
      }
    } catch {
      // ignore invalid stored data
    }
  }, [moduleId]);

  // Persist progress to localStorage whenever completedSections changes
  useEffect(() => {
    if (moduleId == null) return;
    const key = PROGRESS_KEY(moduleId);
    localStorage.setItem(key, JSON.stringify([...completedSections]));
  }, [moduleId, completedSections]);

  useEffect(() => {
    if (moduleId == null) return;
    const key = BOOKMARK_KEY(moduleId, currentSection);
    const stored = localStorage.getItem(key);
    setIsBookmarked(stored === 'true');
  }, [moduleId, currentSection]);

  const handleBookmarkClick = () => {
    if (moduleId == null) return;
    const next = !isBookmarked;
    setIsBookmarked(next);
    const key = BOOKMARK_KEY(moduleId, currentSection);
    if (next) {
      localStorage.setItem(key, 'true');
      toast.success('Section bookmarked!');
    } else {
      localStorage.removeItem(key);
      toast('Bookmark removed');
    }
  };

  const handleFlagClick = () => {
    const next = !isFlagged;
    setIsFlagged(next);
    if (next) {
      toast.warning('Section flagged for review. Thanks for the feedback!');
    } else {
      toast('Flag removed');
    }
  };

  if (!module) {
    return <div className="p-8">Module not found</div>;
  }

  const totalSections = module.sections.length;
  const progressPercent = Math.round((completedSections.size / totalSections) * 100);

  const handleNextSection = () => {
    setCompletedSections(prev => new Set(prev).add(currentSection));
    setCurrentSection(currentSection + 1);
  };

  const handleMarkComplete = () => {
    if (completedSections.has(currentSection)) return;
    setCompletedSections(prev => new Set(prev).add(currentSection));
    toast.success('Section complete! Keep going 🎉');
  };

  // Module completion: toast once and persist
  useEffect(() => {
    if (moduleId == null || totalSections === 0) return;
    if (completedSections.size !== totalSections) return;
    if (moduleCompleteToastShown.current) return;
    moduleCompleteToastShown.current = true;
    localStorage.setItem(MODULE_COMPLETE_KEY(moduleId), 'true');
    toast.success('Module complete! Ready for the quiz? 🏆');
  }, [moduleId, totalSections, completedSections.size]);

  const section = module.sections[currentSection];
  const processedContent = useMemo(
    () => wrapNumberedSections(section.content),
    [section.content]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/app/training">Training</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{module.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Module Outline */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">Module Outline</h3>
                <Progress value={progressPercent} className="h-2 mb-4" />
                <p className="text-sm text-gray-600 mb-4">{progressPercent}% Complete</p>
                
                <div className="space-y-2">
                  {module.sections.map((sec, idx) => (
                    <button
                      key={sec.id}
                      onClick={() => setCurrentSection(idx)}
                      className={`w-full text-left p-2 rounded-lg flex items-center gap-2 transition-colors ${
                        currentSection === idx 
                          ? 'bg-[#1F4E78] text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {completedSections.has(idx) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500 flex-shrink-0" />
                      ) : currentSection === idx ? (
                        <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-500 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0" />
                      )}
                      <span className="text-sm">{sec.title}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Link to={`/app/training/${moduleId}/quiz`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Take Quiz
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    {(() => {
                      const match = moduleIconMap[module.id] ?? defaultIcon;
                      const IconComponent = match.icon;
                      return (
                        <div className={`w-16 h-16 rounded-xl ${match.bg} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-8 h-8 ${match.color}`} strokeWidth={1.5} />
                        </div>
                      );
                    })()}
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{section.title}</h1>
                      <p className="text-sm text-gray-500">
                        Section {currentSection + 1} of {module.sections.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-700 rounded p-1 transition-colors"
                      onClick={handleBookmarkClick}
                    >
                      <Bookmark
                        className={`h-5 w-5 ${isBookmarked ? 'fill-current text-yellow-400' : ''}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-700 rounded p-1 transition-colors"
                      onClick={handleFlagClick}
                    >
                      <Flag
                        className={`h-5 w-5 ${isFlagged ? 'text-red-400 fill-current' : ''}`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Content Area */}
                <div 
                  className="max-w-3xl px-8 py-6 space-y-2 prose prose-lg dark:prose-invert
                    prose-h2:text-xl prose-h2:font-semibold prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-3 prose-h2:my-6 prose-h2:dark:text-white prose-h2:first:mt-0 prose-h2:mt-8
                    prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:dark:text-white
                    prose-h4:text-base prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3 prose-h4:dark:text-white
                    prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-p:leading-7 prose-p:mb-4 prose-p:text-base
                    prose-ul:my-6 prose-ul:space-y-0 prose-ul:dark:text-gray-300 [&_ul]:list-none [&_ul]:pl-0
                    [&_ul_li]:flex [&_ul_li]:gap-3 [&_ul_li]:items-start [&_ul_li]:mb-3 [&_ul_li]:relative [&_ul_li]:pl-6 [&_ul_li]:before:content-['•'] [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:text-blue-400
                    [&_ul_li_strong]:text-blue-400 [&_ul_li_strong]:dark:text-blue-400
                    prose-ol:my-6 prose-ol:space-y-3 prose-ol:dark:text-gray-300
                    prose-li:text-gray-700 prose-li:dark:text-gray-300 prose-li:leading-7 prose-li:text-base
                    prose-strong:text-gray-900 prose-strong:dark:text-white prose-strong:font-semibold
                    prose-pre:bg-gray-100 prose-pre:dark:bg-gray-800 prose-pre:p-5 prose-pre:rounded-lg 
                    prose-pre:text-sm prose-pre:dark:text-gray-300 prose-pre:my-6 prose-pre:leading-relaxed
                    [&_.info-box]:bg-blue-50 [&_.info-box]:dark:bg-blue-900/20 
                    [&_.info-box]:border-l-4 [&_.info-box]:border-blue-500 
                    [&_.info-box]:p-6 [&_.info-box]:my-8 [&_.info-box]:rounded-r [&_.info-box]:shadow-sm
                    [&_.info-box_p]:text-blue-900 [&_.info-box_p]:dark:text-blue-200 [&_.info-box_p]:mb-0 [&_.info-box_p]:text-base [&_.info-box_p]:leading-relaxed
                    [&_.info-box_strong]:text-blue-900 [&_.info-box_strong]:dark:text-blue-100
                    [&_.warning-box]:bg-red-50 [&_.warning-box]:dark:bg-red-900/20 
                    [&_.warning-box]:border-l-4 [&_.warning-box]:border-red-500 
                    [&_.warning-box]:p-6 [&_.warning-box]:my-8 [&_.warning-box]:rounded-r [&_.warning-box]:shadow-sm
                    [&_.warning-box_p]:text-red-900 [&_.warning-box_p]:dark:text-red-200 [&_.warning-box_p]:mb-0 [&_.warning-box_p]:text-base [&_.warning-box_p]:leading-relaxed
                    [&_.warning-box_strong]:text-red-900 [&_.warning-box_strong]:dark:text-red-100
                    [&_.example-box]:bg-gray-100 [&_.example-box]:dark:bg-gray-800 
                    [&_.example-box]:p-6 [&_.example-box]:my-8 [&_.example-box]:rounded-lg 
                    [&_.example-box]:border [&_.example-box]:border-gray-300 [&_.example-box]:dark:border-gray-700 [&_.example-box]:shadow-sm
                    [&_.example-box_p]:text-gray-800 [&_.example-box_p]:dark:text-gray-200 [&_.example-box_p]:mb-3 [&_.example-box_p]:last:mb-0 [&_.example-box_p]:leading-relaxed
                    [&_.example-box_strong]:text-gray-900 [&_.example-box_strong]:dark:text-white"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />

                {/* Mark as Complete */}
                <div className="mt-6">
                  {completedSections.has(currentSection) ? (
                    <button
                      type="button"
                      className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium cursor-default"
                    >
                      ✓ Completed
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleMarkComplete}
                      className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    >
                      ✓ Mark as Complete
                    </button>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    Previous Section
                  </Button>
                  
                  {currentSection < module.sections.length - 1 ? (
                    <Button
                      className="bg-[#1F4E78] hover:bg-[#2E75B6]"
                      onClick={handleNextSection}
                    >
                      Next Section
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Link to={`/app/training/${moduleId}/quiz`}>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Take Quiz
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                    Report an issue with this content
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}