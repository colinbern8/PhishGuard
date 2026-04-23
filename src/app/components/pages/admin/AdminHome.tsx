import { Link } from "react-router";
import { BarChart3, FileText, MailWarning, Radar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";

export function AdminHome() {
  const items = [
    {
      title: "Simulated Phishing Campaigns",
      desc: "Create and manage simulation campaigns (UC-020).",
      icon: Radar,
      to: "/app/admin/simulations",
    },
    {
      title: "Analytics Dashboard",
      desc: "Prototype insights and exports (UC-021).",
      icon: BarChart3,
      to: "/app/admin/analytics",
    },
    {
      title: "Content Management",
      desc: "Create/publish training modules (UC-022).",
      icon: FileText,
      to: "/app/admin/content",
    },
    {
      title: "Incident Review Queue",
      desc: "Verify/reject phishing reports (UC-023).",
      icon: MailWarning,
      to: "/app/admin/incidents",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Console</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Prototype admin tools for missing use cases.
            </p>
          </div>
          <Link to="/app">
            <Button variant="outline">Back to App</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <Card key={i.to} className="bg-white dark:bg-[#12121A]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#1F4E78]" />
                    {i.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{i.desc}</p>
                  <Link to={i.to}>
                    <Button className="bg-[#1F4E78] hover:bg-[#2E75B6]">Open</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

