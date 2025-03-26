
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import TimeBasedFlow from "./components/timeflows/TimeBasedFlow";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CookiePolicy from "./pages/CookiePolicy";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <TimeBasedFlow />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfUse />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
            </Route>
            
            {/* Auth callback doesn't need the layout */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="checkin" element={<CheckIn />} />
                <Route path="water" element={<WaterIntake />} />
                <Route path="meals" element={<MealLog />} />
                <Route path="activity" element={<Activity />} />
                <Route path="evening" element={<EveningCheck />} />
                <Route path="suggestions" element={<Suggestions />} />
                <Route path="account" element={<Account />} />
                <Route path="settings" element={<Settings />} />
                <Route path="programs" element={<Programs />} />
                <Route path="blog" element={<Blog />} />
              </Route>
            </Route>
            
            {/* Fallback route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
