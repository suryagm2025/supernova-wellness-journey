
import React from 'react';
import { Music, FileAudio } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalmingAudioSuggestions: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default CalmingAudioSuggestions;
