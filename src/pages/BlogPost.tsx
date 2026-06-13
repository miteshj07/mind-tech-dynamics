import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCms } from '@/cms/context/CmsContext';
import Seo from '@/components/layout/Seo';
import ContactCTA from '@/components/layout/ContactCTA';
import { CalendarDays, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const SITE = 'https://www.meethemind.com';

// Strip a leading H1 from markdown so we don't duplicate the title shown in the header
function stripLeadingH1(md: string): string {
  return md.replace(/^#\s+.+\n?/, '').trimStart();
}

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
            content: row.content ? stripLeadingH1(row.content) : '',
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
      <div className="min-h-screen flex flex-col items-center justify-center pt-28">
        <p className="text-gray-400 text-lg">Loading…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Button onClick={handleBack}>Back to Blog</Button>
      </div>
    );
  }

  const canonical = `/blog/${post.slug}`;

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

      {/* Page background */}
      <div className="bg-gray-50 min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Back to all articles
          </Link>

          {/* Hero image */}
          {post.image && (
            <div className="rounded-2xl overflow-hidden mb-10 h-72 md:h-96">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag: string, i: number) => (
                <span key={i} className="text-xs font-medium bg-brand/10 text-brand px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 mb-5">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-gray-500 leading-relaxed mb-6 border-l-4 border-brand pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 pb-8 border-b border-gray-200 mb-10">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User size={15} /> {post.author}
              </span>
            )}
            {post.date && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={15} /> {post.date}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={15} /> {post.readTime}
              </span>
            )}
          </div>

          {/* Article body */}
          <article
            className="
              prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:leading-snug
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-5
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-a:text-brand prose-a:no-underline hover:prose-a:underline
              prose-ul:my-5 prose-ul:space-y-2 prose-li:text-gray-700
              prose-ol:my-5 prose-ol:space-y-2
              prose-hr:my-10 prose-hr:border-gray-200
              prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:pl-5 prose-blockquote:text-gray-600 prose-blockquote:italic
            "
          >
            {post.content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            ) : (
              <p className="text-xl">{post.excerpt}</p>
            )}
          </article>

          {/* Author footer */}
          <div className="mt-14 pt-8 border-t border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
              <span className="text-brand font-semibold text-sm">MJ</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
              <p className="text-gray-500 text-sm mt-0.5">
                Salesforce consultant with 10 years of Sales and Service Cloud implementation experience.
              </p>
            </div>
          </div>

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
