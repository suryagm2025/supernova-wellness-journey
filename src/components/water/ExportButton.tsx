
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ 
  onClick, 
  isLoading 
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
    >
      <Download size={16} />
      {isLoading ? 'Exporting...' : 'Export CSV'}
    </Button>
  );
};

export default ExportButton;
