import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import {
  Layers,
  FileText,
  User,
  Shield,
  LogOut
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { AdminSidebarNav } from "./AdminSidebarNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin-portal-page");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between p-6 border-r border-slate-800 md:h-screen md:sticky md:top-0 overflow-y-auto">
        <div className="space-y-8">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 py-2 border-b border-slate-800">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-xl text-white">
              M
            </div>
            <div>
              <h2 className="font-black text-sm uppercase tracking-wider leading-tight text-slate-100">MPMBI Portal</h2>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Management</span>
            </div>
          </Link>

          {/* User Info */}
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm text-slate-200 truncate">{session.user.name || "Administrator"}</p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <Shield size={10} />
                <span>{(session.user as any).role || "ADMIN"}</span>
              </div>
            </div>
          </div>

          <AdminSidebarNav />
        </div>

        {/* Sign Out Button */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="mt-8 pt-4 border-t border-slate-800"
        >
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white font-bold text-sm transition-all border border-red-500/10 cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
