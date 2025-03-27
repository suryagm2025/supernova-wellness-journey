
import React, { useState, useEffect } from 'react';
import { FileAudio, ArrowRight } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SleepToolsHeader from '@/components/sleep/SleepToolsHeader';
import PlaylistManager from '@/components/sleep/PlaylistManager';
import WindDownRoutine from '@/components/sleep/WindDownRoutine';
import CalmingAudioSuggestions from '@/components/sleep/CalmingAudioSuggestions';
import SleepInsights from '@/components/sleep/SleepInsights';

const SleepTools = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
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
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SleepToolsHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <GlassMorphicCard className="p-6">
              <div className="flex items-center mb-4">
                <FileAudio className="text-supernova-blue mr-3" size={24} />
                <h2 className="text-xl font-display font-semibold">Your Sleep Playlist</h2>
              </div>
              
              <PlaylistManager 
                playlist={playlist}
                loading={loading}
                userId={user?.id}
                setPlaylist={setPlaylist}
                setLoading={setLoading}
              />
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <WindDownRoutine />
            </GlassMorphicCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <GlassMorphicCard className="p-6">
              <CalmingAudioSuggestions />
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <SleepInsights />
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
