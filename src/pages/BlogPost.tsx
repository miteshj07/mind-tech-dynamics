import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCms } from '@/cms/context/CmsContext';
import Seo from '@/components/layout/Seo';
import ContactCTA from '@/components/layout/ContactCTA';
import { CalendarDays, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPostSlug, isPublished } from '@/utils/blog';

const SITE = 'https://www.meethemind.com';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data } = useCms();
  const { blogSection, sharedComponents } = data;

  // Resolve the post synchronously during render (not in an effect) so the
  // title/meta/JSON-LD are set on first paint and the prerenderer captures the
  // correct, post-specific tags.
  const post = useMemo(() => {
    const allPosts = [blogSection.featuredPost, ...(blogSection.posts || [])];
    return allPosts.find((p) => p && getPostSlug(p) === slug) || null;
  }, [slug, blogSection]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBack = () => navigate('/blog');
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Button onClick={handleBack}>Back to Blog</Button>
      </div>
    );
  }

  const canonical = `/blog/${getPostSlug(post)}`;
  const relatedPosts = (blogSection.posts || [])
    .filter((p: any) => p.title !== post.title && isPublished(p))
    .filter((p: any) => (p.tags || []).some((tag: string) => (post.tags || []).includes(tag)))
    .slice(0, 3);

  // BlogPosting structured data so search/AI engines can attribute the article.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : undefined,
    datePublished: post.datePublished || post.date,
    dateModified: post.dateModified || post.datePublished || post.date,
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

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost: any, index: number) => (
                  <Link
                    key={index}
                    to={`/blog/${getPostSlug(relatedPost)}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden block hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold mb-2 hover:text-brand">{relatedPost.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
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
