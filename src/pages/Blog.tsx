
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  // Sample blog posts that will be displayed
  const blogPosts = [
    {
      title: "How AI is Transforming Personal Wellness",
      description: "Discover how artificial intelligence is creating personalized wellness experiences.",
      date: "June 15, 2023",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    },
    {
      title: "Morning Routines for Optimal Wellness",
      description: "Learn the science behind effective morning routines and how to build your own.",
      date: "May 22, 2023",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    },
    {
      title: "The Voice-First Revolution in Health Apps",
      description: "Why voice interfaces are making wellness tracking more accessible for everyone.",
      date: "April 10, 2023",
      category: "Accessibility",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Supernova Wellness Blog</h1>
          <p className="text-gray-300">
            Insights, research, and stories to enhance your wellness journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="bg-supernova-blue/10 text-supernova-blue border-supernova-blue/20">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <a href="#" className="text-supernova-blue hover:text-supernova-blue/80 transition-colors">
                  Read more →
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="glass-panel p-8 text-center mt-12">
          <h2 className="text-2xl mb-4">More Content Coming Soon</h2>
          <p className="text-gray-300">
            Our wellness experts are working on new articles. Check back soon for more insights into improving your wellbeing with Supernova.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
