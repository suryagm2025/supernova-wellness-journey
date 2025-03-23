
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import WaterIntake from "./pages/WaterIntake";
import MealLog from "./pages/MealLog";
import Activity from "./pages/Activity";
import EveningCheck from "./pages/EveningCheck";
import Suggestions from "./pages/Suggestions";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Programs from "./pages/Programs";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/checkin" element={<Layout><CheckIn /></Layout>} />
          <Route path="/water" element={<Layout><WaterIntake /></Layout>} />
          <Route path="/meals" element={<Layout><MealLog /></Layout>} />
          <Route path="/activity" element={<Layout><Activity /></Layout>} />
          <Route path="/evening" element={<Layout><EveningCheck /></Layout>} />
          <Route path="/suggestions" element={<Layout><Suggestions /></Layout>} />
          <Route path="/account" element={<Layout><Account /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/programs" element={<Layout><Programs /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
