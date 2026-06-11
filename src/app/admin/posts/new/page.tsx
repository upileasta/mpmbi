import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PostForm } from "../PostForm";

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin-portal-page");

  return (
    <div className="p-6 md:p-10">
      <PostForm />
    </div>
  );
}
