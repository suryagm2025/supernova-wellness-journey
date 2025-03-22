
import React from 'react';
import { MoonStar, Sun } from 'lucide-react';
import { toast } from 'sonner';

interface EveningModeToggleProps {
  isEveningMode: boolean;
  setIsEveningMode: (value: boolean) => void;
}

const EveningModeToggle: React.FC<EveningModeToggleProps> = ({
  isEveningMode,
  setIsEveningMode
}) => {
  const toggleEveningMode = () => {
    setIsEveningMode(!isEveningMode);
    toast.info(`Evening mode ${isEveningMode ? 'disabled' : 'enabled'}`);
  };

  return (
    <button
      onClick={toggleEveningMode}
      className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-4 py-2 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50 flex items-center justify-center"
    >
      {isEveningMode ? (
        <>
          <Sun size={16} className="mr-2" /> Disable Evening Mode
        </>
      ) : (
        <>
          <MoonStar size={16} className="mr-2" /> Enable Evening Mode
        </>
      )}
    </button>
  );
};

export default EveningModeToggle;
