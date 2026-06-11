"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, GraduationCap, Microscope, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-20 lg:pb-24">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                Menghubungkan Profesional, <br />
                <span className="text-primary italic">Menggerakkan Indonesia</span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Wadah kolaboratif untuk memperkuat kapasitas manajemen dan bisnis melalui pengembangan kompetensi, riset terapan, dan pengabdian lintas sektor.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <Link
                  href="/keanggotaan"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Bergabung Bersama Kami
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/program"
                  className="w-full sm:w-auto bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-900 px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center"
                >
                  Pelajari Program
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex-1 relative"
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border-8 border-white"
              >
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200" 
                  alt="Association Networking Meeting"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </motion.div>
              {/* Decorative Card 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 z-20 hidden lg:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Jejaring Aktif</p>
                    <p className="text-xs text-slate-500">Jejaring Profesional Luas</p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative Card 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 z-20 hidden lg:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Microscope size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Riset Terapan</p>
                    <p className="text-xs text-slate-500">Solusi Berbasis Data</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Logo Section (Collaborators) */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">
            Kolaborator Strategis & Mitra
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
            <img src="/nusaputra.png" alt="Nusa Putra University" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/eastasouth.png" alt="Eastasouth Institute" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/westscience.png" alt="West Science Press" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/magester.png" alt="Magister Manajemen" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4">Empat Pilar Utama</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Membangun Ekosistem Manajemen yang Adaptif</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              MPMBI hadir untuk mempertemukan dunia akademik dan industri dalam membangun praktik bisnis yang etis, berbasis data, dan berkelanjutan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Kolaborasi Lintas Bidang",
                desc: "Mempertemukan akademisi, praktisi, dan pemerintah untuk solusi manajerial produktif.",
                icon: <Users className="text-primary" size={32} />,
                color: "bg-primary/5",
              },
              {
                title: "Peningkatan Kapasitas",
                desc: "Pengembangan kompetensi melalui seminar, sertifikasi, dan workshop kepemimpinan.",
                icon: <GraduationCap className="text-secondary" size={32} />,
                color: "bg-secondary/5",
              },
              {
                title: "Riset & Inovasi",
                desc: "Mendukung pengembangan riset terapan dan publikasi ilmiah yang relevan.",
                icon: <Microscope className="text-primary" size={32} />,
                color: "bg-primary/5",
              },
              {
                title: "Pertumbuhan Berkelanjutan",
                desc: "Mendorong praktik bisnis yang memperhatikan aspek ekonomi, sosial, and lingkungan.",
                icon: <TrendingUp className="text-secondary" size={32} />,
                color: "bg-secondary/5",
              },
            ].map((pilar, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${pilar.color} rounded-2xl flex items-center justify-center mb-8`}>
                  {pilar.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{pilar.title}</h4>
                <p className="text-slate-600 leading-relaxed">{pilar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="bg-primary py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">Kolaborasi Strategis</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-8">
                MPMBI & Program Studi Magister Manajemen Universitas Nusa Putra
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-10">
                Kerja sama dalam penguatan tridharma perguruan tinggi, meliputi pendidikan, penelitian, pengabdian masyarakat, dan pengembangan jejaring profesional lintas institusi.
              </p>
              <Link
                href="/kolaborasi"
                className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-white pb-1 hover:text-slate-200 transition-colors"
              >
                Pelajari Selengkapnya <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[
                "Seminar & Kuliah Praktisi",
                "Riset Terapan Bersama",
                "Pendampingan UMKM",
                "Publikasi Artikel Populer",
                "Jejaring Industri",
                "Pengabdian Masyarakat",
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-white font-semibold text-center hover:bg-white/20 transition-colors">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
