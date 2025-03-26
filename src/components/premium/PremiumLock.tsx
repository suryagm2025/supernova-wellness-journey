
import React, { useState } from 'react';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface PremiumLockProps {
  featureName: string;
  description?: string;
}

const PremiumLock: React.FC<PremiumLockProps> = ({ featureName, description }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [upgradeError, setUpgradeError] = useState(false);

  const handleUpgradeClick = () => {
    // Simulated error for demonstration
    setUpgradeError(true);
    setTimeout(() => setUpgradeError(false), 3000);
  };

  return (
    <>
      <GlassMorphicCard className="p-6 border border-supernova-purple/30">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-supernova-purple/20">
            <Lock className="h-6 w-6 text-supernova-purple" />
          </div>
        </div>
        
        <h3 className="text-xl font-display text-center mb-3">🔒 Premium Feature</h3>
        <h4 className="text-lg font-medium text-center mb-4">{featureName}</h4>
        
        <p className="text-gray-300 text-center mb-6">
          {description || "This feature is part of the Premium Experience. Unlock advanced coaching, personalized insights, and guided challenges."}
        </p>
        
        <div className="flex flex-col space-y-3">
          <Button 
            variant="outline" 
            className="w-full bg-white/5 hover:bg-white/10"
            onClick={() => setPreviewOpen(true)}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Preview Features
          </Button>
          
          <Button 
            className="w-full bg-gradient-to-r from-supernova-purple to-supernova-pink hover:opacity-90"
            onClick={handleUpgradeClick}
          >
            Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {upgradeError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-center">
            Tap didn't register. Try again or reload the page. Still stuck? Contact support below.
          </div>
        )}
        
        <p className="text-gray-400 text-xs text-center mt-4">
          No credit card required for preview
        </p>
      </GlassMorphicCard>
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="bg-gray-900 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Premium Experience</DialogTitle>
            <DialogDescription>
              Preview the enhanced features available in our premium plan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-supernova-purple/20 shrink-0">
                <Sparkles className="h-4 w-4 text-supernova-purple" />
              </div>
              <div>
                <h4 className="font-medium text-white">Advanced AI Coaching</h4>
                <p className="text-gray-400 text-sm">Personalized guidance based on your wellness data</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-supernova-blue/20 shrink-0">
                <Sparkles className="h-4 w-4 text-supernova-blue" />
              </div>
              <div>
                <h4 className="font-medium text-white">Unlimited Journaling</h4>
                <p className="text-gray-400 text-sm">Deeper insights and unlimited entries with AI feedback</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-supernova-gold/20 shrink-0">
                <Sparkles className="h-4 w-4 text-supernova-gold" />
              </div>
              <div>
                <h4 className="font-medium text-white">Guided Challenges</h4>
                <p className="text-gray-400 text-sm">Week-long wellness programs tailored to your goals</p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-supernova-purple to-supernova-pink hover:opacity-90"
            onClick={handleUpgradeClick}
          >
            Upgrade to Premium
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PremiumLock;
