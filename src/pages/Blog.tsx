
import React, { useState, useEffect } from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { useCms } from '@/cms/context/CmsContext';
import BlogCard from '@/components/blog/BlogCard';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import { supabase } from '@/integrations/supabase/client';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

function mapPost(row: any) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    date: row.published_at
      ? new Date(row.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '',
    readTime: row.reading_time ? `${row.reading_time} min read` : '5 min read',
    author: row.author || 'MeetTheMind',
    image: row.featured_image || FALLBACK_IMAGE,
    tags: row.tags || [],
    content: row.content,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
  };
}

const Blog = () => {
  const { data } = useCms();
  const { blogSection, seoMetadata, sharedComponents } = data;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [livePosts, setLivePosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .then(({ data: rows }) => {
        if (rows) setLivePosts(rows.map(mapPost));
        setLoadingPosts(false);
      });
  }, []);

  const allCategories = ['All', ...Array.from(new Set(livePosts.flatMap(p => p.tags))).filter(Boolean)];

  const filteredPosts =
    activeCategory === 'All'
      ? livePosts
      : livePosts.filter(p => p.tags.includes(activeCategory));

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: blogSection.title,
    description: blogSection.subtitle,
    url: 'https://www.meethemind.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: 'https://www.meethemind.com',
      logo: 'https://www.meethemind.com/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png',
    },
  };

  return (
    <>
      <Seo title={seoMetadata.blog.title} description={seoMetadata.blog.description} canonical="/blog" jsonLd={blogSchema} />
      <PageHeader
        title={blogSection.title}
        subtitle={blogSection.subtitle}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">

          {/* Category filter pills */}
          {!loadingPosts && allCategories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeCategory === cat
                      ? 'bg-brand text-white border-brand shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loadingPosts ? (
            <div className="py-16 text-center text-gray-400">Loading posts…</div>
          ) : livePosts.length === 0 ? (
            <p className="text-center text-gray-400 py-16">No posts published yet. Check back soon.</p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-center text-gray-400 py-16">No posts in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
            </div>
          )}

          <NewsletterSignup
            title={blogSection.newsletterSignup.title}
            description={blogSection.newsletterSignup.description}
          />
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
