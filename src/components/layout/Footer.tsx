
import React from 'react';
import Logo from '../ui/Logo';
import { Heart, Twitter, Instagram, Facebook, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-gray-400 text-sm mt-4">
              SuperinovaAI takes your wellness journey to the next level with cutting-edge AI technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-display text-lg mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Morning Check-In</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Water Tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Meal Logging</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Activity Monitoring</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Evening Reflection</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Wellness Articles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">AI Health Research</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Health & Fitness Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Nutrition Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Developer API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SuperinovaAI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-supernova-pink" /> by SuperinovaAI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
