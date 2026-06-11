"use client";

import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { motion } from "framer-motion";
import { Microscope, Users, Globe, BarChart4, Briefcase, Zap } from "lucide-react";

const clusters = [
  {
    title: "Sustainability Management",
    focus: "Keberlanjutan bisnis, ESG, impact assessment, green business, dan tata kelola berkelanjutan.",
    icon: <Globe size={32} className="text-secondary" />,
  },
  {
    title: "Human Resource Management",
    focus: "Pengelolaan SDM, talent management, workforce analytics, kepemimpinan, dan perilaku organisasi.",
    icon: <Users size={32} className="text-primary" />,
  },
  {
    title: "Change and Innovation",
    focus: "Manajemen perubahan, inovasi proses, agile project management, dan transformasi organisasi.",
    icon: <Zap size={32} className="text-secondary" />,
  },
  {
    title: "Financial Management",
    focus: "Literasi keuangan, kinerja keuangan, manajemen risiko, sustainable finance, dan pembiayaan UMKM.",
    icon: <BarChart4 size={32} className="text-primary" />,
  },
  {
    title: "Marketing Management",
    focus: "Perilaku konsumen, strategi merek, digital marketing, komunikasi pemasaran, dan daya saing usaha.",
    icon: <Microscope size={32} className="text-secondary" />,
  },
  {
    title: "Business Intelligence",
    focus: "Analisis data manajerial, forecasting, predictive analytics, dan pengambilan keputusan berbasis data.",
    icon: <Briefcase size={32} className="text-primary" />,
  },
];

export default function RisetPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Riset Terapan & Pengabdian Masyarakat" 
        description="Membangun kontribusi nyata melalui kolaborasi riset yang menjawab kebutuhan dunia usaha, industri, pemerintah, dan komunitas." 
        imageUrl="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Intro */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[3rem]" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="bg-primary text-white p-12 rounded-[2rem] shadow-2xl">
                <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Menjembatani Akademik & Praktik</h2>
                <div className="space-y-6 text-slate-200 leading-relaxed">
                  <p>
                    Program riset dan pengabdian MPMBI diarahkan untuk menghasilkan luaran yang aplikatif. Kami percaya bahwa pengetahuan harus dapat diimplementasikan untuk memecahkan persoalan nyata di lapangan.
                  </p>
                  <p>
                    Melalui kolaborasi antara akademisi, praktisi, dan mahasiswa, kami menghasilkan artikel ilmiah, policy brief, modul pelatihan, hingga model pendampingan UMKM yang berkelanjutan.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200" alt="Laboratory/Research" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clusters */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4">Klaster Riset</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">Fokus Kajian Strategis</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clusters.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all group flex flex-col items-start"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-primary/5 transition-colors">
                  {c.icon}
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-4">{c.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{c.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
