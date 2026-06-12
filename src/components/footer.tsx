"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="MPMBI Logo" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white leading-tight tracking-tighter">MPMBI</span>
                <span className="text-[9px] text-secondary font-bold uppercase tracking-widest leading-none">Masyarakat Professional</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Masyarakat Professional Manajemen & Bisnis Indonesia
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors text-white"><Globe size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors text-white"><Share2 size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Menu Cepat</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/tentang" className="hover:text-white transition-colors">Tentang MPMBI</Link></li>
              <li><Link href="/tentang" className="hover:text-white transition-colors">Visi dan Misi</Link></li>
              <li><Link href="/keanggotaan" className="hover:text-white transition-colors">Keanggotaan</Link></li>
              <li><Link href="/program" className="hover:text-white transition-colors">Program dan Layanan</Link></li>
              <li><Link href="/riset" className="hover:text-white transition-colors">Riset dan Pengabdian</Link></li>
              <li><Link href="/publikasi" className="hover:text-white transition-colors">Publikasi</Link></li>
              <li><Link href="/acara" className="hover:text-white transition-colors">Acara</Link></li>
              <li><Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Program Utama</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/acara" className="hover:text-white transition-colors">Seminar dan Webinar</Link></li>
              <li><Link href="/program" className="hover:text-white transition-colors">Pelatihan Profesional</Link></li>
              <li><Link href="/riset" className="hover:text-white transition-colors">Riset Terapan</Link></li>
              <li><Link href="/publikasi" className="hover:text-white transition-colors">Publikasi</Link></li>
              <li><Link href="/program" className="hover:text-white transition-colors">Pendampingan UMKM</Link></li>
              <li><Link href="/program" className="hover:text-white transition-colors">Konsultansi Manajemen</Link></li>
              <li><Link href="/kolaborasi" className="hover:text-white transition-colors">Kolaborasi Akademik</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-secondary shrink-0" />
                <span className="text-slate-400 leading-snug">Grand Slipi Tower, level 42 Unit G-H Jl. S Parman Kav 22-24, RT. 01 RW. 04 Kel. Palmerah Kec. Palmerah Jakarta Barat 11480</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-secondary shrink-0" />
                <span className="text-slate-400">info@mpmbi.or.id</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-secondary shrink-0" />
                <span className="text-slate-400">+62 813-8099-3100</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">
            Copyright © 2026 MPMBI. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500 font-medium">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
