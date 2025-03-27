
import React from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SleepFeedbackProps {
  sleepHours: string;
  onRequestAudio: () => void;
  onFinish: () => void;
  onAccessTools: () => void;
}

const SleepFeedback: React.FC<SleepFeedbackProps> = ({ 
  sleepHours, 
  onRequestAudio, 
  onFinish, 
  onAccessTools 
}) => {
  const lowSleep = sleepHours === "less-than-5" || sleepHours === "5-7";

  return (
    <div className="text-center py-6 animate-fade-in">
      {lowSleep ? (
        <>
          <h2 className="text-xl font-display font-semibold mb-4">
            Let's try a wind-down tip tonight.
          </h2>
          <p className="text-gray-300 mb-6">
            Would you like a calming bedtime audio suggestion?
          </p>
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={onRequestAudio}
              className="bg-supernova-purple hover:bg-supernova-purple/80"
            >
              Yes, suggest audio
            </Button>
            <Button 
              variant="outline"
              onClick={onFinish}
            >
              No thanks
            </Button>
            <Button
              onClick={onAccessTools}
              variant="link"
              className="text-supernova-blue"
            >
              <Wrench size={16} className="mr-2" /> Access Sleep Tools
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-display font-semibold mb-4">
            Nice! You're getting quality rest.
          </h2>
          <p className="text-gray-300 mb-6">
            Keep the streak going 💤
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
        </>
      )}
    </div>
  );
};

export default SleepFeedback;
