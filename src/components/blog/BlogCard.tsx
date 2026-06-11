
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
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

interface BlogCardProps {
  post: BlogPost;
}

const TAG_COLORS: Record<string, string> = {
  'Agentforce':       'bg-sky-100 text-sky-700',
  'Salesforce':       'bg-blue-100 text-blue-700',
  'RevOps':           'bg-green-100 text-green-700',
  'CRM':              'bg-violet-100 text-violet-700',
  'Tutorial':         'bg-orange-100 text-orange-700',
  'Lead Generation':  'bg-teal-100 text-teal-700',
  'Tips':             'bg-indigo-100 text-indigo-700',
  'Case Study':       'bg-pink-100 text-pink-700',
  'Strategy':         'bg-amber-100 text-amber-700',
  'Marketing':        'bg-rose-100 text-rose-700',
  'Automation':       'bg-cyan-100 text-cyan-700',
  'Integration':      'bg-emerald-100 text-emerald-700',
};

const FALLBACK_COLORS = [
  'bg-slate-100 text-slate-700',
  'bg-purple-100 text-purple-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-lime-100 text-lime-700',
];

function tagColor(tag: string): string {
  if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  const idx = tag.charCodeAt(0) % FALLBACK_COLORS.length;
  return FALLBACK_COLORS[idx];
}

const BlogCard = ({ post }: BlogCardProps) => {
  const primaryTag = post.tags[0];

  return (
    <Link
      to={`/blog/${getPostSlug(post)}`}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer block"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
          {primaryTag && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tagColor(primaryTag)}`}>
              {primaryTag}
            </span>
          )}
          <span className="flex items-center gap-1">
            <CalendarDays size={13} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug mb-2 text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
