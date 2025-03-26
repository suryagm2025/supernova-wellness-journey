
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

const AI_REFLECTIONS = {
  drained: "It's okay to slow down. Rest is productive too. Be kind to yourself today.",
  tired: "Your body is sending a message. Perhaps it needs some care and attention today.",
  anxious: "Remember to breathe and ground yourself. This feeling is temporary and you have the tools to navigate it.",
  happy: "What a wonderful energy to carry! Notice what brought you joy today and see if you can cultivate more of it.",
  excited: "That enthusiasm is powerful! Channel it into something meaningful that lights you up.",
  confused: "Clarity will come with time. Be patient with yourself as you navigate through the uncertainty.",
  default: "Thank you for sharing. Your feelings are valid, and acknowledging them is an important step in your wellness journey."
};

const MicroJournal: React.FC = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [aiReflection, setAiReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const generateReflection = (entry: string) => {
    const lowerEntry = entry.toLowerCase();
    
    // Simple keyword matching for demo purposes
    if (lowerEntry.includes('drained') || lowerEntry.includes('exhausted')) {
      return AI_REFLECTIONS.drained;
    } else if (lowerEntry.includes('tired') || lowerEntry.includes('sleepy')) {
      return AI_REFLECTIONS.tired;
    } else if (lowerEntry.includes('anxious') || lowerEntry.includes('worry') || lowerEntry.includes('stressed')) {
      return AI_REFLECTIONS.anxious;
    } else if (lowerEntry.includes('happy') || lowerEntry.includes('joy') || lowerEntry.includes('good')) {
      return AI_REFLECTIONS.happy;
    } else if (lowerEntry.includes('excited') || lowerEntry.includes('eager')) {
      return AI_REFLECTIONS.excited;
    } else if (lowerEntry.includes('confused') || lowerEntry.includes('unsure')) {
      return AI_REFLECTIONS.confused;
    } else {
      return AI_REFLECTIONS.default;
    }
  };

  const handleSubmit = () => {
    if (!journalEntry.trim()) {
      toast({
        title: "Empty journal entry",
        description: "A few words go a long way. Want to share just one feeling or thought?",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const reflection = generateReflection(journalEntry);
      setAiReflection(reflection);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <GlassMorphicCard className="p-6">
      <h2 className="text-xl font-display font-semibold mb-4">Micro-Journal</h2>
      <p className="text-gray-400 mb-4">In one sentence, how are you feeling or what's on your mind?</p>
      
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Share a quick thought..."
            className="bg-white/5 border-white/10 text-white resize-none min-h-[80px]"
          />
          <Button 
            size="sm"
            className="absolute bottom-2 right-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Send size={16} />
          </Button>
        </div>
        
        {aiReflection && (
          <div className="animate-fade-in mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gray-300">{aiReflection}</p>
          </div>
        )}
      </div>
    </GlassMorphicCard>
  );
};

export default MicroJournal;
