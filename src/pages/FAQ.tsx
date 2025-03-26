import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';

const FAQ = () => {
  return (
    <Layout>
      <div className="container max-w-3xl mx-auto py-12">
        <h1 className="text-4xl font-display mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-400 mb-8">Find answers to common questions about SUPERINOVA AI</p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-white/10">
            <AccordionTrigger className="text-lg">How do I track my meals?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              You can track your meals by navigating to the "Meals" section in the dashboard. 
              Click on "Add Meal" and enter the food items, portions, and time of consumption. 
              Our AI will automatically calculate nutritional values and provide insights based on your goals.
              You can also take a photo of your meal for quick logging, and our visual recognition system will help identify components.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-white/10">
            <AccordionTrigger className="text-lg">Is my data private?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, your data privacy is our top priority. All personal information and health data are encrypted and stored securely. 
              We never share your individual data with third parties without your explicit consent. 
              You can review our complete privacy policy to understand how we handle your information, and you have the option to 
              export or delete your data at any time through the settings menu.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-white/10">
            <AccordionTrigger className="text-lg">What's included in AI Pro tier?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              The AI Pro tier includes advanced personalized insights, unlimited meal and activity tracking, 
              custom wellness programs tailored to your specific health goals, priority access to new features, 
              integration with wearable devices, weekly detailed wellness reports, and direct access to health coaches for questions. 
              Pro members also receive personalized workout plans and nutritional guidance based on their unique data patterns.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="border-white/10">
            <AccordionTrigger className="text-lg">Can I cancel anytime?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Absolutely. There are no long-term contracts with SuperiNova AI. You can cancel your subscription at any time 
              with no cancellation fees. When you cancel, you'll continue to have access to your premium features until the 
              end of your current billing period. Your data will remain in your account unless you choose to delete it, 
              and you can always reactivate your subscription later if you wish.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5" className="border-white/10">
            <AccordionTrigger className="text-lg">How do I connect a smartwatch?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              To connect your smartwatch, go to the "Settings" menu and select "Device Integration." 
              We support various devices including Apple Watch, Fitbit, Garmin, and Samsung watches. 
              Select your device type and follow the on-screen instructions to authorize the connection. 
              Once connected, your activity, heart rate, sleep, and other data will automatically sync with your SuperiNova AI account.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6" className="border-white/10">
            <AccordionTrigger className="text-lg">How often are suggestions updated?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              SuperiNova AI updates its suggestions and insights in real-time as new data is received. 
              Daily recommendations are refreshed each morning based on your previous day's activities and sleep patterns. 
              Weekly insights are provided every Monday, offering deeper analysis of your trends and progress. 
              The more consistently you track your wellness data, the more personalized and accurate these suggestions become.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Layout>
  );
};

export default FAQ;
