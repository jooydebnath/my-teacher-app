import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
