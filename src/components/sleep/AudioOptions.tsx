
import React from 'react';
import { Cloud, Music, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioOptionsProps {
  onSelectAudio: (audio: string) => void;
  onCancel: () => void;
}

const AudioOptions: React.FC<AudioOptionsProps> = ({ onSelectAudio, onCancel }) => {
  return (
    <div className="text-center py-6 animate-fade-in">
      <h2 className="text-xl font-display font-semibold mb-4">
        Choose a calming audio to help you wind down:
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button 
          onClick={() => onSelectAudio("Calming Rainfall")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
        >
          <Cloud size={32} className="text-supernova-blue mb-2" />
          <p className="text-lg font-medium">🌧️ Calming Rainfall</p>
        </button>
        
        <button 
          onClick={() => onSelectAudio("LoFi Sleep Music")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
        >
          <Music size={32} className="text-supernova-purple mb-2" />
          <p className="text-lg font-medium">🎵 LoFi Sleep Music</p>
        </button>
        
        <button 
          onClick={() => onSelectAudio("Nature Night Sounds")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
        >
          <Leaf size={32} className="text-supernova-gold mb-2" />
          <p className="text-lg font-medium">🍃 Nature Night Sounds</p>
        </button>
      </div>
      
      <Button 
        variant="outline"
        onClick={onCancel}
      >
        No thanks
      </Button>
    </div>
  );
};

export default AudioOptions;
