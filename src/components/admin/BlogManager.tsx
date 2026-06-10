import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCms } from '@/cms/context/CmsContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Loader2 } from 'lucide-react';
import { generateSlug, estimateReadTime, getPostSlug } from '@/utils/blog';

interface PostForm {
  title: string;
  slug: string;
  author: string;
  datePublished: string; // ISO yyyy-mm-dd
  readTime: string;
  excerpt: string;
  tags: string;
  image: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  featured: boolean;
}

const emptyForm: PostForm = {
  title: '', slug: '', author: 'Mitesh Jain', datePublished: new Date().toISOString().slice(0, 10),
  readTime: '', excerpt: '', tags: '', image: '', content: '', metaTitle: '', metaDescription: '',
  published: true, featured: false,
};

const inputCls = 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand';
const labelCls = 'block text-sm font-medium text-gray-700 mb-1';

const humanDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const BlogManager = () => {
  const { data, updateContent, uploadImage, refreshData } = useCms();
  const blog = data.blogSection || { featuredPost: null, posts: [] };

  const [form, setForm] = useState<PostForm>(emptyForm);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null=list view, -1=new, >=0 edit
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Flat list with a featured marker: [featured, ...posts]
  const buildList = (): any[] => {
    const f = blog.featuredPost ? [{ ...blog.featuredPost, __featured: true }] : [];
    const ps = (blog.posts || []).map((p: any) => ({ ...p, __featured: false }));
    return [...f, ...ps];
  };

  const list = buildList();

  const set = (k: keyof PostForm, v: any) => setForm((prev) => ({ ...prev, [k]: v }));

  const startNew = () => {
    setForm({ ...emptyForm, datePublished: new Date().toISOString().slice(0, 10) });
    setEditingIndex(-1);
    setShowPreview(false);
  };

  const startEdit = (i: number) => {
    const p = list[i];
    setForm({
      title: p.title || '',
      slug: p.slug || generateSlug(p.title || ''),
      author: p.author || 'Mitesh Jain',
      datePublished: (p.datePublished || new Date().toISOString().slice(0, 10)).slice(0, 10),
      readTime: p.readTime || '',
      excerpt: p.excerpt || '',
      tags: (p.tags || []).join(', '),
      image: p.image || '',
      content: p.content || '',
      metaTitle: p.metaTitle || '',
      metaDescription: p.metaDescription || '',
      published: p.published !== false,
      featured: !!p.__featured,
    });
    setEditingIndex(i);
    setShowPreview(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      set('image', res.publicUrl);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const buildPost = () => {
    const slug = form.slug.trim() || generateSlug(form.title);
    return {
      title: form.title.trim(),
      slug,
      author: form.author.trim(),
      datePublished: form.datePublished,
      date: humanDate(form.datePublished),
      readTime: form.readTime.trim() || estimateReadTime(form.content),
      excerpt: form.excerpt.trim(),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      image: form.image.trim(),
      content: form.content,
      metaTitle: form.metaTitle.trim(),
      metaDescription: form.metaDescription.trim(),
      published: form.published,
    };
  };

  const commit = async (nextList: any[]) => {
    const featured = nextList.find((p) => p.__featured) || nextList[0] || null;
    const strip = (p: any) => {
      const { __featured, ...rest } = p;
      return rest;
    };
    const posts = nextList.filter((p) => p !== featured).map(strip);
    await updateContent('blogSection', 'featuredPost', featured ? strip(featured) : {});
    await updateContent('blogSection', 'posts', posts);
    await refreshData();
  };

  const handleSave = async () => {
    if (!form.title.trim()) return toast.error('Title is required');
    if (!form.excerpt.trim()) return toast.error('A short excerpt/summary is required');
    setSaving(true);
    try {
      const post = { ...buildPost(), __featured: form.featured };
      const next = buildList();
      if (editingIndex !== null && editingIndex >= 0) next[editingIndex] = post;
      else next.push(post);
      // If this post is featured, clear the flag on all others.
      if (form.featured) next.forEach((p, idx) => { p.__featured = p === post; });
      await commit(next);
      toast.success('Post saved');
      setEditingIndex(null);
    } catch (err) {
      toast.error(`Save failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (i: number) => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    setSaving(true);
    try {
      const next = buildList();
      next.splice(i, 1);
      await commit(next);
      toast.success('Post deleted');
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setSaving(false);
    }
  };

  // ---------- Editor view ----------
  if (editingIndex !== null) {
    return (
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{editingIndex === -1 ? 'New Post' : 'Edit Post'}</h3>
          <Button variant="ghost" onClick={() => setEditingIndex(null)}>← Back to list</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelCls}>Title *</label>
            <input className={inputCls} value={form.title}
              onChange={(e) => { set('title', e.target.value); if (editingIndex === -1) set('slug', generateSlug(e.target.value)); }} />
          </div>
          <div>
            <label className={labelCls}>URL slug</label>
            <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value)} />
            <p className="text-xs text-gray-500 mt-1">/blog/{form.slug || 'your-post'}</p>
          </div>
          <div>
            <label className={labelCls}>Author</label>
            <input className={inputCls} value={form.author} onChange={(e) => set('author', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Publish date</label>
            <input type="date" className={inputCls} value={form.datePublished} onChange={(e) => set('datePublished', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Read time (auto if blank)</label>
            <input className={inputCls} placeholder="e.g. 6 min read" value={form.readTime} onChange={(e) => set('readTime', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Tags (comma separated)</label>
            <input className={inputCls} placeholder="Agentforce, Lead Generation" value={form.tags} onChange={(e) => set('tags', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Cover image URL</label>
            <div className="flex gap-2">
              <input className={inputCls} value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://..." />
              <label className="btn-secondary cursor-pointer whitespace-nowrap flex items-center px-3">
                {uploading ? <Loader2 className="animate-spin" size={16} /> : 'Upload'}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>
            {form.image && <img src={form.image} alt="preview" className="mt-2 h-32 rounded object-cover" />}
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Excerpt / summary *</label>
            <textarea className={inputCls} rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-1">
              <label className={labelCls + ' mb-0'}>Article body (Markdown)</label>
              <button type="button" className="text-sm text-brand flex items-center gap-1" onClick={() => setShowPreview((s) => !s)}>
                <Eye size={14} /> {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
            {showPreview ? (
              <div className="prose max-w-none border rounded-md p-4 min-h-[300px]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content || '_Nothing to preview yet._'}</ReactMarkdown>
              </div>
            ) : (
              <textarea className={inputCls + ' font-mono text-sm'} rows={16}
                placeholder={'## Heading\n\nWrite your article in Markdown.\n\n- Bullet points\n- **Bold** and [links](https://example.com)'}
                value={form.content} onChange={(e) => set('content', e.target.value)} />
            )}
            <p className="text-xs text-gray-500 mt-1">Markdown supported: # headings, **bold**, lists, [links](url), tables.</p>
          </div>

          <div>
            <label className={labelCls}>SEO title (optional)</label>
            <input className={inputCls} value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>SEO description (optional)</label>
            <input className={inputCls} value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
              Published (visible on site)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
              Make this the featured article
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button className="btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <><Loader2 className="animate-spin mr-2" size={16} /> Saving…</> : 'Save Post'}
          </Button>
          <Button variant="outline" onClick={() => setEditingIndex(null)} disabled={saving}>Cancel</Button>
        </div>
      </div>
    );
  }

  // ---------- List view ----------
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Blog Posts</h3>
          <p className="text-sm text-gray-500">Create and manage articles. Changes save to your live site.</p>
        </div>
        <Button className="btn-primary flex items-center gap-2" onClick={startNew}><Plus size={16} /> New Post</Button>
      </div>

      {list.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">No posts yet. Click “New Post” to write your first article.</p>
      ) : (
        <div className="divide-y">
          {list.map((p, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <img src={p.image} alt="" className="w-16 h-12 object-cover rounded bg-gray-100 flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  {p.__featured && <Star size={14} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                  <span className="font-medium truncate">{p.title}</span>
                  {p.published === false && <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">Draft</span>}
                </div>
                <p className="text-xs text-gray-500 truncate">/blog/{getPostSlug(p)} · {p.date}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(i)}><Pencil size={16} /></Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(i)}><Trash2 size={16} className="text-red-500" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager;
