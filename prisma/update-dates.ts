import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function getRandomDateIn2025() {
  const start = new Date(2025, 0, 1).getTime();
  const end = new Date(2025, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

async function main() {
  console.log('Updating post dates to 2025...');

  const posts = await prisma.post.findMany();
  
  for (const post of posts) {
    const randomDate = getRandomDateIn2025();
    
    await prisma.post.update({
      where: { id: post.id },
      data: { 
        createdAt: randomDate,
        updatedAt: randomDate
      }
    });
    
    console.log(`Updated post: ${post.title.substring(0, 30)}... -> Date: ${randomDate.toISOString().split('T')[0]}`);
  }

  console.log('Successfully updated dates for all posts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
