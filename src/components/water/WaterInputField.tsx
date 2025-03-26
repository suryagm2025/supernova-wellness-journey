
import React from 'react';

interface WaterInputFieldProps {
  waterAmount: string;
  onWaterAmountChange: (amount: string) => void;
}

const WaterInputField: React.FC<WaterInputFieldProps> = ({
  waterAmount,
  onWaterAmountChange
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">
        How much water have you had?
      </label>
      <input
        type="text"
        value={waterAmount}
        onChange={(e) => onWaterAmountChange(e.target.value)}
        placeholder="e.g. 2 glasses or 500ml"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
      />
    </div>
  );
};

export default WaterInputField;
