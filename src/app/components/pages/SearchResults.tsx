import { Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

export function SearchResults() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input defaultValue="phishing" placeholder="Search..." className="pl-10" />
          </div>
          <p className="text-sm text-gray-600 mt-2">42 results found in 0.3s</p>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Badge className="mb-2">Email Security</Badge>
                <h3 className="text-xl font-bold mb-2">Understanding <mark className="bg-yellow-200">Phishing</mark> Attacks</h3>
                <p className="text-sm text-gray-600">
                  Learn about <mark className="bg-yellow-200">phishing</mark> tactics and how to protect yourself from email-based threats...
                </p>
                <p className="text-xs text-gray-500 mt-2">5 min read • Dr. Sarah Chen</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
