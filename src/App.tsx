
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate
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

function App() {
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>; // Or a more appropriate loading indicator
    }

    return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <RouterProvider 
        router={
          createBrowserRouter([
            {
              path: "/",
              element: <Home />
            },
            {
              path: "/dashboard",
              element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
              path: "/login",
              element: <Login />
            },
            {
              path: "/signup",
              element: <SignUp />
            },
            {
              path: "/account",
              element: <PrivateRoute><Account /></PrivateRoute>
            },
            {
              path: "/settings",
              element: <PrivateRoute><Settings /></PrivateRoute>
            },
            {
              path: "/check-in",
              element: <PrivateRoute><CheckIn /></PrivateRoute>
            },
            {
              path: "/water",
              element: <PrivateRoute><WaterIntake /></PrivateRoute>
            },
            {
              path: "/suggestions",
              element: <PrivateRoute><Suggestions /></PrivateRoute>
            },
            {
              path: "/reset-password",
              element: <ResetPassword />
            },
            {
              path: "/streak",
              element: <Streak />
            },
          ])
        } 
      />
    </AuthProvider>
  );
}

export default App;
