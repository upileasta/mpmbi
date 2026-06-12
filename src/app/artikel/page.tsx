import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { AnimatedArticleList } from "@/components/animated-article-list";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

const categories = [
  "INSIGHT",
  "UMKM",
  "SUSTAINABILITY",
  "HRM",
  "MARKETING",
  "FINANCE",
  "ANALYTICS",
  "RESEARCH"
];

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams.cat as string | undefined;

  const whereClause: Prisma.PostWhereInput = { published: true, type: "BLOG" };
  
  if (categoryFilter && categories.includes(categoryFilter.toUpperCase())) {
    whereClause.category = categoryFilter.toUpperCase() as Prisma.PostWhereInput["category"];
  }

  const articles = await db.post.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Artikel & Insight" 
        description="Tulisan ilmiah, opini praktisi, dan panduan manajemen dari para profesional MPMBI." 
        imageUrl="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Categories Bar */}
      <section className="py-6 border-b border-slate-100 sticky top-20 bg-white/80 backdrop-blur-md z-40 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 min-w-max pb-2">
            <Link href="/artikel" className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold transition-all shadow-md">Semua</Link>
            {categories.map((c, i) => (
              <Link href={`/artikel?cat=${c}`} key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-100 hover:text-primary transition-all border border-slate-200">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedArticleList articles={articles} basePath="/artikel" />
        </div>
      </section>
    </main>
  );
}
