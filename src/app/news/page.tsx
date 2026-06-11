import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { AnimatedArticleList } from "@/components/animated-article-list";
import { db } from "@/lib/db";

const categories = [
  "KOLABORASI",
  "KEGIATAN"
];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams.cat as string | undefined;

  const whereClause: any = { published: true, type: "NEWS" };
  
  if (categoryFilter && categories.includes(categoryFilter.toUpperCase())) {
    whereClause.category = categoryFilter.toUpperCase();
  }

  const articles = await db.post.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Berita & Kolaborasi" 
        description="Pembaruan terbaru, kegiatan institusi, dan rekam jejak kerja sama dari MPMBI." 
        imageUrl="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Categories Bar */}
      <section className="py-6 border-b border-slate-100 sticky top-20 bg-white/80 backdrop-blur-md z-40 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 min-w-max pb-2">
            <a href="/news" className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold transition-all shadow-md">Semua</a>
            {categories.map((c, i) => (
              <a href={`/news?cat=${c}`} key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-100 hover:text-primary transition-all border border-slate-200">
                {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedArticleList articles={articles} basePath="/news" />
        </div>
      </section>
    </main>
  );
}
