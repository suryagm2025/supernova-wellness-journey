
import React, { useState } from 'react';
import { Music, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PlaylistFormValues {
  playlistUrl: string;
}

interface PlaylistManagerProps {
  playlist: string | null;
  loading: boolean;
  userId: string | undefined;
  setPlaylist: (url: string | null) => void;
  setLoading: (loading: boolean) => void;
}

const PlaylistManager: React.FC<PlaylistManagerProps> = ({ 
  playlist, 
  loading, 
  userId, 
  setPlaylist, 
  setLoading 
}) => {
  const form = useForm<PlaylistFormValues>({
    defaultValues: {
      playlistUrl: '',
    },
  });

  const onSubmit = async (values: PlaylistFormValues) => {
    if (!userId) {
      toast.error("You must be logged in to save a playlist");
      return;
    }
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('wellness_entries')
        .upsert({
          user_id: userId,
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
    if (!userId) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('wellness_entries')
        .delete()
        .eq('user_id', userId)
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
    <>
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
    </>
  );
};

export default PlaylistManager;
