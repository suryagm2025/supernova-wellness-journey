import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/suggestions"
              element={
                <PrivateRoute>
                  <Suggestions />
                </PrivateRoute>
              }
            />
            <Route
              path="/water"
              element={
                <PrivateRoute>
                  <WaterIntake />
                </PrivateRoute>
              }
            />
            <Route
              path="/emotion-check"
              element={
                <PrivateRoute>
                  <EmotionCheck />
                </PrivateRoute>
              }
            />
            <Route
              path="/evening-check"
              element={
                <PrivateRoute>
                  <EveningCheck />
                </PrivateRoute>
              }
            />
            <Route
              path="/activity"
              element={
                <PrivateRoute>
                  <Activity />
                </PrivateRoute>
              }
            />
            
            {/* Health Timeline Dashboard */}
            <Route path="/health-timeline" element={<HealthTimeline />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
};

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default App;
