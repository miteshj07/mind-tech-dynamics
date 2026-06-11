import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCms } from '@/cms/context/CmsContext';
import Seo from '@/components/layout/Seo';
import ContactCTA from '@/components/layout/ContactCTA';
import { CalendarDays, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const SITE = 'https://www.meethemind.com';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data } = useCms();
  const { sharedComponents } = data;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    setLoading(true);
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
      .then(({ data: row }) => {
        if (row) {
          setPost({
            slug: row.slug,
            title: row.title,
            excerpt: row.excerpt || '',
            content: row.content,
            image: row.featured_image || null,
            tags: row.tags || [],
            author: row.author || 'MeetTheMind',
            date: row.published_at
              ? new Date(row.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              : '',
            readTime: row.reading_time ? `${row.reading_time} min read` : '5 min read',
            metaTitle: row.meta_title,
            metaDescription: row.meta_description,
            datePublished: row.published_at,
          });
        }
        setLoading(false);
      });
  }, [slug]);

  const handleBack = () => navigate('/blog');

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Button onClick={handleBack}>Back to Blog</Button>
      </div>
    );
  }

  const canonical = `/blog/${post.slug}`;
  const relatedPosts: any[] = [];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : undefined,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: { '@type': 'Person', name: post.author || 'Meet The Mind Technologies' },
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      logo: { '@type': 'ImageObject', url: `${SITE}/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}${canonical}` },
    keywords: (post.tags || []).join(', '),
  };

  return (
    <>
      <Seo
        title={`${post.metaTitle || post.title} | Meet The Mind Blog`}
        description={post.metaDescription || post.excerpt}
        canonical={canonical}
        jsonLd={articleSchema}
      />

      <div className="bg-gray-50 py-8 pt-28">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={handleBack} className="flex items-center mb-6">
            <ArrowLeft size={16} className="mr-2" /> Back to All Articles
          </Button>

          <article className="bg-white rounded-xl shadow-md overflow-hidden">
            {post.image && (
              <div className="relative h-[400px]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {(post.tags || []).map((tag: string, i: number) => (
                    <span key={i} className="text-xs bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center text-gray-500 gap-6 mb-8">
                {post.author && (
                  <div className="flex items-center"><User size={18} className="mr-2" />{post.author}</div>
                )}
                {post.date && (
                  <div className="flex items-center"><CalendarDays size={18} className="mr-2" />{post.date}</div>
                )}
                {post.readTime && (
                  <div className="flex items-center"><Clock size={18} className="mr-2" />{post.readTime}</div>
                )}
              </div>

              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-brand">
                {post.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                ) : (
                  <p className="text-xl font-medium">{post.excerpt}</p>
                )}
              </div>
            </div>
          </article>

        </div>
      </div>

      <ContactCTA
        heading={sharedComponents.contactCTA.blog.heading}
        subheading={sharedComponents.contactCTA.blog.subheading}
        buttonText={sharedComponents.contactCTA.blog.buttonText}
        buttonLink={sharedComponents.contactCTA.blog.buttonLink}
      />
    </>
  );
};

export default BlogPost;
