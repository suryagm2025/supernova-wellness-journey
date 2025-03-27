
import React from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlaybackProps {
  selectedAudio: string;
  onFinish: () => void;
  onAccessTools: () => void;
}

const AudioPlayback: React.FC<AudioPlaybackProps> = ({ selectedAudio, onFinish, onAccessTools }) => {
  return (
    <div className="text-center py-6 animate-fade-in">
      <h2 className="text-xl font-display font-semibold mb-4">
        Playing: {selectedAudio} - 10 minutes
      </h2>
      <p className="text-gray-300 mb-6">
        Find a comfortable position and relax as you listen.
      </p>
      <div className="space-y-4">
        <Button 
          onClick={onFinish}
          className="bg-supernova-purple hover:bg-supernova-purple/80 w-full"
        >
          Continue to Dashboard <ArrowRight size={16} className="ml-2" />
        </Button>
        <Button
          onClick={onAccessTools}
          variant="outline"
          className="w-full"
        >
          <Wrench size={16} className="mr-2" /> Access Sleep Tools
        </Button>
      </div>
    </div>
  );
};

export default AudioPlayback;
