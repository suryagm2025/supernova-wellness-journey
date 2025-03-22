
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import WaterIntake from "./pages/WaterIntake";
import MealLog from "./pages/MealLog";
import Activity from "./pages/Activity";
import EveningCheck from "./pages/EveningCheck";
import Suggestions from "./pages/Suggestions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/water" element={<WaterIntake />} />
          <Route path="/meals" element={<MealLog />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/evening" element={<EveningCheck />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
