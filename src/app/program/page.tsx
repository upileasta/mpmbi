"use client";

import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { motion } from "framer-motion";
import { BookOpen, Users, Microscope, Newspaper, HeartHandshake, Briefcase, Share2 } from "lucide-react";

const programs = [
  {
    title: "Seminar, Webinar, dan Forum Diskusi",
    desc: "Membahas isu strategis manajemen, bisnis, kewirausahaan, SDM, keuangan, pemasaran, dan transformasi digital.",
    icon: <Users className="text-primary" />,
    color: "bg-primary/5",
  },
  {
    title: "Pelatihan Profesional",
    desc: "Leadership, strategic management, digital marketing, financial literacy, dan business analytics.",
    icon: <BookOpen className="text-secondary" />,
    color: "bg-secondary/5",
  },
  {
    title: "Riset Terapan dan Kajian Manajemen",
    desc: "Pelaksanaan riset terapan untuk mendukung pengambilan keputusan institusi, industri, dan UMKM.",
    icon: <Microscope className="text-primary" />,
    color: "bg-primary/5",
  },
  {
    title: "Publikasi dan Diseminasi Pengetahuan",
    desc: "Artikel ilmiah, policy brief, majalah, book chapter, dan rekomendasi manajerial.",
    icon: <Newspaper className="text-secondary" />,
    color: "bg-secondary/5",
  },
  {
    title: "Pendampingan UMKM dan Komunitas",
    desc: "Legalitas usaha, literasi keuangan, pemasaran digital, branding, dan tata kelola usaha.",
    icon: <HeartHandshake className="text-primary" />,
    color: "bg-primary/5",
  },
  {
    title: "Konsultansi dan Pengembangan Organisasi",
    desc: "Layanan perencanaan, evaluasi, dan pengembangan strategi bagi organisasi dan komunitas.",
    icon: <Briefcase className="text-secondary" />,
    color: "bg-secondary/5",
  },
  {
    title: "Kemitraan Akademik dan Profesional",
    desc: "Kerja sama dengan perguruan tinggi, industri, pemerintah, dan asosiasi profesi.",
    icon: <Share2 className="text-primary" />,
    color: "bg-primary/5",
  },
];

export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Program & Layanan" 
        description="Mendukung peningkatan kapasitas profesional, pengembangan riset terapan, dan penguatan jejaring kolaboratif di bidang manajemen dan bisnis." 
        imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Program Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16">
             <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1600" alt="Seminar/Training" className="w-full h-80 object-cover rounded-[2rem] shadow-xl" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-3xl border border-slate-100 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">
                  {program.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {program.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
