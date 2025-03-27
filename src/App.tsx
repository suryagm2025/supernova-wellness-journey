
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
  createRoutesFromElements,
  Outlet
} from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import Home from './pages/Home';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import SignUp from './pages/SignUp';
import Account from '@/pages/Account';
import Settings from '@/pages/Settings';
import CheckIn from '@/pages/CheckIn';
import WaterIntake from '@/pages/WaterIntake';
import Suggestions from '@/pages/Suggestions';
import ResetPassword from '@/pages/ResetPassword';
import Streak from '@/pages/Streak';
import EmotionCheck from '@/pages/EmotionCheck';
import FAQ from '@/pages/FAQ';
import Programs from '@/pages/Programs';
import Blog from '@/pages/Blog';
import NotFound from '@/pages/NotFound';
import TimelineDashboard from '@/pages/TimelineDashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import TermsOfUse from '@/pages/TermsOfUse';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import CookiePolicy from '@/pages/CookiePolicy';
import TimeBasedFlow from '@/components/timeflows/TimeBasedFlow';
import MorningCheckInPopup from '@/components/checkIn/MorningCheckInPopup';
import ForgotPassword from '@/pages/ForgotPassword';
import AuthCallback from '@/pages/AuthCallback';
import Onboarding from '@/pages/Onboarding';

// App Root component to wrap everything with AuthProvider
const AppRoot = () => {
  return (
    <AuthProvider>
      {/* Global time-based components */}
      <TimeBasedFlow />
      <MorningCheckInPopup />
      <Outlet />
    </AuthProvider>
  );
};

// Define public routes with Layout component
const PublicLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// Protected routes with Layout component
const ProtectedLayout = () => {
  return (
    <Layout>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </Layout>
  );
};

// Define routes using createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppRoot />}>
      {/* Public routes with Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/streak" element={<Streak />} />
        <Route path="/emotion-check" element={<EmotionCheck />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>
      
      {/* Special auth callback route without layout */}
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Protected routes with Layout */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timeline" element={<TimelineDashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/water" element={<WaterIntake />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Route>
      
      {/* Not found route */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
