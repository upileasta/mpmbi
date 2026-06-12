"use client";

import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Globe, Send } from "lucide-react";
import { useState } from "react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    phone: "",
    purpose: "Informasi umum",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Terima kasih! Pesan Anda telah terkirim.");
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="Hubungi Kami"
        description="Buka ruang komunikasi untuk kolaborasi, riset, atau informasi program MPMBI."
        imageUrl="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1600"
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-8">Informasi Kontak</h2>
              <div className="space-y-4">
                {[
                  { icon: <MapPin size={24} className="text-primary" />, label: "Alamat", value: "Grand Slipi Tower, level 42 Unit G-H Jl. S Parman Kav 22-24, RT. 01 RW. 04 Kel. Palmerah Kec. Palmerah Jakarta Barat 11480" },
                  { icon: <Mail size={24} className="text-primary" />, label: "Email", value: "info@mpmbi.or.id" },
                  { icon: <Phone size={24} className="text-primary" />, label: "WhatsApp", value: "+62 813-8099-3100" },
                  { icon: <Globe size={24} className="text-primary" />, label: "Instagram", value: "@mpmbi_official" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start p-6 rounded-3xl bg-slate-50/80 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:bg-white transition-all duration-300 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1 mt-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-secondary transition-colors">{item.label}</p>
                      <p className="text-[15px] font-semibold text-slate-700 leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 border-2 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-slate-400 font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Instansi</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 border-2 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-slate-400 font-medium"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 border-2 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-slate-400 font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 border-2 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-slate-400 font-medium"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Jenis Keperluan</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 border-2 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-slate-400 font-medium bg-white"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  >
                    <option>Keanggotaan</option>
                    <option>Kerja sama</option>
                    <option>Seminar atau pelatihan</option>
                    <option>Publikasi</option>
                    <option>Riset dan pengabdian</option>
                    <option>Pendampingan UMKM</option>
                    <option>Informasi umum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pesan *</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 border-2 border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-slate-400 font-medium resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-lg shadow-primary/20"
                >
                  Kirim Pesan <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
