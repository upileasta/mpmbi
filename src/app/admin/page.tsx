import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 
  Calendar,
  Building,
  Shield
} from "lucide-react";
import { MemberApplication, ContactMessage } from "@prisma/client";

export default async function AdminDashboard() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/admin-portal-page");
  }

  let applications: MemberApplication[] = [];
  let messages: ContactMessage[] = [];
  let stats = { appsCount: 0, msgsCount: 0, postsCount: 0 };
  let dbError: string | null = null;

  try {
    const [
      appsData,
      msgsData,
      counts
    ] = await Promise.all([
      db.memberApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      }),
      db.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      }),
      Promise.all([
        db.memberApplication.count(),
        db.contactMessage.count(),
        db.post.count()
      ]).then(([appsCount, msgsCount, postsCount]) => ({
        appsCount,
        msgsCount,
        postsCount
      }))
    ]);

    applications = appsData;
    messages = msgsData;
    stats = counts;
  } catch (error) {
    console.error("Database fetch error in admin page:", error);
    dbError = error instanceof Error ? error.message : "Failed to connect to the database.";
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle size={14} /> Approved
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle size={14} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={14} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Welcome back, {session.user.name || "Administrator"}. Here is your portal overview.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm text-slate-600 font-bold text-sm">
            <Calendar size={16} />
            <span>{new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {dbError && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-amber-800 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
            <Shield className="text-amber-600 flex-shrink-0" size={32} />
            <div>
              <h3 className="font-extrabold text-lg">Database Connection Notice</h3>
              <p className="text-sm text-amber-700 mt-1">
                The application could not query details. Please ensure migrations are run: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold text-xs">{dbError}</code>
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <section className="grid sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Member Applications",
              count: stats.appsCount,
              icon: <Users size={24} className="text-primary" />,
              color: "border-primary/20 bg-primary/5",
            },
            {
              title: "Contact Messages",
              count: stats.msgsCount,
              icon: <MessageSquare size={24} className="text-secondary" />,
              color: "border-secondary/20 bg-secondary/5",
            },
            {
              title: "Blog & Publications",
              count: stats.postsCount,
              icon: <FileText size={24} className="text-slate-700" />,
              color: "border-slate-200 bg-slate-100/50",
            },
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-3xl border bg-white shadow-sm flex items-center justify-between`}>
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">{stat.title}</p>
                <p className="text-4xl font-black text-slate-900">{stat.count}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </section>

        {/* Detailed Data Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Member Applications */}
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900 tracking-tight flex items-center gap-2">
                <Users size={20} className="text-primary" /> Recent Applications
              </h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded-lg">Last 5</span>
            </div>

            <div className="space-y-4">
              {applications.length === 0 ? (
                <div className="text-center py-10 text-slate-400 font-medium text-sm">
                  No applications found.
                </div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-slate-900">{app.fullName}</h4>
                        <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                          <Building size={12} /> {app.institution || "No Institution"} • {app.category}
                        </p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-semibold pt-2 border-t border-slate-200/50">
                      <span className="flex items-center gap-1"><Mail size={12} /> {app.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12} /> {app.phone}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Recent Contact Messages */}
          <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900 tracking-tight flex items-center gap-2">
                <MessageSquare size={20} className="text-secondary" /> Recent Messages
              </h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded-lg">Last 5</span>
            </div>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-10 text-slate-400 font-medium text-sm">
                  No contact messages found.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-slate-900">{msg.name}</h4>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {new Date(msg.createdAt).toLocaleDateString("id-ID", { dateStyle: "short" })}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-extrabold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-100 inline-block">{msg.subject}</p>
                    <p className="text-sm text-slate-600 leading-relaxed italic line-clamp-2 bg-white/40 p-2.5 rounded-xl border border-slate-100/30">
                      &quot;{msg.message}&quot;
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-semibold pt-1">
                      <span className="flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12} /> {msg.phone}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
    </div>
  );
}
