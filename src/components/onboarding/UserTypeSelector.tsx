import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType, UserTypeOption } from '@/types/userTypes';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { User, Users, UserCog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const userTypeOptions: UserTypeOption[] = [
  {
    id: 'individual',
    label: 'Myself (Individual)',
    description: 'Track your personal wellness journey with daily check-ins and personalized suggestions',
    icon: 'user'
  },
  {
    id: 'coach',
    label: 'I\'m a Coach',
    description: 'Access coaching tools and manage multiple client wellness journeys',
    icon: 'user-cog'
  },
  {
    id: 'team',
    label: 'I\'m managing a Team or Group',
    description: 'Create wellness programs for your team or organization',
    icon: 'users'
  }
];

interface UserTypeSelectorProps {
  onUserTypeSelected?: (userType: UserType) => void;
  standalone?: boolean;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ 
  onUserTypeSelected,
  standalone = true 
}) => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectUserType = (userType: UserType) => {
    setSelectedType(userType);
  };

  const handleContinue = () => {
    if (!selectedType) {
      toast({
        title: "Please select an option",
        description: "Choose how you'll be using SuperiNova",
        variant: "destructive",
      });
      return;
    }

    // If callback provided, call it with selected type
    if (onUserTypeSelected) {
      onUserTypeSelected(selectedType);
      return;
    }

    // Otherwise handle routing based on user type
    localStorage.setItem('userType', selectedType);
    
    switch (selectedType) {
      case 'individual':
        navigate('/check-in');
        break;
      case 'coach':
        navigate('/coach-dashboard');
        break;
      case 'team':
        navigate('/team-overview');
        break;
      default:
        navigate('/dashboard');
    }

    toast({
      title: "Preferences saved!",
      description: "We've customized your experience based on your selection.",
    });
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return <User size={24} />;
      case 'user-cog':
        return <UserCog size={24} />;
      case 'users':
        return <Users size={24} />;
      default:
        return <User size={24} />;
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${standalone ? 'py-8' : ''}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold mb-2">Welcome to SuperiNova Wellness Journey!</h2>
        <p className="text-gray-400">Who are you using this for?</p>
      </div>

      <div className="space-y-4 mb-8">
        {userTypeOptions.map((option) => (
          <GlassMorphicCard 
            key={option.id}
            className={`p-4 cursor-pointer transition-all ${
              selectedType === option.id 
                ? 'ring-2 ring-supernova-blue' 
                : 'hover:bg-white/10'
            }`}
            onClick={() => handleSelectUserType(option.id)}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${
                selectedType === option.id 
                  ? 'bg-supernova-blue/20 text-supernova-blue' 
                  : 'bg-white/10 text-gray-300'
              }`}>
                {getIconComponent(option.icon)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{option.label}</h3>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
            </div>
          </GlassMorphicCard>
        ))}
      </div>

      <Button 
        onClick={handleContinue}
        disabled={!selectedType}
        className="w-full bg-supernova-blue hover:bg-supernova-blue/80"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );
};

export default UserTypeSelector;
