
import React, { useState } from 'react';
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

const Blog = () => {
  const { data } = useCms();
  const { blogSection, seoMetadata, sharedComponents } = data;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = filterPosts(blogSection.posts, searchTerm);

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
          
          <FeaturedPost post={blogSection.featuredPost} />
          
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
