import { AlertTriangle } from 'lucide-react';

export function ApiNotice({ api }: { api: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-2 text-sm text-yellow-400">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span>
          <strong>{api}</strong> is currently using cached data. Results may not reflect the latest threat intelligence.
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        This is a demo platform. In production, live API data would be used.
      </p>
    </div>
  );
}
