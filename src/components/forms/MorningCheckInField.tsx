
import React from 'react';
import { Mic } from 'lucide-react';

interface MorningCheckInFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onVoiceClick: () => void;
}

const MorningCheckInField: React.FC<MorningCheckInFieldProps> = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  onVoiceClick
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm text-gray-300 flex items-center">
          {icon}
          {label}
        </label>
        <button
          type="button"
          onClick={onVoiceClick}
          className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          aria-label={`Use voice input for ${label.toLowerCase()}`}
        >
          <Mic size={14} />
        </button>
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
      />
    </div>
  );
};

export default MorningCheckInField;
