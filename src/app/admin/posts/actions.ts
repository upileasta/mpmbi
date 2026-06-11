"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createPost(data: Prisma.PostUncheckedCreateInput) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const post = await db.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      type: data.type,
      category: data.category,
      published: data.published,
      imageUrl: data.imageUrl,
      authorId: session.user.id || null,
    }
  });
  
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  return { success: true, post };
}

export async function updatePost(id: string, data: Prisma.PostUncheckedUpdateInput) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const post = await db.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      type: data.type,
      category: data.category,
      published: data.published,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return { success: true, post };
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await db.post.delete({
    where: { id },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  return { success: true };
}
