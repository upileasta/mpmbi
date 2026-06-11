"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, FileText, User } from "lucide-react";

export function AdminSidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <Layers size={18} /> },
    { name: "Posts", href: "/admin/posts", icon: <FileText size={18} /> },
    { name: "Pendaftar", href: "/admin/members", icon: <User size={18} /> },
  ];

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        // Active condition: 
        // For dashboard (/admin) it must exactly match, otherwise /admin/posts will also highlight /admin
        // For others, we can check if pathname starts with the href
        const isActive = item.href === "/admin"
          ? pathname === "/admin"
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive
                ? "bg-slate-800 text-white font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/30 font-semibold"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
