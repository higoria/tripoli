/**
 * Script de compressão de imagens para o site Trípoli
 * Converte PNG/JPG grandes para JPEG otimizado (qualidade 80)
 * Redimensiona para largura máxima de 1920px (hero) ou 1200px (galeria)
 *
 * Uso: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'public');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_WIDTH_HERO = 1920;
const MAX_WIDTH_GALLERY = 1200;
const JPEG_QUALITY = 78;

let totalOriginalMB = 0;
let totalNewMB = 0;
let count = 0;
let skipped = 0;

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(fullPath)));
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const info = await stat(filePath);
  const originalMB = info.size / 1024 / 1024;

  // Pula arquivos já pequenos (< 300 KB)
  if (info.size < 300 * 1024) {
    process.stdout.write(`  SKIP  ${basename(filePath)} (${originalMB.toFixed(2)} MB - já pequeno)\n`);
    skipped++;
    return;
  }

  // Define largura máxima com base no path
  const isHero = filePath.includes('hero') || filePath.includes('setor');
  const maxWidth = isHero ? MAX_WIDTH_HERO : MAX_WIDTH_GALLERY;

  try {
    const image = sharp(filePath);
    const meta = await image.metadata();

    const pipeline = image
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true });

    // Determina nome de saída (sempre .jpg)
    const outPath = filePath.replace(/\.(png|jpeg|webp)$/i, '.jpg');

    const { size: newSize } = await pipeline.toFile(outPath + '.tmp');

    // Só substitui se realmente ficou menor
    if (newSize < info.size) {
      await import('fs/promises').then(({ rename, unlink }) =>
        rename(outPath + '.tmp', outPath)
          .then(() => ext !== '.jpg' && filePath !== outPath ? unlink(filePath).catch(() => {}) : Promise.resolve())
      );
      const newMB = newSize / 1024 / 1024;
      const saving = ((1 - newMB / originalMB) * 100).toFixed(0);
      process.stdout.write(`  OK    ${basename(filePath)} ${originalMB.toFixed(1)}MB → ${newMB.toFixed(1)}MB (-${saving}%)\n`);
      totalOriginalMB += originalMB;
      totalNewMB += newMB;
      count++;
    } else {
      await import('fs/promises').then(({ unlink }) => unlink(outPath + '.tmp').catch(() => {}));
      process.stdout.write(`  KEEP  ${basename(filePath)} (já otimizado)\n`);
      skipped++;
    }
  } catch (err) {
    process.stdout.write(`  ERR   ${basename(filePath)}: ${err.message}\n`);
    // Remove temp se existir
    await import('fs/promises').then(({ unlink }) =>
      unlink(filePath + '.tmp').catch(() => {})
    );
  }
}

async function main() {
  console.log('\n🔍 Buscando imagens em', ROOT, '\n');
  const images = await getAllImages(ROOT);
  console.log(`📦 ${images.length} imagens encontradas\n`);

  for (const img of images) {
    await compressImage(img);
  }

  console.log(`\n✅ ${count} imagens comprimidas`);
  console.log(`⏭️  ${skipped} imagens puladas`);
  if (count > 0) {
    const saved = totalOriginalMB - totalNewMB;
    console.log(`💾 ${totalOriginalMB.toFixed(1)} MB → ${totalNewMB.toFixed(1)} MB (economia de ${saved.toFixed(1)} MB)`);
  }
}

main().catch(console.error);
