
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { useCms } from '@/cms/context/CmsContext';
import BlogCard from '@/components/blog/BlogCard';
import FeaturedPost from '@/components/blog/FeaturedPost';
import SearchBar from '@/components/blog/SearchBar';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import EmptySearchResult from '@/components/blog/EmptySearchResult';
import { filterPosts } from '@/utils/blog';

const Blog = () => {
  const { data, isLoading } = useCms();
  const [searchTerm, setSearchTerm] = useState("");
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const { blogSection = {}, seoMetadata = {}, sharedComponents = {} } = data || {};
  const posts = blogSection.posts || [];
  const filteredPosts = filterPosts(posts, searchTerm);

  return (
    <>
      <Helmet>
        <title>{seoMetadata.blog?.title || "Blog - Meet The Mind Technologies"}</title>
        <meta name="description" content={seoMetadata.blog?.description || "Read the latest insights on Salesforce"} />
      </Helmet>
      <PageHeader 
        title={blogSection.title || "Blog"} 
        subtitle={blogSection.subtitle || "Insights and updates from our team"}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          
          {blogSection.featuredPost && <FeaturedPost post={blogSection.featuredPost} />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <EmptySearchResult resetSearch={() => setSearchTerm("")} />
          )}
          
          <div className="flex justify-center mt-12">
            <button className="btn-secondary">
              Load More Articles
            </button>
          </div>
          
          <NewsletterSignup 
            title={blogSection.newsletterSignup?.title || "Subscribe to Our Newsletter"}
            description={blogSection.newsletterSignup?.description || "Get the latest Salesforce insights delivered to your inbox"}
          />
        </div>
      </section>
      
      <ContactCTA
        heading={sharedComponents.contactCTA?.blog?.heading}
        subheading={sharedComponents.contactCTA?.blog?.subheading}
        buttonText={sharedComponents.contactCTA?.blog?.buttonText}
        buttonLink={sharedComponents.contactCTA?.blog?.buttonLink}
      />
    </>
  );
};

export default Blog;
