import DOMPurify from 'dompurify';

/**
 * Sanitize CMS-authored heading/label HTML before rendering it with
 * dangerouslySetInnerHTML. Some titles carry a small amount of brand markup
 * (e.g. `<span class="text-brand">…</span>`), so we allow a minimal set of
 * inline formatting tags and strip everything else — scripts, event handlers,
 * <img onerror>, etc. Defense-in-depth behind the admin-only RLS on cms_content.
 */
export const sanitizeInlineHtml = (dirty: string | null | undefined): string =>
  DOMPurify.sanitize(dirty ?? '', {
    ALLOWED_TAGS: ['span', 'strong', 'em', 'b', 'i', 'br', 'u'],
    ALLOWED_ATTR: ['class'],
  });
