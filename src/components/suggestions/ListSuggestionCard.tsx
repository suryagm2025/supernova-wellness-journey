
import React, { ReactNode } from 'react';
import SuggestionCard from './SuggestionCard';

interface ListSuggestionCardProps {
  title: string;
  icon: ReactNode;
  items: string[];
  actionButton?: ReactNode;
}

const ListSuggestionCard: React.FC<ListSuggestionCardProps> = ({
  title,
  icon,
  items,
  actionButton
}) => {
  return (
    <SuggestionCard title={title} icon={icon} actionButton={actionButton}>
      <ul className="list-disc list-inside text-gray-400">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </SuggestionCard>
  );
};

export default ListSuggestionCard;
