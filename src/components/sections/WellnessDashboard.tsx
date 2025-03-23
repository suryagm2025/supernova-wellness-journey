
import React from 'react';
import { 
  Sunrise, 
  Droplet, 
  Brain, 
  CircleUser, 
  Salad, 
  Footprints, 
  Moon, 
  BookOpen, 
  Bed 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import GlassMorphicCard from '../ui/GlassMorphicCard';

interface DashboardBlockProps {
  icon: React.ReactNode;
  title: string;
  value?: string | number;
  progress?: number;
  children?: React.ReactNode;
}

const DashboardBlock: React.FC<DashboardBlockProps> = ({ 
  icon, 
  title, 
  value, 
  progress, 
  children 
}) => {
  return (
    <GlassMorphicCard className="p-4 h-full">
      <div className="flex items-start">
        <div className="p-2 rounded-lg bg-white/10 mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-400 mb-1">{title}</h4>
          {value && (
            <div className="text-lg font-display text-white mb-2">{value}</div>
          )}
          {progress !== undefined && (
            <Progress value={progress} className="h-2 mb-2" />
          )}
          {children}
        </div>
      </div>
    </GlassMorphicCard>
  );
};

const WellnessDashboard: React.FC = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4">
            Daily Wellness <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Track your wellness journey across morning, midday, and evening activities.
          </p>
        </div>
        
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Morning Section */}
          <div className="animate-fade-in">
            <div className="flex items-center mb-4">
              <Sunrise className="text-supernova-blue mr-2" size={20} />
              <h3 className="text-xl font-display">Morning</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DashboardBlock 
                icon={<Brain className="text-supernova-blue" size={18} />} 
                title="Mindfulness" 
                value="10 min"
                progress={75}
              />
              <DashboardBlock 
                icon={<Droplet className="text-supernova-blue" size={18} />} 
                title="Water Intake" 
                value="500 ml"
                progress={30}
              />
              <DashboardBlock 
                icon={<CircleUser className="text-supernova-blue" size={18} />} 
                title="Wake Time" 
                value="6:30 AM"
              />
            </div>
          </div>
          
          {/* Midday Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-4">
              <Salad className="text-supernova-purple mr-2" size={20} />
              <h3 className="text-xl font-display">Midday</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DashboardBlock 
                icon={<Footprints className="text-supernova-purple" size={18} />} 
                title="Steps" 
                value="4,230"
                progress={50}
              />
              <DashboardBlock 
                icon={<Salad className="text-supernova-purple" size={18} />} 
                title="Meals" 
                value="2 logged"
                progress={65}
              />
              <DashboardBlock 
                icon={<CircleUser className="text-supernova-purple" size={18} />} 
                title="Mood Check-in" 
              >
                <div className="flex justify-between">
                  <span className="text-sm">😴</span>
                  <span className="text-sm">😊</span>
                  <span className="text-sm">😃</span>
                  <span className="text-sm font-bold">😁</span>
                </div>
              </DashboardBlock>
            </div>
          </div>
          
          {/* Evening Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center mb-4">
              <Moon className="text-supernova-pink mr-2" size={20} />
              <h3 className="text-xl font-display">Evening</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DashboardBlock 
                icon={<BookOpen className="text-supernova-pink" size={18} />} 
                title="Reflection" 
                value="Completed"
                progress={100}
              />
              <DashboardBlock 
                icon={<Moon className="text-supernova-pink" size={18} />} 
                title="Journaling" 
                value="250 words"
                progress={85}
              />
              <DashboardBlock 
                icon={<Bed className="text-supernova-pink" size={18} />} 
                title="Sleep Goal" 
                value="8 hours"
                progress={90}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;
