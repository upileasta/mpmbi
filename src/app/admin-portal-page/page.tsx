"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah.");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("Terjadi kesalahan teknis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-10 border border-white relative z-10 text-slate-900"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <Lock className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
            MPMBI Management
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-8 text-center font-bold border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 
                className="w-full pl-12 pr-4 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold placeholder-slate-400 shadow-sm"
                placeholder="username"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 
                className="w-full pl-12 pr-4 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold placeholder-slate-400 shadow-sm"
                placeholder="password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3 group"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN TO DASHBOARD"}
            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link href="/" className="text-slate-400 text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest">
            ← Back to Public Site
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
