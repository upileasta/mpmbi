import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { CheckCircle, Clock, XCircle, Mail, Phone } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Search } from "@/components/datatable/search";
import { Pagination } from "@/components/datatable/pagination";
import { SortableHeader } from "@/components/datatable/sortable-header";

// Server action to update status
async function updateStatus(id: string, newStatus: string) {
  "use server";
  await db.memberApplication.update({
    where: { id },
    data: { status: newStatus },
  });
  revalidatePath("/admin/members");
}

const ITEMS_PER_PAGE = 10;

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const statusFilter = resolvedSearchParams.status as string | undefined;
  const query = (resolvedSearchParams.query as string) || "";
  const page = Number(resolvedSearchParams.page) || 1;
  
  // Sorting options
  const sortColumn = (resolvedSearchParams.sort as string) || "createdAt";
  const sortOrder = (resolvedSearchParams.order as "asc" | "desc") || "desc";

  // Build the where clause
  const whereClause: Prisma.MemberApplicationWhereInput = {
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(query ? {
      OR: [
        { fullName: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { institution: { contains: query, mode: "insensitive" } },
      ]
    } : {})
  };

  const skip = (page - 1) * ITEMS_PER_PAGE;

  // Execute queries in parallel
  const [members, totalCount] = await Promise.all([
    db.memberApplication.findMany({
      where: whereClause,
      orderBy: { [sortColumn]: sortOrder },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    db.memberApplication.count({ where: whereClause })
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pendaftaran Keanggotaan</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">
          Kelola dan lihat data calon anggota yang mendaftar melalui website.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-8">
        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <Search placeholder="Cari nama, email, atau institusi..." />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <a href="/admin/members" className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!statusFilter ? 'bg-primary text-white shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>Semua</a>
            <a href="/admin/members?status=PENDING" className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${statusFilter === 'PENDING' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>Menunggu</a>
            <a href="/admin/members?status=CONTACTED" className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${statusFilter === 'CONTACTED' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>Dihubungi</a>
          </div>
        </div>

        {/* DataTable */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-sm text-slate-600">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wider text-xs font-black">
                <SortableHeader label="Nama & Kontak" column="fullName" currentSort={sortColumn} currentOrder={sortOrder} searchParams={resolvedSearchParams} />
                <SortableHeader label="Kategori" column="category" currentSort={sortColumn} currentOrder={sortOrder} searchParams={resolvedSearchParams} />
                <SortableHeader label="Tanggal Daftar" column="createdAt" currentSort={sortColumn} currentOrder={sortOrder} searchParams={resolvedSearchParams} />
                <SortableHeader label="Status" column="status" currentSort={sortColumn} currentOrder={sortOrder} searchParams={resolvedSearchParams} />
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                    {query ? "Pendaftar tidak ditemukan." : "Belum ada data pendaftar."}
                  </td>
                </tr>
              ) : members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-slate-900 text-base mb-1">{member.fullName}</div>
                    <div className="flex flex-col gap-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5"><Mail size={12}/> {member.email}</span>
                      <span className="flex items-center gap-1.5"><Phone size={12}/> {member.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold text-xs mb-1">
                      {member.category}
                    </span>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">{member.institution || '-'}</div>
                  </td>
                  <td className="px-4 py-4 text-xs">
                    {new Date(member.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                    <div className="text-slate-400 mt-0.5">{new Date(member.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB</div>
                  </td>
                  <td className="px-4 py-4">
                    {member.status === "PENDING" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 font-bold text-xs">
                        <Clock size={14} /> Menunggu
                      </span>
                    ) : member.status === "CONTACTED" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                        <CheckCircle size={14} /> Dihubungi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 font-bold text-xs">
                        <XCircle size={14} /> Ditolak
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <form action={async () => {
                      "use server";
                      await updateStatus(member.id, member.status === "PENDING" ? "CONTACTED" : "PENDING");
                    }}>
                      <button 
                        type="submit"
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                          member.status === "PENDING" 
                            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {member.status === "PENDING" ? "Tandai Selesai" : "Batal (Pending)"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
