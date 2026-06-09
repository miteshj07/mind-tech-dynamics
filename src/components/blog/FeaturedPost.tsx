
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import { getPostSlug } from '@/utils/blog';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
  slug?: string;
}

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
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
            {post.title}
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
          <Link
            to={`/blog/${getPostSlug(post)}`}
            className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
          >
            Read Article <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
