
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
 * Resolve a post's slug — use an explicit `slug` field if the author set one,
 * otherwise derive it from the title. Keeps existing post URLs stable.
 */
export const getPostSlug = (post: { slug?: string; title: string }): string => {
  return post?.slug && post.slug.trim() ? post.slug.trim() : generateSlug(post.title);
};

/**
 * Estimate read time from body content (~200 words per minute).
 */
export const estimateReadTime = (content: string): string => {
  const words = (content || '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

/**
 * Only show posts that are published (treat missing `published` as true so
 * older posts that predate the field stay visible).
 */
export const isPublished = (post: { published?: boolean }): boolean =>
  post?.published !== false;

/**
 * Filter blog posts by search term
 */
export const filterPosts = (posts: any[], searchTerm: string) => {
  if (!searchTerm) return posts;

  return posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags || []).some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};
