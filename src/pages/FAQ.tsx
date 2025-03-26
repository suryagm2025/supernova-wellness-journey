
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is SuperiNova AI?",
      answer: "SuperiNova AI is a comprehensive wellness platform that uses artificial intelligence to provide personalized health insights, track your wellness journey, and help you build healthy habits."
    },
    {
      question: "How does the emotion tracking work?",
      answer: "Our emotion tracking system allows you to log your emotional state throughout the day. The AI then analyzes patterns and provides suggestions to improve your mental wellbeing based on your unique emotional profile."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent."
    },
    {
      question: "Can I use SuperiNova AI for free?",
      answer: "Yes, we offer a free tier with basic features. Premium features are available through our subscription plans."
    },
    {
      question: "How does the water intake tracking work?",
      answer: "Our water tracking feature allows you to log your daily water consumption. You can set personalized hydration goals, and the app will send reminders to help you stay hydrated throughout the day."
    },
    {
      question: "What makes SuperiNova AI different from other wellness apps?",
      answer: "SuperiNova AI integrates multiple aspects of wellness in one platform and uses advanced AI to provide truly personalized recommendations. Our holistic approach considers physical activity, emotional wellbeing, sleep patterns, and more."
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-xl font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 p-8 glass-panel text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">Our support team is ready to help you with any other questions you might have.</p>
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-supernova-blue hover:bg-supernova-blue/80 rounded-lg font-semibold transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
