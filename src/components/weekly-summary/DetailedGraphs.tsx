
import React from 'react';

interface DetailedGraphsProps {
  show: boolean;
}

const DetailedGraphs: React.FC<DetailedGraphsProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <h3 className="text-xl font-medium mb-4">Detailed Analytics</h3>
      
      {/* Additional detailed charts would go here */}
      <div className="p-6 bg-supernova-dark/50 border border-white/10 rounded-lg text-center">
        <p>Detailed analytics dashboard coming soon!</p>
      </div>
    </div>
  );
};

export default DetailedGraphs;
