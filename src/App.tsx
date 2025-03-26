
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

// Separate AuthCheck component that uses the useAuth hook
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

// App Root component to wrap everything with AuthProvider
const AppRoot = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

// Define routes using createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppRoot />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/streak" element={<Streak />} />
      <Route path="/emotion-check" element={<EmotionCheck />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<AuthCheck><Dashboard /></AuthCheck>} />
      <Route path="/account" element={<AuthCheck><Account /></AuthCheck>} />
      <Route path="/settings" element={<AuthCheck><Settings /></AuthCheck>} />
      <Route path="/check-in" element={<AuthCheck><CheckIn /></AuthCheck>} />
      <Route path="/water" element={<AuthCheck><WaterIntake /></AuthCheck>} />
      <Route path="/suggestions" element={<AuthCheck><Suggestions /></AuthCheck>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
