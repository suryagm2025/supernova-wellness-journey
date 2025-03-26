
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { useAIReflection } from '@/hooks/useAIReflection';

const MicroJournal: React.FC = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const { aiReflection, isSubmitting, submitJournalEntry } = useAIReflection();

  const handleSubmit = () => {
    submitJournalEntry(journalEntry);
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
