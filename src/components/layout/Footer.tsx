
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-[#0E0E12]/90 border-t border-[#2A2A30] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo size="md" />
            <p className="mt-4 text-[#B0B0C3] text-sm">
              Elevate your wellness journey with SuperiNova AI's personalized insights and tracking.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">Dashboard</Link></li>
              <li><Link to="/programs" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">Programs</Link></li>
              <li><Link to="/blog" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">Blog</Link></li>
              <li><Link to="/account" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">My Account</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">FAQ</Link></li>
              <li><a href="mailto:help@superinova.ai" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">Contact Support</a></li>
              <li><Link to="/settings" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">App Settings</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">Terms of Use</Link></li>
              <li><Link to="/privacy" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#2A2A30] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#B0B0C3] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SuperiNova AI. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-[#B0B0C3] hover:text-[#2CD4D9] transition-colors">
              <span className="sr-only">Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
