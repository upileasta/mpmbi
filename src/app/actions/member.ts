"use server";

import { z } from "zod";
import { db } from "@/lib/db";

const memberSchema = z.object({
  fullName: z.string().min(2, "Nama terlalu pendek").max(100, "Nama terlalu panjang"),
  email: z.string().email("Format email tidak valid").max(100, "Email terlalu panjang"),
  phone: z.string().min(9, "Nomor telepon terlalu pendek").max(20, "Nomor telepon terlalu panjang"),
  category: z.string().min(2, "Kategori harus dipilih").max(50),
  institution: z.string().max(150).optional(),
  website_url: z.string().max(200).optional(), // HONEYPOT
});

export async function submitRegistration(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      category: formData.get("category") as string,
      institution: formData.get("institution") as string,
      website_url: formData.get("website_url") as string,
    };

    // 1. Zod Validation
    const validatedData = memberSchema.parse(rawData);

    // 2. Honeypot check
    // Jika bot mengisi field website_url, kembalikan 'success' palsu
    if (validatedData.website_url && validatedData.website_url.trim() !== "") {
      console.warn("Bot detected: Honeypot field filled. Rejecting silently.");
      return { success: true, message: "Pendaftaran berhasil dikirim. Tim kami akan segera menghubungi Anda." };
    }

    // 3. Rate Limiting / Duplicate Check
    // Mencegah user (atau bot canggih) mengirim spam berulang kali sebelum di-approve
    const existingApplication = await db.memberApplication.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { phone: validatedData.phone },
        ],
        status: "PENDING",
      },
    });

    if (existingApplication) {
      return {
        success: false,
        error: "Data dengan email atau nomor telepon ini sudah kami terima dan sedang dalam antrean. Harap menunggu tim kami menghubungi Anda.",
      };
    }

    // 4. Simpan ke Database
    await db.memberApplication.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        category: validatedData.category,
        institution: validatedData.institution || undefined,
        status: "PENDING",
      },
    });

    return {
      success: true,
      message: "Pendaftaran berhasil dikirim! Tim MPMBI akan segera menghubungi Anda.",
    };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: (error as any).errors[0].message,
      };
    }

    console.error("Member registration error:", error);
    return {
      success: false,
      error: "Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.",
    };
  }
}
