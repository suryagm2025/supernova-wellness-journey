
import React, { ReactNode, useState } from 'react';
import SuggestionCard from './SuggestionCard';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleItem = (item: string) => {
    if (completedItems.includes(item)) {
      setCompletedItems(completedItems.filter(i => i !== item));
    } else {
      setCompletedItems([...completedItems, item]);
      toast({
        title: "Item completed!",
        description: `You've completed: ${item}`,
        duration: 3000,
      });
    }
  };

  return (
    <SuggestionCard title={title} icon={icon} actionButton={actionButton}>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const isCompleted = completedItems.includes(item);
          return (
            <li 
              key={index} 
              className={cn(
                "flex items-center gap-3 p-2 rounded-md transition-colors",
                "hover:bg-white/5 cursor-pointer",
                isCompleted && "text-gray-500"
              )}
              onClick={() => toggleItem(item)}
            >
              {isCompleted ? (
                <Check size={16} className="text-supernova-blue flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 flex-shrink-0" /> // Empty spacer to maintain alignment
              )}
              <span className={cn(
                "text-sm",
                isCompleted && "line-through"
              )}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </SuggestionCard>
  );
};

export default ListSuggestionCard;
