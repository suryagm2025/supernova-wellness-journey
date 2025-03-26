
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

// Define routes using createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppRoot />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/signup" element={<Layout><SignUp /></Layout>} />
      <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
      <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
      <Route path="/streak" element={<Layout><Streak /></Layout>} />
      <Route path="/emotion-check" element={<Layout><EmotionCheck /></Layout>} />
      <Route path="/faq" element={<Layout><FAQ /></Layout>} />
      <Route path="/programs" element={<Layout><Programs /></Layout>} />
      <Route path="/blog" element={<Layout><Blog /></Layout>} />
      <Route path="/terms" element={<Layout><TermsOfUse /></Layout>} />
      <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
      <Route path="/cookie-policy" element={<Layout><CookiePolicy /></Layout>} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
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
