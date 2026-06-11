
import React, { useState, useEffect } from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { useCms } from '@/cms/context/CmsContext';
import BlogCard from '@/components/blog/BlogCard';
import FeaturedPost from '@/components/blog/FeaturedPost';
import SearchBar from '@/components/blog/SearchBar';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import EmptySearchResult from '@/components/blog/EmptySearchResult';
import { filterPosts } from '@/utils/blog';
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

  const [searchTerm, setSearchTerm] = useState("");
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

  const featuredPost = livePosts[0] || null;
  const remainingPosts = livePosts.slice(1);
  const filteredPosts = filterPosts(remainingPosts, searchTerm);

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
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          
          {loadingPosts ? (
            <div className="py-16 text-center text-gray-400">Loading posts…</div>
          ) : (
            <>
              {featuredPost && <FeaturedPost post={featuredPost} />}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={index} post={post} />
                ))}
              </div>

              {!loadingPosts && livePosts.length === 0 && (
                <p className="text-center text-gray-400 py-16">No posts published yet. Check back soon.</p>
              )}

              {livePosts.length > 1 && filteredPosts.length === 0 && searchTerm && (
                <EmptySearchResult resetSearch={() => setSearchTerm("")} />
              )}
            </>
          )}
          
          <div className="flex justify-center mt-12">
            <button className="btn-secondary">
              Load More Articles
            </button>
          </div>
          
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
