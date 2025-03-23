
import React, { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  name: string;
  photo: string;
  result: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "SuperNovaAI helped me establish a morning routine I actually stick to. The AI insights were surprisingly spot-on.",
    name: "Sarah J.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    result: "Better sleep",
  },
  {
    quote: "The hydration tracking and reminders helped me double my water intake. I feel more energetic throughout the day.",
    name: "Michael L.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    result: "Lost 6lbs",
  },
  {
    quote: "The evening wind-down routine suggestions helped me break my doom-scrolling habit. I'm sleeping better than I have in years.",
    name: "Priya K.",
    photo: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    result: "Reduced stress",
  },
];

const TestimonialsSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative px-4 py-12">
      <Carousel 
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-2/3">
              <GlassMorphicCard className="p-8 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 relative">
                    <Avatar className="h-20 w-20 border-2 border-supernova-blue/30">
                      <img src={testimonial.photo} alt={testimonial.name} className="object-cover" />
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-supernova-blue text-supernova-dark text-xs font-semibold px-2 py-1 rounded-full">
                      {testimonial.result}
                    </div>
                  </div>
                  <blockquote className="text-lg text-gray-300 italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="font-display text-white">{testimonial.name}</p>
                </div>
              </GlassMorphicCard>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-6">
          <CarouselPrevious className="relative inset-auto h-8 w-8" />
          <CarouselNext className="relative inset-auto h-8 w-8" />
        </div>
      </Carousel>
    </div>
  );
};

export default TestimonialsSlider;
