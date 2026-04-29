/**
 * Atualiza referências de imagem nos arquivos .ts/.tsx:
 * - Troca .png -> .jpg (para imagens que foram convertidas)
 * - Verifica se o arquivo .jpg existe antes de substituir
 *
 * Uso: node scripts/update-image-refs.mjs
 */

import { readFile, writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { constants } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

const FILES_TO_UPDATE = [
  'src/data/empreendimentos.ts',
  'src/components/SectorSection.tsx',
  'src/pages/EmpreendimentoDetalhe.tsx',
];

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function updateFile(relPath) {
  const fullPath = join(ROOT, relPath);
  let content = await readFile(fullPath, 'utf-8');
  const original = content;
  let changes = 0;

  // Encontra todos os paths de imagem .png referenciados
  const pngRefs = [...content.matchAll(/(['"`])(\/images\/[^'"`]+\.png)\1/gi)];

  for (const match of pngRefs) {
    const pngPath = match[2];
    const jpgPath = pngPath.replace(/\.png$/i, '.jpg');
    const absoluteJpg = join(PUBLIC, jpgPath);

    if (await fileExists(absoluteJpg)) {
      content = content.replace(pngPath, jpgPath);
      changes++;
      console.log(`  ✓ ${pngPath} → ${jpgPath}`);
    } else {
      console.log(`  ⚠ KEEP ${pngPath} (jpg não encontrado)`);
    }
  }

  if (changes > 0) {
    await writeFile(fullPath, content, 'utf-8');
    console.log(`\n  📝 ${relPath}: ${changes} referências atualizadas\n`);
  } else {
    console.log(`  ✓ ${relPath}: nenhuma alteração necessária\n`);
  }
}

async function main() {
  console.log('\n🔄 Atualizando referências de imagem...\n');
  for (const f of FILES_TO_UPDATE) {
    console.log(`📄 ${f}`);
    await updateFile(f);
  }
  console.log('✅ Concluído!');
}

main().catch(console.error);
