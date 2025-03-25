
import React from 'react';
import Layout from '@/components/layout/Layout';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

const CookiePolicy = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display mb-2">Cookie Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <GlassMorphicCard className="p-8">
          <h2 className="text-2xl font-display mb-4">Our Cookie Policy</h2>
          
          <p className="text-gray-300 mb-6">
            This is the Cookie Policy page for SuperiNova AI. Content to be updated soon.
          </p>
          
          <h3 className="text-xl font-display mb-3">What are cookies?</h3>
          <p className="text-gray-300 mb-6">
            Cookies are small text files that are placed on your device when you visit our website. 
            They allow us to recognize your device and remember certain information about your visit.
          </p>
          
          <h3 className="text-xl font-display mb-3">How we use cookies</h3>
          <p className="text-gray-300 mb-6">
            SuperiNova AI uses cookies to improve your experience on our website and to provide personalized services.
            We use both session cookies, which expire when you close your browser, and persistent cookies, 
            which stay on your device until they expire or you delete them.
          </p>
          
          <h3 className="text-xl font-display mb-3">Types of cookies we use</h3>
          <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
            <li>Essential cookies: These are necessary for the website to function properly.</li>
            <li>Preference cookies: These help us remember your settings and preferences.</li>
            <li>Analytics cookies: These help us understand how visitors interact with our website.</li>
            <li>Marketing cookies: These allow us to offer you relevant content and marketing.</li>
          </ul>
          
          <h3 className="text-xl font-display mb-3">Managing cookies</h3>
          <p className="text-gray-300 mb-6">
            You can control and manage cookies in various ways. Most web browsers allow you to 
            manage your cookie preferences. You can:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
            <li>Delete cookies from your device</li>
            <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
            <li>Set your browser to notify you when you receive a cookie</li>
          </ul>
          
          <p className="text-gray-300 mb-6">
            Please note that if you choose to block or delete cookies, some features of our website may not work correctly.
          </p>
          
          <h3 className="text-xl font-display mb-3">Changes to our cookie policy</h3>
          <p className="text-gray-300 mb-6">
            We may update our Cookie Policy from time to time. Any changes will be posted on this page.
          </p>
          
          <h3 className="text-xl font-display mb-3">Contact us</h3>
          <p className="text-gray-300">
            If you have any questions about our Cookie Policy, please contact us at privacy@superinova.ai
          </p>
        </GlassMorphicCard>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
