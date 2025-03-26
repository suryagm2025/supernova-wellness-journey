
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Logo from '@/components/ui/Logo';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const [name, setName] = useState('Test User');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, { full_name: name });
      // Further handling in AuthContext
      toast.success('Account created! You can now log in');
      navigate('/login');
    } catch (error: any) {
      // Error handling in AuthContext
      toast.error(error.message || 'Error during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      // Redirection handled by Google OAuth flow
    } catch (error) {
      // Error handling done in AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-supernova-dark p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" withText={true} />
          </div>
          <h2 className="text-3xl font-display font-bold">Join SuperiNova AI</h2>
          <p className="text-gray-400 mt-2">Create your account to start your wellness journey</p>
        </div>
        
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-xl">Create Account</CardTitle>
            <CardDescription>Enter your details to sign up</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    autoComplete="name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    autoComplete="new-password"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full cosmic-glow-purple" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={handleGoogleSignup}
                type="button"
              >
                <img src="/google.svg" alt="Google" className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t border-white/10 pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-supernova-blue hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <p className="text-center text-xs text-gray-500">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-supernova-blue hover:underline">Terms of Use</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-supernova-blue hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
