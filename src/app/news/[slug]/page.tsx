import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  
  if (!post) return { title: "Not Found" };
  
  return {
    title: `${post.title} - MPMBI`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await db.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Find author if needed. Since authorId is stored, we might want to fetch it.
  let authorName = "Administrator MPMBI";
  if (post.authorId) {
    const author = await db.user.findUnique({ where: { id: post.authorId } });
    if (author?.name) authorName = author.name;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-12 pb-8 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> Kembali ke Berita
          </Link>
          
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
              {post.category}
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-black uppercase tracking-widest">
              {post.type}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.imageUrl && (
        <section className="container mx-auto px-4 max-w-5xl -mt-8 relative z-10">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 bg-slate-100 border-4 border-white">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {post.excerpt && (
            <div className="text-xl font-medium text-slate-600 leading-relaxed mb-12 italic border-l-4 border-primary pl-6 py-2 bg-slate-50 rounded-r-xl">
              {post.excerpt}
            </div>
          )}
          
          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />
        </div>
      </section>
    </main>
  );
}
