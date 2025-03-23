
import React from 'react';
import { Mail, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import GlassMorphicCard from '../ui/GlassMorphicCard';

const ContactSection: React.FC = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 animate-fade-in">
            <GlassMorphicCard className="p-8 h-full">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input
                      id="name"
                      type="text"
                      className="w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-supernova-blue"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-supernova-blue"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    className="w-full min-h-[150px] rounded-md bg-white/5 border border-white/10 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-supernova-blue"
                    placeholder="Your message"
                  />
                </div>
                <Button className="w-full md:w-auto bg-supernova-blue hover:bg-supernova-blue/90">
                  Send Message
                </Button>
              </form>
            </GlassMorphicCard>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <GlassMorphicCard className="p-8 h-full">
              <h3 className="text-xl font-display mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <Mail className="text-supernova-blue mr-4 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Email</h4>
                    <p className="text-gray-400 text-sm">hello@supernovaai.com</p>
                    <p className="text-gray-400 text-sm">support@supernovaai.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Clock className="text-supernova-blue mr-4 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Support Hours</h4>
                    <p className="text-gray-400 text-sm">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-gray-400 text-sm">Weekend: 10AM - 4PM</p>
                  </div>
                </div>
                
                <div className="pt-4 mt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-4">
                    For urgent inquiries, please email our support team.
                  </p>
                  <a 
                    href="mailto:support@supernovaai.com" 
                    className="inline-flex items-center text-supernova-blue text-sm hover:text-supernova-blue/80 transition-colors"
                  >
                    Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </GlassMorphicCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
