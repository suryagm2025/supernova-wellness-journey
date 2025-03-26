
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Suggestions from './pages/Suggestions';
import WaterIntake from './pages/WaterIntake';
import EmotionCheck from './pages/EmotionCheck';
import EveningCheck from './pages/EveningCheck';
import Activity from './pages/Activity';
import Layout from './components/layout/Layout';
import { Toaster } from 'sonner';
import { supabase } from './integrations/supabase/client';
import HealthTimeline from "./pages/HealthTimeline";
import VoiceCompanion from "./pages/VoiceCompanion";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthCallback from './pages/AuthCallback';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/water" element={<WaterIntake />} />
              <Route path="/emotion-check" element={<EmotionCheck />} />
              <Route path="/evening-check" element={<EveningCheck />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/health-timeline" element={<HealthTimeline />} />
              <Route path="/voice-companion" element={<VoiceCompanion />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
