
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Heart, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-gray-400 text-sm mt-4">
              AI-Powered Wellness by SuperNovaAI
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-display text-lg mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/checkin" className="text-gray-400 hover:text-white text-sm transition-colors">Morning Check-In</Link></li>
              <li><Link to="/waterintake" className="text-gray-400 hover:text-white text-sm transition-colors">Water Tracking</Link></li>
              <li><Link to="/meallog" className="text-gray-400 hover:text-white text-sm transition-colors">Meal Logging</Link></li>
              <li><Link to="/activity" className="text-gray-400 hover:text-white text-sm transition-colors">Activity Monitoring</Link></li>
              <li><Link to="/eveningcheck" className="text-gray-400 hover:text-white text-sm transition-colors">Evening Reflection</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SuperNovaAI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-supernova-pink" /> by SuperNovaAI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
