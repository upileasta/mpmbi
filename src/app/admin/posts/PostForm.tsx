"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "./actions";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { TiptapEditor } from "./TiptapEditor";

const CATEGORIES = [
  "INSIGHT",
  "UMKM",
  "SUSTAINABILITY",
  "HRM",
  "MARKETING",
  "FINANCE",
  "ANALYTICS",
  "RESEARCH",
  "KEGIATAN",
  "KOLABORASI"
];

const TYPES = ["BLOG", "NEWS", "PUBLICATION"];

interface PostData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: string;
  category: string;
  published: boolean;
  imageUrl: string;
}

export function PostForm({ initialData }: { initialData?: PostData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState("");
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    type: initialData?.type || "BLOG",
    category: initialData?.category || "INSIGHT",
    published: initialData?.published || false,
    imageUrl: initialData?.imageUrl || "",
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      }
    } catch (err) {
      console.error(err);
      alert('Gagal mengupload cover');
    } finally {
      setUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (initialData?.id) {
        await updatePost(initialData.id, formData);
      } else {
        await createPost(formData);
      }
      router.push("/admin/posts");
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="p-2 bg-slate-50 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <h2 className="text-2xl font-black text-slate-900">
          {initialData ? "Edit Post" : "Create New Post"}
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold placeholder-slate-400"
              placeholder="Post title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Slug (URL)</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold placeholder-slate-400 font-mono text-sm"
              placeholder="post-url-slug"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold placeholder-slate-400"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold placeholder-slate-400"
            >
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Cover Image</label>
          <div className="flex items-center gap-4">
            <input 
              type="file" 
              accept="image/*" 
              ref={coverInputRef} 
              onChange={handleCoverUpload} 
              className="hidden" 
            />
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              disabled={uploadingCover}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border border-slate-200"
            >
              {uploadingCover ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
              Upload Cover
            </button>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="flex-1 px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold placeholder-slate-400 text-sm"
              placeholder="Or paste an image URL..."
            />
          </div>
          {formData.imageUrl && (
            <div className="mt-4 w-40 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">

              <img src={formData.imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Excerpt (Short Summary)</label>
          <textarea
            required
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold placeholder-slate-400 resize-none"
            placeholder="A short summary of the article..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Content</label>
          <TiptapEditor
            content={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
          />
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-5 h-5 rounded text-primary focus:ring-primary border-slate-300"
          />
          <label htmlFor="published" className="text-sm font-bold text-slate-700 cursor-pointer">
            Publish Immediately
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-black transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "SAVING..." : (
              <>
                <Save size={20} />
                {initialData ? "UPDATE POST" : "CREATE POST"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
