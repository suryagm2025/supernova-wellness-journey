
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Spinner } from '@/components/ui/spinner';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback and extract the session
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error with auth callback:', error);
        navigate('/login');
        return;
      }
      
      // Redirect to dashboard on successful auth
      navigate('/dashboard');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-supernova-dark">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <h1 className="text-2xl font-display font-semibold mb-2">Finishing Authentication...</h1>
        <p className="text-gray-400">Please wait while we complete the process.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
