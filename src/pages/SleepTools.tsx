
import React, { useState, useEffect } from 'react';
import { Moon, Music, FileAudio, Bed, ArrowRight, RefreshCw, Calendar } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PlaylistFormValues {
  playlistUrl: string;
}

const SleepTools = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const form = useForm<PlaylistFormValues>({
    defaultValues: {
      playlistUrl: '',
    },
  });

  // Fetch user's sleep playlist from wellness_entries table
  useEffect(() => {
    async function fetchPlaylist() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('wellness_entries')
          .select('value')
          .eq('user_id', user.id)
          .eq('type', 'sleep_playlist')
          .single();
        
        if (error) {
          console.error('Error fetching playlist:', error);
          return;
        }
        
        if (data?.value && typeof data.value === 'object') {
          const playlistData = data.value as Record<string, any>;
          setPlaylist(playlistData.url || null);
        }
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPlaylist();
  }, [user]);
  
  const onSubmit = async (values: PlaylistFormValues) => {
    if (!user) {
      toast.error("You must be logged in to save a playlist");
      return;
    }
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('wellness_entries')
        .upsert({
          user_id: user.id,
          type: 'sleep_playlist',
          value: { url: values.playlistUrl },
        }, {
          onConflict: 'user_id,type'
        });
      
      if (error) {
        toast.error("Failed to save playlist");
        console.error(error);
        return;
      }
      
      setPlaylist(values.playlistUrl);
      toast.success("Your sleep playlist has been saved");
      form.reset();
      
    } catch (error) {
      console.error('Error saving playlist:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemovePlaylist = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('wellness_entries')
        .delete()
        .eq('user_id', user.id)
        .eq('type', 'sleep_playlist');
      
      if (error) {
        toast.error("Failed to remove playlist");
        console.error(error);
        return;
      }
      
      setPlaylist(null);
      toast.success("Your sleep playlist has been removed");
      
    } catch (error) {
      console.error('Error removing playlist:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-purple/20 p-3 rounded-full mb-4">
              <Moon size={32} className="text-supernova-purple" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Sleep Tools</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Access resources and tools to improve your sleep quality and build better rest habits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <GlassMorphicCard className="p-6">
              <div className="flex items-center mb-4">
                <FileAudio className="text-supernova-blue mr-3" size={24} />
                <h2 className="text-xl font-display font-semibold">Your Sleep Playlist</h2>
              </div>
              
              {playlist ? (
                <div className="space-y-4">
                  <div className="p-4 bg-supernova-dark/50 rounded-lg break-all">
                    <p className="text-sm text-gray-300 mb-2">Your saved playlist:</p>
                    <a 
                      href={playlist} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-supernova-blue hover:underline"
                    >
                      {playlist}
                    </a>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => window.open(playlist, '_blank')}
                      className="flex-1 bg-supernova-purple hover:bg-supernova-purple/80"
                    >
                      <Music size={16} className="mr-2" /> Play Now
                    </Button>
                    <Button
                      onClick={handleRemovePlaylist}
                      variant="outline"
                      className="flex-1"
                    >
                      Remove Playlist
                    </Button>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="playlistUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Add your favorite calming playlist</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Paste Spotify, YouTube, or other music URL" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-supernova-purple hover:bg-supernova-purple/80"
                      disabled={loading}
                    >
                      {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Music className="mr-2 h-4 w-4" />}
                      Save Playlist
                    </Button>
                  </form>
                </Form>
              )}
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <div className="flex items-center mb-4">
                <Bed className="text-supernova-purple mr-3" size={24} />
                <h2 className="text-xl font-display font-semibold">Wind-down Routine</h2>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supernova-purple/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Dim the lights 30 minutes before bed</p>
                    <p className="text-sm text-gray-400">Signals to your body it's time to produce melatonin</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supernova-purple/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Stop screen time 1 hour before sleep</p>
                    <p className="text-sm text-gray-400">Blue light suppresses melatonin production</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supernova-purple/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Do a 5-minute breathing exercise</p>
                    <p className="text-sm text-gray-400">Try the 4-7-8 method: inhale for 4s, hold for 7s, exhale for 8s</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supernova-purple/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Keep your bedroom cool (65-68°F / 18-20°C)</p>
                    <p className="text-sm text-gray-400">Optimal temperature for quality sleep</p>
                  </div>
                </li>
              </ul>
            </GlassMorphicCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <GlassMorphicCard className="p-6">
              <div className="flex items-center mb-4">
                <Music className="text-supernova-gold mr-3" size={24} />
                <h2 className="text-xl font-display font-semibold">Calming Audio Suggestions</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Button variant="outline" className="flex justify-between items-center w-full p-4 h-auto">
                  <span className="flex items-center">
                    <FileAudio className="mr-2 text-supernova-blue" size={18} />
                    Gentle Rain Sounds (10 min)
                  </span>
                  <span className="text-xs bg-supernova-blue/20 text-supernova-blue px-2 py-1 rounded-full">
                    Popular
                  </span>
                </Button>
                
                <Button variant="outline" className="flex justify-between items-center w-full p-4 h-auto">
                  <span className="flex items-center">
                    <FileAudio className="mr-2 text-supernova-purple" size={18} />
                    Deep Sleep Meditation (15 min)
                  </span>
                  <span className="text-xs bg-supernova-purple/20 text-supernova-purple px-2 py-1 rounded-full">
                    New
                  </span>
                </Button>
                
                <Button variant="outline" className="flex justify-between items-center w-full p-4 h-auto">
                  <span className="flex items-center">
                    <FileAudio className="mr-2 text-supernova-pink" size={18} />
                    Ocean Waves (20 min)
                  </span>
                  <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full">
                    Relaxing
                  </span>
                </Button>
              </div>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="text-supernova-pink mr-3" size={24} />
                <h2 className="text-xl font-display font-semibold">Sleep Insights</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-300">
                  Track your sleep patterns to see personalized insights about your rest quality.
                </p>
                
                <div className="bg-supernova-dark/50 rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-2">Your recent sleep average:</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-display mr-2">7.2</span>
                    <span className="text-gray-400">hours per night</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => navigate('/sleep')}
                  className="w-full bg-supernova-gold/80 hover:bg-supernova-gold"
                >
                  <Bed size={16} className="mr-2" /> Log Tonight's Sleep
                </Button>
              </div>
            </GlassMorphicCard>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="px-8"
            >
              <ArrowRight size={16} className="mr-2" /> Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SleepTools;
