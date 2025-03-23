
import React from 'react';
import { ArrowRight } from 'lucide-react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  image: string;
  title: string;
  teaser: string;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ image, title, teaser, slug }) => {
  return (
    <GlassMorphicCard className="h-full overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display mb-2 group-hover:text-supernova-blue transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{teaser}</p>
        <Link to={`/blog/${slug}`} className="text-supernova-blue flex items-center text-sm font-medium group">
          Read more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </GlassMorphicCard>
  );
};

const BlogSection: React.FC = () => {
  const posts = [
    {
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Mindful Mornings Made Easy",
      teaser: "Simple strategies to start your day with intention and clarity, even when you're short on time.",
      slug: "mindful-mornings"
    },
    {
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "How to Drink More Water Without Trying",
      teaser: "Effortless ways to stay hydrated throughout the day that don't involve setting alarms.",
      slug: "drink-more-water"
    },
    {
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Evening Tech Detox Rituals",
      teaser: "Create a digital sunset routine that improves sleep quality and reduces anxiety.",
      slug: "tech-detox-rituals"
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4">
            Wellness <span className="text-gradient">Wisdom</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Practical tips and insights to enhance your daily wellness journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <BlogPost {...post} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-supernova-blue hover:text-supernova-blue/80 transition-colors"
          >
            View all articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
