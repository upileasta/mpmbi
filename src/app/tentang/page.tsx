"use client";

import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { motion } from "framer-motion";
import { Shield, Users, Heart, Lightbulb, Recycle } from "lucide-react";

export default function TentangPage() {
  const values = [
    { icon: <Shield />, title: "Profesionalitas", desc: "Menjunjung tinggi tanggung jawab, integritas, kompetensi, dan etika." },
    { icon: <Users />, title: "Kolaborasi", desc: "Membangun ruang kerja sama lintas sektor untuk manfaat bersama." },
    { icon: <Heart />, title: "Kebermanfaatan", desc: "Memberikan kontribusi nyata bagi pengembangan kapasitas masyarakat." },
    { icon: <Lightbulb />, title: "Inovasi", desc: "Mendorong pembaruan gagasan agar relevan dengan perubahan." },
    { icon: <Recycle />, title: "Keberlanjutan", desc: "Mendukung pengembangan bisnis yang memperhatikan aspek ekonomi, sosial, dan lingkungan." },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Membangun Ekosistem Manajemen Indonesia"
        description="MPMBI adalah organisasi profesi dan jejaring kolaboratif yang didedikasikan untuk penguatan praktik manajemen dan bisnis yang kredibel, aktif, dan relevan."
        imageUrl="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Profil & Visi Misi */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 mb-24">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Profil MPMBI</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Masyarakat Profesional Manajemen dan Bisnis Indonesia (MPMBI) berperan sebagai ruang pertemuan antara akademisi, praktisi, peneliti, mahasiswa, pelaku usaha, institusi, dan pemangku kepentingan.
                </p>
                <p>
                  Kami hadir untuk menjawab kebutuhan dunia kerja dan usaha dalam menghadapi perubahan lingkungan bisnis yang semakin dinamis. Melalui pendekatan kolaboratif, kami membangun ekosistem yang adaptif, etis, dan berkelanjutan.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4">Visi Kami</h2>
              <p className="text-2xl font-extrabold text-slate-900 leading-tight mb-10">
                Menjadi organisasi profesi dan jejaring kolaboratif terdepan dalam penguatan kapasitas profesional dan pembangunan ekonomi Indonesia yang berkelanjutan.
              </p>
              <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-6">Misi Kami</h2>
              <ul className="space-y-4">
                {[
                  "Menyelenggarakan pengembangan kompetensi manajemen dan bisnis.",
                  "Mendorong kolaborasi lintas sektor yang produktif.",
                  "Mengembangkan riset terapan dan diseminasi pengetahuan.",
                ].map((misi, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-xs">
                      {i+1}
                    </span>
                    <p className="text-slate-700 font-medium">{misi}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nilai Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Nilai Organisasi</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {values.map((n, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  {n.icon}
                </div>
                <h4 className="font-extrabold text-slate-900 mb-3">{n.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{n.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
