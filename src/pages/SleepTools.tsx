
import React, { useState, useEffect } from 'react';
import { Moon, ArrowRight, Music, Cloud, Leaf, Plus } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const SleepTools = () => {
  const [sleepPlaylist, setSleepPlaylist] = useState<string | null>(null);
  const [newPlaylistUrl, setNewPlaylistUrl] = useState('');
  const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch user's saved sleep playlist
  useEffect(() => {
    const fetchSleepPlaylist = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('sleep_tools')
          .select('playlist_url')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setSleepPlaylist(data.playlist_url);
        }
      } catch (error) {
        console.error('Error fetching sleep playlist:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSleepPlaylist();
  }, [user]);
  
  // Save new playlist URL
  const handleSavePlaylist = async () => {
    if (!user) {
      toast.error('You need to be logged in to save a playlist');
      return;
    }
    
    if (!newPlaylistUrl.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('sleep_tools')
        .upsert({ 
          user_id: user.id, 
          playlist_url: newPlaylistUrl.trim(),
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      setSleepPlaylist(newPlaylistUrl.trim());
      setIsAddingPlaylist(false);
      setNewPlaylistUrl('');
      toast.success('Your sleep playlist has been saved');
    } catch (error) {
      console.error('Error saving playlist:', error);
      toast.error('Failed to save playlist');
    }
  };
  
  // Handle external link open
  const handleOpenPlaylist = () => {
    if (sleepPlaylist) {
      window.open(sleepPlaylist, '_blank');
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
              Everything you need for better sleep and rest quality.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Wind-down Routine Card */}
              <GlassMorphicCard className="p-6">
                <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
                  <span className="bg-supernova-purple/20 p-2 rounded-lg mr-3">
                    <Moon size={20} className="text-supernova-purple" />
                  </span>
                  Wind-down Routine
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded border border-white/20 mr-3 flex-shrink-0"></div>
                    <span>Dim lights 1 hour before bed</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded border border-white/20 mr-3 flex-shrink-0"></div>
                    <span>Put away electronic devices</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded border border-white/20 mr-3 flex-shrink-0"></div>
                    <span>Read or meditate for 10 minutes</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded border border-white/20 mr-3 flex-shrink-0"></div>
                    <span>Keep bedroom cool and dark</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/sleep')}
                  className="w-full bg-supernova-purple hover:bg-supernova-purple/80"
                >
                  Track Your Sleep <ArrowRight size={16} className="ml-2" />
                </Button>
              </GlassMorphicCard>
              
              {/* Sleep Playlist Card */}
              <GlassMorphicCard className="p-6">
                <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
                  <span className="bg-supernova-blue/20 p-2 rounded-lg mr-3">
                    <Music size={20} className="text-supernova-blue" />
                  </span>
                  Your Sleep Playlist
                </h3>
                
                {isLoading ? (
                  <div className="py-6 text-center">
                    <p className="text-gray-400">Loading your playlist...</p>
                  </div>
                ) : isAddingPlaylist ? (
                  <div className="space-y-4 mb-6">
                    <Label htmlFor="playlist-url">Enter your playlist URL:</Label>
                    <Input
                      id="playlist-url"
                      value={newPlaylistUrl}
                      onChange={(e) => setNewPlaylistUrl(e.target.value)}
                      placeholder="https://open.spotify.com/playlist/..."
                      className="bg-white/5 border-white/10"
                    />
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleSavePlaylist}
                        className="bg-supernova-blue hover:bg-supernova-blue/80"
                      >
                        Save Playlist
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setIsAddingPlaylist(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : sleepPlaylist ? (
                  <div className="mb-6">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-4 break-all">
                      <p className="text-sm text-gray-300">{sleepPlaylist}</p>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleOpenPlaylist}
                        className="bg-supernova-blue hover:bg-supernova-blue/80"
                      >
                        Open Playlist
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setIsAddingPlaylist(true)}
                      >
                        Change Playlist
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-center mb-6">
                    <p className="text-gray-300 mb-4">No playlist saved yet</p>
                    <Button 
                      onClick={() => setIsAddingPlaylist(true)}
                      className="bg-supernova-blue hover:bg-supernova-blue/80"
                    >
                      <Plus size={16} className="mr-2" /> Add Your Playlist
                    </Button>
                  </div>
                )}
                
                {!isAddingPlaylist && (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-gray-400 text-sm">
                      <span className="text-supernova-blue">Tip:</span> You can add links from Spotify, YouTube, or any music service.
                    </p>
                  </div>
                )}
              </GlassMorphicCard>
            </div>
            
            {/* Calming Audio Suggestions */}
            <GlassMorphicCard className="p-6 mb-8">
              <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
                <span className="bg-supernova-gold/20 p-2 rounded-lg mr-3">
                  <Cloud size={20} className="text-supernova-gold" />
                </span>
                Calming Audio Suggestions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button 
                  onClick={() => toast.success("Playing: Calming Rainfall - 10 minutes")}
                  className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                >
                  <Cloud size={32} className="text-supernova-blue mb-2" />
                  <p className="text-lg font-medium">🌧️ Calming Rainfall</p>
                </button>
                
                <button 
                  onClick={() => toast.success("Playing: LoFi Sleep Music - 10 minutes")}
                  className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                >
                  <Music size={32} className="text-supernova-purple mb-2" />
                  <p className="text-lg font-medium">🎵 LoFi Sleep Music</p>
                </button>
                
                <button 
                  onClick={() => toast.success("Playing: Nature Night Sounds - 10 minutes")}
                  className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                >
                  <Leaf size={32} className="text-supernova-gold mb-2" />
                  <p className="text-lg font-medium">🍃 Nature Night Sounds</p>
                </button>
              </div>
            </GlassMorphicCard>
            
            {/* View Sleep Trends */}
            <GlassMorphicCard className="p-6">
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
                <span className="bg-supernova-pink/20 p-2 rounded-lg mr-3">
                  <ArrowRight size={20} className="text-supernova-pink" />
                </span>
                Sleep Trends
              </h3>
              <p className="text-gray-300 mb-6">
                View your sleep patterns over time to identify what helps you get better rest.
              </p>
              <Button 
                onClick={() => navigate('/weekly-summary')}
                className="w-full"
                variant="outline"
              >
                View Weekly Summary <ArrowRight size={16} className="ml-2" />
              </Button>
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SleepTools;
