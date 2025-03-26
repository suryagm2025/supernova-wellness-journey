
import React from 'react';
import { Spinner } from '@/components/ui/spinner';

interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  label,
  loadingLabel
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50 disabled:opacity-50"
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center">
          <Spinner size="sm" className="mr-2" />
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default SubmitButton;
