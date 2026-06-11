"use client";

import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { BookOpen, Microscope, Handshake, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function KolaborasiPage() {
  const focusAreas = [
    { title: "Pendidikan & Kuliah Praktisi", desc: "Seminar tematik dan forum berbagi pengalaman untuk memperkaya pembelajaran mahasiswa.", icon: <BookOpen className="text-secondary" /> },
    { title: "Penelitian & Publikasi", desc: "Riset terapan, artikel ilmiah, policy brief, dan laporan kajian kolaboratif.", icon: <Microscope className="text-secondary" /> },
    { title: "Pengabdian Masyarakat", desc: "Pendampingan UMKM, literasi keuangan, dan digitalisasi usaha.", icon: <Handshake className="text-secondary" /> },
    { title: "Jejaring Profesional", desc: "Ruang interaksi antara dosen, alumni, praktisi, dan institusi mitra.", icon: <Users className="text-secondary" /> },
    { title: "Penguatan Kompetensi", desc: "Proyek berbasis kasus nyata untuk mahasiswa dan dosen.", icon: <Award className="text-secondary" /> },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Kolaborasi Strategis"
        description="Sinergi antara MPMBI dan Program Studi Magister Manajemen Universitas Nusa Putra dalam penguatan Tridharma Perguruan Tinggi."
        imageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Focus Areas List */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4">Penghubung Akademisi & Praktisi</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Kerja sama ini diarahkan untuk memperkuat keterhubungan antara dunia akademik dan praktik profesional, memastikan luaran pendidikan dan riset relevan dengan kebutuhan industri dan masyarakat.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {focusAreas.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 flex gap-6 items-center hover:shadow-2xl transition-all"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
