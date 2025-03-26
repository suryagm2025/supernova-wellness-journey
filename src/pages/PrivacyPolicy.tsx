import React from 'react';
import Layout from '@/components/layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display mb-6">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last Updated: June 1, 2023</p>
        
        <div className="prose prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to SUPERINOVA AI. We respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
          
          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you register for the Service, 
            express interest in obtaining information about us or our products, or otherwise contact us. The personal information 
            we collect may include:
          </p>
          <ul>
            <li>Name, email address, and contact details</li>
            <li>Username and password</li>
            <li>Profile information (age, gender, height, weight)</li>
            <li>Health and wellness data you input</li>
            <li>Payment information for subscriptions</li>
          </ul>
          
          <h3>2.2 Usage Data</h3>
          <p>
            We automatically collect certain information when you visit, use or navigate the Service. This information may include:
          </p>
          <ul>
            <li>Device and connection information</li>
            <li>Browser and operating system information</li>
            <li>IP address and approximate location</li>
            <li>Pages you view and features you use</li>
            <li>Time spent on pages and interaction with elements</li>
          </ul>
          
          <h2>3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To personalize your experience and deliver content relevant to your interests</li>
            <li>To generate AI-powered wellness insights and recommendations</li>
            <li>To process payments and manage your account</li>
            <li>To communicate with you about updates, support, and promotions</li>
            <li>To analyze usage patterns and improve our Service</li>
            <li>To protect against fraudulent or unauthorized transactions</li>
          </ul>
          
          <h2>4. Sharing Your Information</h2>
          <p>
            We may share your information with the following categories of third parties:
          </p>
          <ul>
            <li>Service providers who help us deliver the Service</li>
            <li>Payment processors for subscription management</li>
            <li>Analytics providers to help us improve the Service</li>
            <li>Marketing partners (only with your explicit consent)</li>
            <li>Legal authorities when required by law</li>
          </ul>
          
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. 
            However, no system is completely secure, and we cannot guarantee absolute security of your information.
          </p>
          
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
            <li>Withdrawal of consent</li>
          </ul>
          
          <h2>7. Children's Privacy</h2>
          <p>
            Our Service is not directed to children under 13 (or the applicable age in your jurisdiction). 
            We do not knowingly collect personal information from children.
          </p>
          
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: privacy@superinova.ai
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
