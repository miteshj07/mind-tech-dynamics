
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { CalendarDays, Clock, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCms } from '@/cms/context/CmsContext';

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
  const { data, isLoading } = useCms();
  const { blogSection, seoMetadata, sharedComponents } = data;
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPosts = searchTerm
    ? blogSection.posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : blogSection.posts;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{seoMetadata.blog.title}</title>
        <meta name="description" content={seoMetadata.blog.description} />
      </Helmet>
      <PageHeader 
        title={blogSection.title} 
        subtitle={blogSection.subtitle}
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
          
          <FeaturedPost post={blogSection.featuredPost} />
          
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
              <h3 className="text-2xl font-semibold mb-4">{blogSection.newsletterSignup.title}</h3>
              <p className="text-gray-600 mb-6">
                {blogSection.newsletterSignup.description}
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
        heading={sharedComponents.contactCTA.blog.heading}
        subheading={sharedComponents.contactCTA.blog.subheading}
        buttonText={sharedComponents.contactCTA.blog.buttonText}
        buttonLink={sharedComponents.contactCTA.blog.buttonLink}
      />
    </>
  );
};

export default Blog;
