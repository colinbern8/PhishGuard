import { Link } from 'react-router';
import { ThumbsUp, Shield, AlertTriangle, Mail, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { mockIncidents } from '../../lib/mockData';
import { useMemo, useState } from 'react';
import { listIncidentReports } from '../../lib/prototypeStorage';

export function CommunityFeed() {
  const [showAll, setShowAll] = useState(false);

  const incidents = useMemo(() => {
    const stored = listIncidentReports()
      .filter((r) => (showAll ? true : r.verified))
      .filter((r) => r.status === 'verified' || r.status === 'pending' || r.status === 'rejected')
      .map((r) => ({
        id: r.id,
        type: r.reportType,
        threatLevel: r.threatLevel,
        description: r.context?.slice(0, 80) || `Community report (${r.reportType})`,
        content: r.content,
        submittedBy: r.submittedBy,
        submittedDate: r.submittedDate,
        upvotes: r.upvotes,
        verified: r.verified,
        status: r.status === 'verified' ? 'verified' : r.status === 'rejected' ? 'false-report' : 'under-review',
        tags: r.tags ?? [],
      }));

    const base = showAll ? mockIncidents : mockIncidents.filter((i) => i.verified);
    // Prefer showing verified-only first when in verified mode
    return [...stored, ...base];
  }, [showAll]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community Threat Feed</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Real phishing attempts reported by our community</p>
          </div>
          <Link to="/app/report">
            <Button className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500">
              <Shield className="mr-2 h-4 w-4" />
              Report New Threat
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#1F4E78]">1,247</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Reports This Week</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600">892</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Verified Threats</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-orange-600">~15k</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Prevented Attacks</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={showAll ? "outline" : "default"}
            onClick={() => setShowAll((v) => !v)}
            className={showAll ? "" : "bg-green-600 hover:bg-green-700"}
          >
            {showAll ? "Showing: All reports" : "Showing: Verified only"}
          </Button>

          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Threat Levels</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Upvoted</SelectItem>
              <SelectItem value="dangerous">Most Dangerous</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {incidents.map((incident) => {
            const Icon = incident.type === 'email' ? Mail : incident.type === 'url' ? LinkIcon : MessageSquare;
            const threatColor = incident.threatLevel === 'high' ? 'red' : incident.threatLevel === 'medium' ? 'orange' : 'yellow';

            return (
              <Link key={incident.id} to={`/app/community/${incident.id}`}>
                <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`bg-${threatColor}-100 p-3 rounded-lg`}>
                        <Icon className={`h-6 w-6 text-${threatColor}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={
                            incident.threatLevel === 'high' ? 'destructive' :
                            incident.threatLevel === 'medium' ? 'secondary' :
                            'default'
                          }>
                            {incident.threatLevel.toUpperCase()} RISK
                          </Badge>
                          {incident.verified && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-[#1E1E2E] dark:text-green-400">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <span className="text-xs text-gray-400 dark:text-gray-500">{incident.type}</span>
                        </div>
                        <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{incident.description}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-mono bg-gray-50 dark:bg-[#12121A] p-2 rounded">
                          {incident.content.slice(0, 100)}...
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
                          <span>Reported by {incident.submittedBy}</span>
                          <span>•</span>
                          <span>{incident.submittedDate}</span>
                          <span>•</span>
                          <button className="flex items-center gap-1 hover:text-[#1F4E78] dark:hover:text-[#60A5FA]">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{incident.upvotes}</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {incident.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs bg-gray-100 dark:bg-[#1E1E2E] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#1E1E2E]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
