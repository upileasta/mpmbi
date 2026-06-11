"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Lightbulb, 
  Store, 
  Leaf, 
  Users, 
  Megaphone, 
  Wallet, 
  LineChart, 
  BookOpen, 
  Handshake, 
  Tag 
} from "lucide-react";

const getCategoryConfig = (category: string) => {
  const cat = category?.toUpperCase() || "";
  
  if (cat.includes("INSIGHT")) return { color: "bg-purple-100 text-purple-700 border-purple-200", icon: Lightbulb };
  if (cat.includes("UMKM")) return { color: "bg-orange-100 text-orange-700 border-orange-200", icon: Store };
  if (cat.includes("SUSTAINABILITY")) return { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: Leaf };
  if (cat.includes("HRM")) return { color: "bg-rose-100 text-rose-700 border-rose-200", icon: Users };
  if (cat.includes("MARKETING")) return { color: "bg-pink-100 text-pink-700 border-pink-200", icon: Megaphone };
  if (cat.includes("FINANCE")) return { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Wallet };
  if (cat.includes("ANALYTICS")) return { color: "bg-cyan-100 text-cyan-700 border-cyan-200", icon: LineChart };
  if (cat.includes("RESEARCH")) return { color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: BookOpen };
  if (cat.includes("KOLABORASI")) return { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Handshake };
  
  return { color: "bg-slate-100 text-slate-700 border-slate-200", icon: Tag };
};

export function AnimatedArticleList({ articles, basePath = "/artikel" }: { articles: any[], basePath?: string }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
        <h3 className="text-xl font-bold text-slate-400">Belum ada konten yang dipublikasikan di kategori ini.</h3>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {articles.map((article, i) => {
        const { color, icon: Icon } = getCategoryConfig(article.category);
        
        return (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="group cursor-pointer flex flex-col"
          >
            <Link href={`${basePath}/${article.slug}`} className="block relative">
              <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 relative bg-slate-100 shadow-sm border border-slate-100/50">
                {article.imageUrl ? (
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <Icon size={64} className="text-slate-300 group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
                </div>
              )}
              
              {/* Redesigned Tag */}
              <div className="absolute top-4 left-4">
                <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-sm border backdrop-blur-md ${color} bg-opacity-90`}>
                  <Icon size={14} strokeWidth={2.5} />
                  <span className="text-[11px] font-black uppercase tracking-wider">{article.category}</span>
                </div>
                </div>
              </div>
            </Link>
            
            <div className="flex-1 flex flex-col">
              <Link href={`${basePath}/${article.slug}`}>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                {article.excerpt}
              </p>
              <Link 
                href={`${basePath}/${article.slug}`} 
                className="text-primary font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all mt-auto"
              >
                Baca Selengkapnya <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
