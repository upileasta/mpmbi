import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import mammoth from 'mammoth';
import * as cheerio from 'cheerio';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function extractDocxHtml(filePath: string): Promise<string> {
  try {
    const result = await mammoth.convertToHtml({ path: filePath });
    return result.value;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return "";
  }
}

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

function mapCategory(catStr: string) {
  const c = catStr.toUpperCase();
  if (c.includes('MANAJEMEN')) return 'INSIGHT';
  if (c.includes('UMKM') || c.includes('KEWIRAUSAHAAN')) return 'UMKM';
  if (c.includes('SUSTAINABILITY') || c.includes('ESG')) return 'SUSTAINABILITY';
  if (c.includes('RESOURCE')) return 'HRM';
  if (c.includes('MARKETING') || c.includes('BRANDING')) return 'MARKETING';
  if (c.includes('KEUANGAN') || c.includes('FINANSIAL')) return 'FINANCE';
  if (c.includes('ANALYTICS') || c.includes('INTELLIGENCE')) return 'ANALYTICS';
  if (c.includes('RISET') || c.includes('PUBLIKASI')) return 'RESEARCH';
  if (c.includes('KOLABORASI') || c.includes('KERJA SAMA')) return 'KOLABORASI';
  return 'INSIGHT'; // fallback
}

async function main() {
  console.log('Advanced Seeding docx files...');

  const doc1Path = '/home/rvllfil/Downloads/Artikel_Awal_MPMBI_untuk_Upload_Website.docx';
  const doc2Path = '/home/rvllfil/Downloads/Naskah_Berita_Kerja_Sama_NPU_Eastasouth_West_Science.docx';

  const html1 = await extractDocxHtml(doc1Path);
  const html2 = await extractDocxHtml(doc2Path);

  const admin = await prisma.user.findFirst({ where: { role: 'SUPERADMIN' } }) || await prisma.user.findFirst({ where: { role: 'ADMIN' } });

  // 1. Delete old posts
  console.log('Deleting old seeded posts to avoid duplicates...');
  await prisma.post.deleteMany({
    where: {
      OR: [
        { title: 'Naskah Berita Kerja Sama NPU Eastasouth West Science' },
        { title: 'Artikel Awal MPMBI untuk Upload Website' }
      ]
    }
  });

  // 2. Parse Artikel Awal (10 Posts)
  if (html1) {
    const parts = html1.split('<h1>Artikel ');
    // parts[0] is intro
    for (let i = 1; i < parts.length; i++) {
      const htmlChunk = '<h1>Artikel ' + parts[i];
      const $ = cheerio.load(htmlChunk, null, false);
      
      const title = $('h2').first().text().trim();
      if (!title) continue;

      let categoryStr = '';
      let excerpt = '';
      
      $('table').first().find('tr').each((idx, tr) => {
        const key = $(tr).find('td').eq(0).text().trim().toLowerCase();
        const val = $(tr).find('td').eq(1).text().trim();
        if (key.includes('kategori')) categoryStr = val;
        if (key.includes('ringkasan')) excerpt = val;
      });

      // Extract content
      const contentNodes: string[] = [];
      let startRecording = false;
      $.root().contents().each((idx, el) => {
        const isH3 = el.type === 'tag' && el.name === 'h3';
        if (isH3 && $(el).text().includes('Isi Artikel')) {
          startRecording = true;
          return;
        }
        if (startRecording) {
          if (el.type === 'tag' && el.name === 'table') {
            startRecording = false; // Stop at Ajakan unggahan
          } else {
            contentNodes.push($.html(el));
          }
        }
      });

      const content = contentNodes.join('').trim();
      const mappedCategory = mapCategory(categoryStr);

      await prisma.post.upsert({
        where: { slug: generateSlug(title) },
        update: { content },
        create: {
          title,
          slug: generateSlug(title),
          content,
          excerpt: excerpt.length > 200 ? excerpt.substring(0, 197) + '...' : (excerpt || 'Baca artikel selengkapnya...'),
          type: 'BLOG',
          category: mappedCategory,
          published: true,
          authorId: admin?.id,
        },
      });
      console.log(`Seeded Artikel ${i}: ${title.substring(0, 30)}...`);
    }
  }

  // 3. Parse Naskah Berita Kolaborasi (2 Posts)
  if (html2) {
    const parts = html2.split('<h1>Artikel ');
    for (let i = 1; i < parts.length; i++) {
      const htmlChunk = '<h1>Artikel ' + parts[i];
      const $ = cheerio.load(htmlChunk, null, false);

      const title = $('h1').first().next('p').text().trim();
      if (!title) continue;

      let categoryStr = '';
      $('table').first().find('tr').each((idx, tr) => {
        const key = $(tr).find('td').eq(0).text().trim().toLowerCase();
        const val = $(tr).find('td').eq(1).text().trim();
        if (key.includes('kategori')) categoryStr = val;
      });

      const contentNodes: string[] = [];
      let startRecording = false;
      $.root().contents().each((idx, el) => {
        const isTable = el.type === 'tag' && el.name === 'table';
        if (isTable) {
          startRecording = true; // start after metadata table
          return;
        }
        if (startRecording) {
          if (el.type === 'tag' && el.name === 'h2') {
            startRecording = false; // Stop at Catatan unggahan
          } else {
            contentNodes.push($.html(el));
          }
        }
      });

      const content = contentNodes.join('').trim();
      
      let excerpt = cheerio.load(content).text().substring(0, 150) + '...';

      await prisma.post.upsert({
        where: { slug: generateSlug(title) },
        update: { content },
        create: {
          title,
          slug: generateSlug(title),
          content,
          excerpt,
          type: 'NEWS',
          category: 'KOLABORASI',
          published: true,
          authorId: admin?.id,
        },
      });
      console.log(`Seeded Berita ${i}: ${title.substring(0, 30)}...`);
    }
  }

  console.log('Advanced Seeding completed!');
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
