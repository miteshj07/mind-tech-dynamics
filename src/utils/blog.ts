
/**
 * Generate a slug from a title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
};

/**
 * Filter blog posts by search term
 */
export const filterPosts = (posts: any[], searchTerm: string) => {
  if (!searchTerm) return posts;
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};
