import "dotenv/config";
import { db as prisma } from "../src/lib/db";
import argon2 from "argon2";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: npx tsx scripts/create-admin.ts <email> <password> [name]");
    process.exit(1);
  }

  const email = args[0];
  const password = args[1];
  const name = args[2] || "Admin";

  console.log(`Creating admin user: ${email}...`);

  try {
    const hashedPassword = await argon2.hash(password);
    
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: "ADMIN",
      },
      create: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
      },
    });

    console.log("Success! Admin user created/updated:");
    console.log(`ID: ${user.id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
