
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

// Import refactored components
import SleepProgress from '@/components/sleep/SleepProgress';
import SleepHourSelector from '@/components/sleep/SleepHourSelector';
import AudioOptions from '@/components/sleep/AudioOptions';
import AudioPlayback from '@/components/sleep/AudioPlayback';
import SleepFeedback from '@/components/sleep/SleepFeedback';

const Sleep = () => {
  const [sleepHours, setSleepHours] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAudioOptions, setShowAudioOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSleepSelection = (hours: string) => {
    setSleepHours(hours);
    setShowFeedback(true);
    
    // In a real app, this would be saved to a database
    toast.success("Sleep data recorded!");
  };
  
  const handleAudioSelection = (audio: string) => {
    setSelectedAudio(audio);
    setShowAudioOptions(false);
    
    // In a real app, this would trigger an audio player
    toast.success(`Playing: ${audio} - 10 minutes`);
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };

  const navigateToSleepTools = () => {
    navigate('/sleep-tools');
  };
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SleepProgress />
          
          <div className="max-w-3xl mx-auto">
            <GlassMorphicCard className="p-6">
              {!showFeedback ? (
                <SleepHourSelector onSelectHours={handleSleepSelection} />
              ) : showAudioOptions ? (
                <AudioOptions 
                  onSelectAudio={handleAudioSelection} 
                  onCancel={() => setShowAudioOptions(false)} 
                />
              ) : selectedAudio ? (
                <AudioPlayback 
                  selectedAudio={selectedAudio}
                  onFinish={handleFinish}
                  onAccessTools={navigateToSleepTools}
                />
              ) : (
                <SleepFeedback
                  sleepHours={sleepHours || ""}
                  onRequestAudio={() => setShowAudioOptions(true)}
                  onFinish={handleFinish}
                  onAccessTools={navigateToSleepTools}
                />
              )}
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sleep;
