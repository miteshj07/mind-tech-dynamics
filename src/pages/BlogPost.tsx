import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCms } from '@/cms/context/CmsContext';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { CalendarDays, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPostParams {
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams<keyof BlogPostParams>() as BlogPostParams;
  const navigate = useNavigate();
  const { data, isLoading } = useCms();
  const { blogSection, sharedComponents } = data;
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Find the post by slug
    const findPost = () => {
      // Check if it's the featured post
      if (generateSlug(blogSection.featuredPost.title) === slug) {
        return blogSection.featuredPost;
      }
      
      // Otherwise, check regular posts
      const foundPost = blogSection.posts.find(
        (post) => generateSlug(post.title) === slug
      );
      
      return foundPost || null;
    };

    setPost(findPost());
  }, [slug, blogSection]);

  // Generate a slug from a title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  };

  const handleBack = () => {
    navigate('/blog');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Button onClick={handleBack}>Back to Blog</Button>
      </div>
    );
  }
  
  // Generate related posts (excluding the current one)
  const relatedPosts = blogSection.posts
    .filter(p => p.title !== post.title)
    .filter(p => p.tags.some((tag: string) => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | Meet The Mind Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={handleBack} className="flex items-center mb-6">
            <ArrowLeft size={16} className="mr-2" /> Back to All Articles
          </Button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-[400px]">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                {post.tags.map((tag: string, i: number) => (
                  <span 
                    key={i}
                    className="text-xs bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-gray-500 gap-6 mb-8">
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <CalendarDays size={18} className="mr-2" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  {post.readTime}
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl font-medium mb-6">{post.excerpt}</p>
                
                {/* In a real implementation, this would be the full blog content */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
                
                <p>
                  Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
                
                <h2>Key Insights</h2>
                
                <p>
                  Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
                
                <ul>
                  <li>Insight one about {post.tags[0]}</li>
                  <li>Important consideration for businesses</li>
                  <li>Strategic approach to implementation</li>
                  <li>Best practices and common pitfalls</li>
                </ul>
                
                <p>
                  Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
                
                <h2>Conclusion</h2>
                
                <p>
                  Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
              </div>
            </div>
          </div>
          
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost: any, index: number) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                    onClick={() => navigate(`/blog/${generateSlug(relatedPost.title)}`)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold mb-2 hover:text-brand cursor-pointer">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </div>
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
