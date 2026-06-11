"use client";

import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { motion } from "framer-motion";
import { FileText, Book, Layout, Newspaper, ClipboardList, Share2 } from "lucide-react";


const publications = [
  {
    type: "Artikel Ilmiah & Populer",
    desc: "Tulisan berbasis kajian, pengalaman praktik, atau hasil riset untuk pembaca akademik maupun umum.",
    icon: <FileText className="text-primary" />,
  },
  {
    type: "Policy Brief",
    desc: "Ringkasan kebijakan berbasis kajian untuk pemerintah, institusi, industri, dan pemangku kepentingan.",
    icon: <ClipboardList className="text-secondary" />,
  },
  {
    type: "Majalah MPMBI",
    desc: "Media berkala yang memuat artikel, opini, profil anggota, dan praktik baik manajemen.",
    icon: <Newspaper className="text-primary" />,
  },
  {
    type: "Book Chapter & Buku",
    desc: "Publikasi kolektif yang melibatkan akademisi, praktisi, peneliti, dan anggota MPMBI.",
    icon: <Book className="text-secondary" />,
  },
  {
    type: "Laporan Kegiatan",
    desc: "Dokumentasi seminar, pelatihan, riset, PkM, pendampingan, dan kerja sama.",
    icon: <Layout className="text-primary" />,
  },
  {
    type: "Jurnal Mitra",
    desc: "Informasi media publikasi yang bekerja sama dalam diseminasi hasil kajian.",
    icon: <Share2 className="text-secondary" />,
  },
];

export default function PublikasiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Pusat Pengetahuan & Diseminasi" 
        description="Publikasi MPMBI menjembatani pemikiran akademik dan kebutuhan praktik profesional melalui berbagai media diseminasi yang kredibel." 
        imageUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Publication Types */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-10 rounded-3xl border border-slate-100 bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{p.type}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">{p.desc}</p>
                <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Lihat Selengkapnya <span className="text-lg leading-none">→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News / Research Articles */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-12 text-slate-900">Publikasi Terbaru</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            {[
              {
                title: "Nusa Putra University dan Eastasouth Institute Perkuat Kolaborasi Publikasi Ilmiah",
                cat: "Kerja Sama",
                date: "2026",
              },
              {
                title: "Sustainability Management sebagai Kompetensi Baru Profesional Bisnis",
                cat: "Insight",
                date: "2026",
              },
            ].map((news, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl flex flex-col sm:flex-row gap-8 items-center border border-slate-200">
                <div className="w-full sm:w-40 h-40 bg-slate-100 rounded-2xl shrink-0 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-${i === 0 ? '1557804506-669a67965ba0' : '1551836022-d5d8b5c82fdd'}?auto=format&fit=crop&q=80&w=400`} alt="Article" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">{news.cat} • {news.date}</span>
                  <h4 className="text-xl font-bold text-slate-900 mt-2 mb-4 leading-snug">{news.title}</h4>
                  <button className="text-primary font-bold text-sm">Baca Publikasi</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
