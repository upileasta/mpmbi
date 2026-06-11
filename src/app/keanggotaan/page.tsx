import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { RegistrationForm } from "./RegistrationForm";

export default function KeanggotaanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <PageHero 
        title="Bergabung Bersama MPMBI" 
        description="Jadilah bagian dari ekosistem profesional manajemen dan bisnis di Indonesia. Kembangkan jejaring, kompetensi, dan wawasan Anda." 
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600"
      />

      <section className="py-24 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Kiri: Informasi */}
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Membangun Ekosistem Bisnis yang Berkelanjutan</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  MPMBI membuka kesempatan bagi akademisi, profesional, mahasiswa, dan pelaku UMKM untuk berkolaborasi dan mengembangkan praktik manajemen terbaik di Indonesia.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    title: "Jejaring Profesional",
                    desc: "Terhubung dengan para ahli, akademisi, dan praktisi industri dari seluruh Indonesia.",
                  },
                  {
                    title: "Peningkatan Kompetensi",
                    desc: "Akses eksklusif ke berbagai pelatihan, seminar, dan workshop kepemimpinan dan manajemen.",
                  },
                  {
                    title: "Kolaborasi Riset & Bisnis",
                    desc: "Kesempatan untuk berpartisipasi dalam riset terapan dan proyek pengabdian masyarakat.",
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-xl">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan: Form Pendaftaran */}
            <div className="w-full lg:w-[500px] xl:w-[550px] lg:sticky lg:top-32">
              <RegistrationForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
