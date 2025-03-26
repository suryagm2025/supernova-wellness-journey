
import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-supernova-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4">
            Real <span className="text-gradient">Results</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from our community of wellness enthusiasts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Testimonial 1 - Senior */}
          <TestimonialCard
            quote="I never thought technology could help with my health at my age. Supernova's voice features make it easy for me to track my medications and stay active without struggling with complicated apps."
            author={{
              name: "Eleanor, 78",
              role: "Retired Teacher",
              image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            }}
          />
          
          {/* Testimonial 2 - Busy Mom */}
          <TestimonialCard
            quote="Between my kids and my career, I never had time for self-care. Supernova's quick check-ins and personalized recommendations help me stay healthy even on my busiest days."
            author={{
              name: "Jessica, 42",
              role: "Marketing Director & Mom of 3",
              image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            }}
            delay="0.2s"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
