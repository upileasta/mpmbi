"use client";

import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, ArrowRight } from "lucide-react";

const events = [
  {
    type: "Seminar Nasional",
    title: "Membangun Ekosistem Manajemen Bisnis yang Berkelanjutan",
    date: "TBA 2026",
    location: "Online / Jakarta",
    speaker: "Panel Ahli MPMBI",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
  },
  {
    type: "Webinar Bulanan",
    title: "Strategi Digital Marketing untuk UMKM di Era Transformasi",
    date: "Setiap Bulan",
    location: "Zoom Meeting",
    speaker: "Praktisi & Akademisi",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
];

export default function AcaraPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <PageHero 
        title="Agenda Kegiatan" 
        description="Ruang belajar, berbagi pengalaman, dan memperluas jejaring melalui berbagai kegiatan strategis MPMBI." 
        imageUrl="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Events List */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row hover:shadow-2xl transition-all"
              >
                <div className="sm:w-1/2 h-64 sm:h-auto relative overflow-hidden">
                  <img src={event.image} alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{event.type}</span>
                  </div>
                </div>
                <div className="sm:w-1/2 p-8 flex flex-col">
                  <h4 className="text-xl font-extrabold text-slate-900 mb-6 leading-snug group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                      <Calendar size={16} className="text-secondary" /> {event.date}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                      <MapPin size={16} className="text-secondary" /> {event.location}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                      <User size={16} className="text-secondary" /> {event.speaker}
                    </div>
                  </div>
                  <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2">
                    Daftar Sekarang <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Support */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Ingin Berkolaborasi Mengadakan Acara?</h3>
            <p className="text-slate-600 mb-10">
              MPMBI membuka ruang kerja sama dengan perguruan tinggi, perusahaan, dan institusi untuk menyelenggarakan seminar atau pelatihan kolaboratif.
            </p>
            <button className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
              Hubungi Tim Kerjasama
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
