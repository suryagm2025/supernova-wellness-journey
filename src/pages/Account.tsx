
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { Upload } from 'lucide-react';

const healthGoals = [
  { id: 'sleep', label: 'Sleep' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'stress', label: 'Stress' },
  { id: 'fitness', label: 'Fitness' },
];

const Account = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    ageGroup: '25-34',
    gender: 'prefer-not-to-say',
    goals: ['sleep', 'fitness'],
    profileImage: null as string | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goalId: string) => {
    setFormData(prev => {
      const currentGoals = [...prev.goals];
      if (currentGoals.includes(goalId)) {
        return { ...prev, goals: currentGoals.filter(id => id !== goalId) };
      } else {
        return { ...prev, goals: [...currentGoals, goalId] };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save the data to your backend here
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="glass-panel p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4 border-2 border-supernova-blue/50">
                  {formData.profileImage ? (
                    <AvatarImage src={formData.profileImage} alt={formData.name} />
                  ) : (
                    <AvatarFallback className="bg-supernova-blue/20 text-white text-2xl">
                      {formData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="w-full">
                  <Label htmlFor="photo-upload" className="block text-center mb-2">Profile Photo</Label>
                  <div className="flex items-center justify-center">
                    <Label 
                      htmlFor="photo-upload" 
                      className="flex items-center gap-2 px-4 py-2 bg-supernova-blue/20 hover:bg-supernova-blue/30 border border-supernova-blue/30 rounded-lg text-supernova-blue transition-colors duration-300 cursor-pointer"
                    >
                      <Upload size={16} />
                      <span className="text-sm">Upload Photo</span>
                    </Label>
                    <Input 
                      id="photo-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ageGroup">Age Group</Label>
                    <Select 
                      value={formData.ageGroup} 
                      onValueChange={(value) => handleSelectChange('ageGroup', value)}
                    >
                      <SelectTrigger id="ageGroup">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35-44">35-44</SelectItem>
                        <SelectItem value="45-54">45-54</SelectItem>
                        <SelectItem value="55+">55+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => handleSelectChange('gender', value)}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Health Goals</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {healthGoals.map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`goal-${goal.id}`} 
                          checked={formData.goals.includes(goal.id)}
                          onCheckedChange={() => handleGoalToggle(goal.id)}
                        />
                        <Label 
                          htmlFor={`goal-${goal.id}`}
                          className="cursor-pointer text-sm font-normal"
                        >
                          {goal.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="px-6">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
