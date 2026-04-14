import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { LandingPage } from "./components/pages/LandingPage";
import { LoginPage } from "./components/pages/LoginPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { PasswordResetPage } from "./components/pages/PasswordResetPage";
import { Dashboard } from "./components/pages/Dashboard";
import { ProfilePage } from "./components/pages/ProfilePage";
import { TrainingCatalog } from "./components/pages/TrainingCatalog";
import { ModuleContent } from "./components/pages/ModuleContent";
import { QuizPage } from "./components/pages/QuizPage";
import { QuizResults } from "./components/pages/QuizResults";
import { ProgressTracking } from "./components/pages/ProgressTracking";
import { PhishingScanner } from "./components/pages/PhishingScanner";
import { ScanResults } from "./components/pages/ScanResults";
import { ScanHistory } from "./components/pages/ScanHistory";
import { LeaderboardPage } from "./components/pages/LeaderboardPage";
import { AchievementsPage } from "./components/pages/AchievementsPage";
import { WeeklyChallenges } from "./components/pages/WeeklyChallenges";
import { KnowledgeHub } from "./components/pages/KnowledgeHub";
import { ArticlePage } from "./components/pages/ArticlePage";
import { SearchResults } from "./components/pages/SearchResults";
import { ReportPhishing } from "./components/pages/ReportPhishing";
import { CommunityFeed } from "./components/pages/CommunityFeed";
import { CommunityForum } from "./components/pages/CommunityForum";
import { IncidentDetails } from "./components/pages/IncidentDetails";
import { PasswordChecker } from "./components/pages/PasswordChecker";
import { BreachChecker } from "./components/pages/BreachChecker";
import { URLExpander } from "./components/pages/URLExpander";
import { OnboardingWelcome } from "./components/pages/onboarding/Welcome";
import { OnboardingAssessment } from "./components/pages/onboarding/Assessment";
import { OnboardingLearningPath } from "./components/pages/onboarding/LearningPath";
import { OnboardingGoals } from "./components/pages/onboarding/Goals";
import { OnboardingIntroGamification } from "./components/pages/onboarding/IntroGamification";
import { NotFoundPage } from "./components/pages/NotFoundPage";

// OnboardingGuard: redirects already-onboarded users away from onboarding screens
function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const isComplete = localStorage.getItem("phishguard_onboarding_complete") === "true";
  if (isComplete) {
    return <Navigate to="/app" replace />;
  }
  return <>{children}</>;
}

// AppGuard: redirects users who haven't completed onboarding
function AppGuard({ children }: { children: React.ReactNode }) {
  const isComplete = localStorage.getItem("phishguard_onboarding_complete") === "true";
  if (!isComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/reset-password",
    element: <PasswordResetPage />,
  },
  {
    path: "/onboarding",
    element: (
      <OnboardingGuard>
        <OnboardingWelcome />
      </OnboardingGuard>
    ),
  },
  {
    path: "/onboarding/assessment",
    element: (
      <OnboardingGuard>
        <OnboardingAssessment />
      </OnboardingGuard>
    ),
  },
  {
    path: "/onboarding/path",
    element: (
      <OnboardingGuard>
        <OnboardingLearningPath />
      </OnboardingGuard>
    ),
  },
  {
    path: "/onboarding/goals",
    element: (
      <OnboardingGuard>
        <OnboardingGoals />
      </OnboardingGuard>
    ),
  },
  {
    path: "/onboarding/intro-gamification",
    element: (
      <OnboardingGuard>
        <OnboardingIntroGamification />
      </OnboardingGuard>
    ),
  },
  {
    path: "/app",
    element: (
      <AppGuard>
        <MainLayout />
      </AppGuard>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "training", element: <TrainingCatalog /> },
      { path: "training/:moduleId", element: <ModuleContent /> },
      { path: "training/:moduleId/quiz", element: <QuizPage /> },
      { path: "training/:moduleId/results", element: <QuizResults /> },
      { path: "progress", element: <ProgressTracking /> },
      { path: "scanner", element: <PhishingScanner /> },
      { path: "scanner/results", element: <ScanResults /> },
      { path: "scanner/history", element: <ScanHistory /> },
      { path: "leaderboard", element: <LeaderboardPage /> },
      { path: "achievements", element: <AchievementsPage /> },
      { path: "challenges", element: <WeeklyChallenges /> },
      { path: "knowledge", element: <KnowledgeHub /> },
      { path: "knowledge/search", element: <SearchResults /> },
      { path: "knowledge/:articleId", element: <ArticlePage /> },
      { path: "report", element: <ReportPhishing /> },
      { path: "community", element: <CommunityFeed /> },
      { path: "forum", element: <CommunityForum /> },
      { path: "community/:incidentId", element: <IncidentDetails /> },
      { path: "tools/password", element: <PasswordChecker /> },
      { path: "tools/breach", element: <BreachChecker /> },
      { path: "tools/url-expander", element: <URLExpander /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
], {
  basename: import.meta.env.BASE_URL,
});