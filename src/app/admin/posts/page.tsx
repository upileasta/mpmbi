import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { deletePost } from "./actions";
import { Search } from "@/components/datatable/search";
import { Pagination } from "@/components/datatable/pagination";
import { SortableHeader } from "@/components/datatable/sortable-header";

const ITEMS_PER_PAGE = 10;

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin-portal-page");

  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.query as string) || "";
  const page = Number(resolvedSearchParams.page) || 1;
  const sortColumn = (resolvedSearchParams.sort as string) || "createdAt";
  const sortOrder = (resolvedSearchParams.order as "asc" | "desc") || "desc";

  const whereClause: Prisma.PostWhereInput = query ? {
    OR: [
      { title: { contains: query, mode: "insensitive" } }
    ]
  } : {};

  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [posts, totalCount] = await Promise.all([
    db.post.findMany({
      where: whereClause,
      orderBy: { [sortColumn]: sortOrder },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    db.post.count({ where: whereClause })
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 transition-colors shadow-sm">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Posts & Insights</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Create, edit, or delete articles for the public blog.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <Search placeholder="Cari judul artikel, kategori, atau tipe..." />
          </div>
          <Link 
            href="/admin/posts/new"
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm flex-shrink-0"
          >
            <Plus size={18} /> New Post
          </Link>
        </div>

        {/* DataTable */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wider text-xs font-black">
                <SortableHeader label="Title" column="title" currentSort={sortColumn} currentOrder={sortOrder} searchParams={resolvedSearchParams} />
                <SortableHeader label="Category" column="category" currentSort={sortColumn} currentOrder={sortOrder} searchParams={resolvedSearchParams} />
                <SortableHeader label="Type" column="type" currentSort={sortColumn} currentOrder={sortOrder} searchParams={resolvedSearchParams} />
                <SortableHeader label="Status" column="published" currentSort={sortColumn} currentOrder={sortOrder} searchParams={resolvedSearchParams} />
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                    {query ? "Artikel tidak ditemukan." : "No posts found. Create one to get started!"}
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 max-w-xs truncate" title={post.title}>
                      {post.title}
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">{post.type}</td>
                    <td className="py-4 px-4">
                      {post.published ? (
                        <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">
                          Published
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold border border-amber-200">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="inline-flex p-2 text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors border border-primary/10"
                      >
                        <Edit size={16} />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deletePost(post.id);
                      }} className="inline-block">
                        <button 
                          type="submit" 
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
