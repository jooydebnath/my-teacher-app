import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ThemeLanguageToggle from "@/components/ThemeLanguageToggle";
import Index from "./pages/Index.tsx";
import SubjectSelection from "./pages/SubjectSelection.tsx";
import ChapterList from "./pages/ChapterList.tsx";
import TopicList from "./pages/TopicList.tsx";
import TopicLearning from "./pages/TopicLearning.tsx";
import PracticeMode from "./pages/PracticeMode.tsx";
import Profile from "./pages/Profile.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import Bookmarks from "./pages/Bookmarks.tsx";
import NotFound from "./pages/NotFound.tsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.tsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview.tsx";
import DashboardStudents from "./pages/dashboard/DashboardStudents.tsx";
import DashboardContent from "./pages/dashboard/DashboardContent.tsx";
import DashboardAnalytics from "./pages/dashboard/DashboardAnalytics.tsx";
import DashboardLeaderboard from "./pages/dashboard/DashboardLeaderboard.tsx";
import DashboardSubscriptions from "./pages/dashboard/DashboardSubscriptions.tsx";
import DashboardReports from "./pages/dashboard/DashboardReports.tsx";
import DashboardSettings from "./pages/dashboard/DashboardSettings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ThemeLanguageToggle />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/subjects" element={<SubjectSelection />} />
              <Route path="/chapters/:subjectId" element={<ChapterList />} />
              <Route path="/topics/:subjectId/:chapterId" element={<TopicList />} />
              <Route path="/learn/:subjectId/:chapterId/:topicId" element={<TopicLearning />} />
              <Route path="/practice/:subjectId/:chapterId/:topicId" element={<PracticeMode />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/bookmarks" element={<Bookmarks />} />

              {/* Dashboard */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="students" element={<DashboardStudents />} />
                <Route path="content" element={<DashboardContent />} />
                <Route path="analytics" element={<DashboardAnalytics />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
