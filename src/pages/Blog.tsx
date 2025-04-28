
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { CalendarDays, Clock, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {post.tags.map((tag, i) => (
            <span 
              key={i}
              className="text-xs bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 hover:text-brand transition-colors">
          <a href="#">{post.title}</a>
        </h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarDays size={16} className="mr-2" />
            {post.date}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-2" />
            {post.readTime}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPost = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative h-full">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <span 
                key={i}
                className="text-xs bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <p className="text-brand font-medium mb-2">Featured Article</p>
          <h2 className="text-2xl font-bold mb-4 hover:text-brand transition-colors">
            <a href="#">{post.title}</a>
          </h2>
          <p className="text-gray-600 mb-6">{post.excerpt}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarDays size={16} className="mr-2" />
              {post.date}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock size={16} className="mr-2" />
              {post.readTime}
            </div>
          </div>
          <a 
            href="#" 
            className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
          >
            Read Article <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const featuredPost: BlogPost = {
    title: "Top 5 Salesforce Trends Shaping 2025",
    excerpt: "Discover the latest innovations and trends in the Salesforce ecosystem that will transform how businesses operate and engage with customers.",
    date: "April 15, 2025",
    readTime: "8 min read",
    author: "David Chen",
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Trends", "Innovation"]
  };
  
  const blogPosts: BlogPost[] = [
    {
      title: "Why Salesforce Customization Matters for SMEs",
      excerpt: "Small and medium enterprises often overlook the power of tailored CRM solutions. Learn how customization can drive growth for businesses of all sizes.",
      date: "April 10, 2025",
      readTime: "6 min read",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1664574654529-b60630f33fdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["SME", "Customization"]
    },
    {
      title: "CRM Integration Mistakes to Avoid",
      excerpt: "Integration challenges can derail your Salesforce implementation. Discover the common pitfalls and how to navigate them successfully.",
      date: "April 5, 2025",
      readTime: "7 min read",
      author: "Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Integration", "Best Practices"]
    },
    {
      title: "Maximizing ROI from Your Salesforce Investment",
      excerpt: "Are you getting the most from your Salesforce platform? Learn proven strategies to increase your return on investment.",
      date: "March 28, 2025",
      readTime: "5 min read",
      author: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["ROI", "Strategy"]
    },
    {
      title: "The Future of AI in Salesforce Einstein",
      excerpt: "Artificial intelligence is revolutionizing CRM capabilities. Explore how Einstein is evolving and what it means for your business.",
      date: "March 20, 2025",
      readTime: "9 min read",
      author: "David Chen",
      image: "https://images.unsplash.com/photo-1677442135136-760c813029fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["AI", "Einstein"]
    },
    {
      title: "Building a Data-Driven Sales Strategy with Salesforce",
      excerpt: "Learn how to leverage Salesforce analytics to create a sales approach based on real insights rather than intuition.",
      date: "March 15, 2025",
      readTime: "7 min read",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Sales", "Analytics"]
    },
    {
      title: "Salesforce Security Best Practices",
      excerpt: "Protecting your customer data is paramount. Discover essential security measures every Salesforce admin should implement.",
      date: "March 8, 2025",
      readTime: "6 min read",
      author: "Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Security", "Best Practices"]
    }
  ];
  
  const filteredPosts = searchTerm
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : blogPosts;

  return (
    <>
      <PageHeader 
        title="Blog & Insights" 
        subtitle="Insights, strategies, and tips for CRM excellence from our team of Salesforce experts."
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <div className="relative w-64">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <FeaturedPost post={featuredPost} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No articles matching your search.</p>
              <button
                className="mt-4 text-brand font-medium"
                onClick={() => setSearchTerm("")}
              >
                View All Articles
              </button>
            </div>
          )}
          
          <div className="flex justify-center mt-12">
            <button className="btn-secondary">
              Load More Articles
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 mt-16">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-4">Stay Updated with CRM Insights</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter to receive the latest Salesforce tips, trends, and best practices directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Your email address" 
                  className="flex-grow"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ContactCTA
        heading="Want to Learn More About Our Salesforce Solutions?"
        subheading="Explore how our expertise can help your business grow."
        buttonText="Get in Touch"
      />
    </>
  );
};

export default Blog;
