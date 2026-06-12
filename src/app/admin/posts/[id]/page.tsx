import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { PostForm } from "../PostForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect("/admin-portal-page");

  const { id } = await params;

  const post = await db.post.findUnique({
    where: { id },
  });

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <PostForm initialData={post as any} />
    </div>
  );
}
