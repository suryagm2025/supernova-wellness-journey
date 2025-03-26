
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const AI_REFLECTIONS = {
  drained: "It's okay to slow down. Rest is productive too. Be kind to yourself today.",
  tired: "Your body is sending a message. Perhaps it needs some care and attention today.",
  anxious: "Remember to breathe and ground yourself. This feeling is temporary and you have the tools to navigate it.",
  happy: "What a wonderful energy to carry! Notice what brought you joy today and see if you can cultivate more of it.",
  excited: "That enthusiasm is powerful! Channel it into something meaningful that lights you up.",
  confused: "Clarity will come with time. Be patient with yourself as you navigate through the uncertainty.",
  default: "Thank you for sharing. Your feelings are valid, and acknowledging them is an important step in your wellness journey."
};

export function useAIReflection() {
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

  const submitJournalEntry = (journalEntry: string) => {
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

  return {
    aiReflection,
    isSubmitting,
    submitJournalEntry
  };
}
