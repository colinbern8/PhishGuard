import { useNavigate } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../ui/button";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-8xl font-bold text-[#1F4E78] dark:text-blue-400 tracking-tight">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Oops! This page doesn&apos;t exist.
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          The link may be broken or the page may have been removed.
        </p>
        <Button
          onClick={() => navigate("/app")}
          className="mt-8 bg-[#1F4E78] hover:bg-[#2E75B6] text-white dark:bg-[#1F4E78] dark:hover:bg-[#2E75B6]"
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
