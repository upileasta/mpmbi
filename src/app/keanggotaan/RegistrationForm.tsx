"use client";

import { useActionState } from "react";
import { submitRegistration } from "@/app/actions/member";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function RegistrationForm() {
  const [state, action, isPending] = useActionState(async (prevState: unknown, formData: FormData) => {
    return await submitRegistration(formData);
  }, null);

  if (state?.success) {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl flex flex-col items-center text-center space-y-4 border border-emerald-100">
        <CheckCircle className="w-16 h-16 text-emerald-500" />
        <div>
          <h3 className="text-xl font-bold mb-2">Pendaftaran Berhasil!</h3>
          <p>{state.message}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition"
        >
          Daftar Baru
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
      
      {state?.error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium">{state.error}</p>
        </div>
      )}

      {/* HONEYPOT FIELD - Visually Hidden */}
      <div className="absolute opacity-0 -z-50 pointer-events-none" aria-hidden="true">
        <label htmlFor="website_url">Website URL</label>
        <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-1">
        <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
        <input 
          type="text" 
          id="fullName" 
          name="fullName" 
          required 
          disabled={isPending}
          className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-slate-400 font-medium"
          placeholder="Cth: John Doe"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Aktif</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            disabled={isPending}
            className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-slate-400 font-medium"
            placeholder="nama@email.com"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-semibold text-slate-700">No. WhatsApp</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            disabled={isPending}
            className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-slate-400 font-medium"
            placeholder="08123456789"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="category" className="text-sm font-semibold text-slate-700">Kategori Pendaftar</label>
        <select 
          id="category" 
          name="category" 
          required
          disabled={isPending}
          className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-slate-400 font-medium appearance-none"
        >
          <option value="">Pilih Kategori...</option>
          <option value="Mahasiswa">Mahasiswa</option>
          <option value="Akademisi/Dosen">Akademisi / Dosen</option>
          <option value="Profesional/Praktisi">Profesional / Praktisi Industri</option>
          <option value="Pemilik UMKM">Pemilik UMKM</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="institution" className="text-sm font-semibold text-slate-700">Nama Institusi / Perusahaan <span className="text-slate-400 font-normal">(Opsional)</span></label>
        <input 
          type="text" 
          id="institution" 
          name="institution" 
          disabled={isPending}
          className="w-full px-4 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-slate-400 font-medium"
          placeholder="Cth: Universitas Nusa Putra / PT Makmur Jaya"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Mengirim Data...
          </>
        ) : (
          "Gabung Menjadi Anggota"
        )}
      </button>

      <p className="text-xs text-center text-slate-400 mt-4">
        Data Anda dilindungi secara aman. Kami tidak akan membagikan informasi Anda kepada pihak ketiga.
      </p>
    </form>
  );
}
