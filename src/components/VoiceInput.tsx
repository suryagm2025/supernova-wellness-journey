
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  placeholder?: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscript, 
  placeholder = "Click the microphone to start speaking" 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const isSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    setSpeechRecognitionSupported(isSupported);
  }, []);

  const toggleListening = () => {
    if (!speechRecognitionSupported) return;
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    setIsLoading(true);
    setTranscript('');

    // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsLoading(false);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const currentTranscript = event.results[current][0].transcript;
      setTranscript(currentTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript) {
        onTranscript(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setIsLoading(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
  };

  if (!speechRecognitionSupported) {
    return (
      <div className="flex items-center space-x-2 text-gray-400 text-sm">
        <MicOff size={16} />
        <span>Voice input not supported in this browser</span>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center space-x-2 text-gray-200">
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full transition-colors flex items-center justify-center ${
            isListening 
              ? 'bg-supernova-red/20 text-supernova-red animate-pulse' 
              : 'bg-white/5 hover:bg-white/10 text-gray-300'
          }`}
          disabled={isLoading}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isLoading ? (
            <Loader size={24} className="animate-spin" />
          ) : isListening ? (
            <MicOff size={24} />
          ) : (
            <Mic size={24} />
          )}
        </button>
        
        <div className="w-full">
          {transcript ? (
            <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
              {transcript}
            </div>
          ) : (
            <div className="px-3 py-2 text-gray-400 text-sm">
              {isListening ? "Listening..." : placeholder}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;
