
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
import { generateSlug } from '@/utils/blog';

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
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/blog/${generateSlug(post.title)}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
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
          {post.title}
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

export default BlogCard;
