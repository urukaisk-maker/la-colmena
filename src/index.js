#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const proyectos = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'proyectos.json'), 'utf-8')
);

const program = new Command();
program
  .name('colmena')
  .description('🐝 Explora las mejores herramientas open-source de vibe coding')
  .version('0.1.0');

program
  .command('list')
  .description('Lista todos los proyectos ordenados por score')
  .option('-c, --categoria <cat>', 'Filtrar por categoría')
  .option('-n, --top <n>', 'Mostrar solo los N primeros', parseInt)
  .action((opts) => {
    let lista = [...proyectos].sort((a, b) => b.score - a.score);
    if (opts.categoria) lista = lista.filter(p => p.categoria === opts.categoria);
    if (opts.top) lista = lista.slice(0, opts.top);
    if (!lista.length) return console.log('🐝 Sin resultados.');
    console.log(`\n🐝 ${lista.length} proyectos\n`);
    for (const p of lista) {
      const stars = p.estrellas >= 1000 ? (p.estrellas / 1000).toFixed(0) + 'k' : p.estrellas;
      console.log(`  [${String(p.score).padStart(2)}] ${p.nombre.padEnd(32)} ⭐ ${String(stars).padEnd(5)} ${p.categoria}`);
    }
    console.log();
  });

program
  .command('search <texto>')
  .description('Busca por nombre, descripción o categoría')
  .action((texto) => {
    const q = texto.toLowerCase();
    const r = proyectos
      .filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q) || p.categoria.includes(q))
      .sort((a, b) => b.score - a.score);
    if (!r.length) return console.log(`🐝 Nada para "${texto}".`);
    console.log(`\n🐝 ${r.length} resultados:\n`);
    for (const p of r) console.log(`  [${String(p.score).padStart(2)}] ${p.nombre.padEnd(32)} ${p.descripcion.slice(0, 55)}`);
    console.log();
  });

program
  .command('info <id>')
  .description('Ficha completa de un proyecto')
  .action((id) => {
    const p = proyectos.find(x => x.id === id || x.nombre === id);
    if (!p) { console.log(`🐝 "${id}" no encontrado.`); process.exit(1); }
    console.log(`\n🐝 ${p.nombre}\n`);
    console.log(`  ${p.descripcion}\n`);
    console.log(`  Categoría: ${p.categoria}`);
    console.log(`  Score:     ${p.score}/100`);
    console.log(`  Estrellas: ⭐ ${p.estrellas}`);
    console.log(`  Licencia:  ${p.licencia}`);
    if (p.url) console.log(`  URL:       ${p.url}`);
    console.log();
  });

program
  .command('categorias')
  .description('Lista todas las categorías con su conteo')
  .action(() => {
    const c = {};
    for (const p of proyectos) c[p.categoria] = (c[p.categoria] || 0) + 1;
    console.log('\n🐝 Categorías:\n');
    for (const [cat, n] of Object.entries(c).sort((a, b) => b[1] - a[1]))
      console.log(`  ${cat.padEnd(20)} ${n}`);
    console.log();
  });

program
  .command('clone <id>')
  .description('Clona un proyecto del catálogo desde GitHub')
  .option('-d, --dir <ruta>', 'Directorio destino', '.')
  .action((id, opts) => {
    const p = proyectos.find(x => x.id === id || x.nombre === id);
    if (!p) {
      console.log(`🐝 "${id}" no encontrado.`);
      process.exit(1);
    }
    if (!p.url) {
      console.log(`🐝 "${p.nombre}" sin URL en el catálogo.`);
      console.log(`   Búscalo en: https://github.com/search?q=${encodeURIComponent(p.nombre)}`);
      process.exit(1);
    }
    console.log(`🐝 Clonando ${p.nombre}...`);
    const r = spawnSync('git', ['clone', p.url, `${opts.dir}/${p.nombre}`], { stdio: 'inherit' });
    if (r.status === 0) console.log(`\n✅ Listo en ${opts.dir}/${p.nombre}`);
    else process.exit(1);
  });

if (process.argv.length === 2) program.help();
program.parse();
