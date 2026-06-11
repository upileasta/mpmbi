"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Beranda", href: "/" },
  {
    name: "Profil",
    href: "#",
    children: [
      { name: "Tentang MPMBI", href: "/tentang" },
      { name: "Kolaborasi Strategis", href: "/kolaborasi" },
    ],
  },
  {
    name: "Layanan",
    href: "#",
    children: [
      { name: "Program & Layanan", href: "/program" },
      { name: "Riset & Pengabdian", href: "/riset" },
      { name: "Agenda Acara", href: "/acara" },
    ],
  },
  {
    name: "Insight",
    href: "#",
    children: [
      { name: "Artikel", href: "/artikel" },
      { name: "Berita", href: "/news" },
      { name: "Publikasi", href: "/publikasi" },
    ],
  },
  { name: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-4 group">
            <img
              src="/logo.png"
              alt="MPMBI Logo"
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col justify-center border-l border-slate-200 pl-4 h-12">
              <span className="text-[14px] font-black text-primary uppercase leading-tight tracking-tight">
                Masyarakat Professional
              </span>
              <span className="text-[12px] font-bold text-secondary uppercase leading-tight tracking-wider">
                Manajemen & Bisnis Indonesia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const hasChildren = !!item.children;
              const isActive = pathname === item.href || item.children?.some(child => pathname === child.href);

              return (
                <div
                  key={item.name}
                  className="relative group/nav"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold transition-all rounded-full",
                      isActive ? "text-primary" : "text-slate-600 hover:text-primary hover:bg-slate-50"
                    )}
                  >
                    {item.name}
                    {hasChildren && (
                      <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === item.name && "rotate-180")} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasChildren && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-60 mt-1 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 p-2 z-50"
                        >
                          {item.children?.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "block px-4 py-3 text-sm font-semibold rounded-xl transition-all",
                                pathname === child.href ? "bg-slate-100 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/keanggotaan"
              className="bg-primary hover:bg-primary/95 text-white px-7 py-3 rounded-full text-sm font-black transition-all shadow-lg shadow-primary/20 hover:shadow-xl active:scale-95 inline-block"
            >
              GABUNG SEKARANG
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navigation.map((item) => (
                <div key={item.name} className="flex flex-col space-y-2">
                  {item.children ? (
                    <>
                      <span className="px-4 text-xs font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "px-4 py-3 rounded-xl text-base font-bold",
                            pathname === child.href ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-base font-bold",
                        pathname === item.href ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/keanggotaan"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white text-center py-4 rounded-xl font-black shadow-lg"
              >
                GABUNG SEKARANG
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
