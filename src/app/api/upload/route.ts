import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const uniqueSuffix = crypto.randomBytes(8).toString("hex");
    const originalExt = path.extname(file.name);
    const safeName = path.basename(file.name, originalExt).replace(/[^a-zA-Z0-9]/g, "-");
    const filename = `${safeName}-${uniqueSuffix}${originalExt}`;
    
    const publicPath = path.join(process.cwd(), "public", "uploads", filename);
    
    await writeFile(publicPath, buffer);

    // Return the URL that can be used on the frontend
    const fileUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
