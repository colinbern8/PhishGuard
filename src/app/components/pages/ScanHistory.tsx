import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Link as LinkIcon, Download, Trash2, Eye, Scan } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EmptyState } from '../ui/empty-state';
import { toast } from 'sonner';

const mockScanHistory = [
  { id: 1, type: 'Email', date: '2026-02-17', riskLevel: 'High Risk', preview: 'Suspicious PayPal verification email', score: 89 },
  { id: 2, type: 'URL', date: '2026-02-16', riskLevel: 'Safe', preview: 'https://bit.ly/3xK9mPQ → google.com', score: 5 },
  { id: 3, type: 'Email', date: '2026-02-15', riskLevel: 'Suspicious', preview: 'IRS refund notification email', score: 62 },
  { id: 4, type: 'URL', date: '2026-02-14', riskLevel: 'High Risk', preview: 'http://paypa1-secure.net/login', score: 95 },
  { id: 5, type: 'Email', date: '2026-02-13', riskLevel: 'Safe', preview: 'Newsletter from trusted sender', score: 12 },
];

type ScanType = 'All' | 'Email' | 'URL';
type RiskLevel = 'All' | 'Safe' | 'Suspicious' | 'High Risk';

export function ScanHistory() {
  const navigate = useNavigate();
  const [scans, setScans] = useState(mockScanHistory);
  const [scanTypeFilter, setScanTypeFilter] = useState<ScanType>('All');
  const [riskLevelFilter, setRiskLevelFilter] = useState<RiskLevel>('All');

  const filteredScans = useMemo(() => {
    return scans.filter(scan => {
      const typeMatch = scanTypeFilter === 'All' || scan.type === scanTypeFilter;
      const riskMatch = riskLevelFilter === 'All' || scan.riskLevel === riskLevelFilter;
      return typeMatch && riskMatch;
    });
  }, [scans, scanTypeFilter, riskLevelFilter]);

  const handleDelete = (id: number) => {
    setScans(prev => prev.filter(scan => scan.id !== id));
    toast('Scan deleted from history');
  };

  const handleExport = () => {
    toast('Export feature coming soon!');
  };

  const handleViewDetails = () => {
    navigate('/app/scanner/results');
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    if (riskLevel === 'Safe') return 'default';
    if (riskLevel === 'Suspicious') return 'secondary';
    return 'destructive';
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    if (riskLevel === 'Safe') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    if (riskLevel === 'Suspicious') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Scan History</h1>
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export History
          </Button>
        </div>

        {/* Filter Bar */}
        <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Scan Type Filter - Pills */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Type:</span>
                <div className="flex gap-2">
                  {(['All', 'Email', 'URL'] as ScanType[]).map((type) => (
                    <Button
                      key={type}
                      variant={scanTypeFilter === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setScanTypeFilter(type)}
                      className={
                        scanTypeFilter === type
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white dark:bg-[#12121A] hover:bg-gray-50 dark:hover:bg-[#1E1E2E]'
                      }
                    >
                      {type === 'Email' && <Mail className="h-3 w-3 mr-1" />}
                      {type === 'URL' && <LinkIcon className="h-3 w-3 mr-1" />}
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Risk Level Filter - Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Risk Level:</span>
                <Select value={riskLevelFilter} onValueChange={(value) => setRiskLevelFilter(value as RiskLevel)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Risk Levels</SelectItem>
                    <SelectItem value="Safe">Safe</SelectItem>
                    <SelectItem value="Suspicious">Suspicious</SelectItem>
                    <SelectItem value="High Risk">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan List */}
        {filteredScans.length === 0 ? (
          <Card className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E]">
            <CardContent>
              {scans.length === 0 ? (
                <EmptyState
                  icon={Scan}
                  title="No scan history yet"
                  description="Start scanning emails and URLs to build your security history and track potential threats."
                  actionLabel="Scan Now"
                  onAction={() => navigate('/app/scanner')}
                />
              ) : (
                <EmptyState
                  icon={Scan}
                  title="No scans match your filters"
                  description="Try adjusting your filters to see more results."
                />
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredScans.map((scan) => (
              <Card 
                key={scan.id} 
                className="bg-white dark:bg-[#12121A] border border-gray-200 dark:border-[#1E1E2E] hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge 
                          variant="outline" 
                          className="flex items-center gap-1 shrink-0"
                        >
                          {scan.type === 'Email' ? (
                            <Mail className="h-3 w-3" />
                          ) : (
                            <LinkIcon className="h-3 w-3" />
                          )}
                          {scan.type}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {scan.date}
                        </span>
                        <Badge 
                          className={`${getRiskBadgeColor(scan.riskLevel)} shrink-0`}
                        >
                          {scan.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-mono truncate">
                        {scan.preview}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Risk Score: <span className="font-semibold">{scan.score}/100</span>
                        </span>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleViewDetails}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(scan.id)}
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
