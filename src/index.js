#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { select, input, confirm } from '@inquirer/prompts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const proyectos = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'proyectos.json'), 'utf-8')
);

const CATEGORIAS = {
  skills: '🧩 Skills',
  'coding-agents': '🤖 Coding agents',
  mcp: '🔌 MCP servers',
  'mcp-chat': '💬 MCP chat apps',
  chat: '💬 Chat apps',
  rag: '📚 RAG',
  agents: '🧩 Agentes',
  'agent-ui': '🖥️ Agent UI',
  voice: '🎙️ Voz',
  saas: '💳 SaaS',
  'app-builder': '🏗️ App builders',
  editors: '✏️ Editores',
  cloud: '☁️ Cloud',
  'ai-api': '⚙️ AI API',
  mobile: '📱 Móvil',
  'code-review': '🧪 Code review',
  'design-to-code': '🎨 Design to code',
  backends: '🗄️ Backends',
  deploy: '🚀 Deploy',
};

const estrellaTxt = (n) => n >= 1000 ? (n / 1000).toFixed(0) + 'k' : String(n);

// ============ Modo interactivo ============

async function menuPrincipal() {
  while (true) {
    const opcion = await select({
      message: '🐝 La Colmena — ¿Qué quieres hacer?',
      choices: [
        { name: '📚 Explorar por categoría', value: 'categorias' },
        { name: '🔍 Buscar por texto', value: 'buscar' },
        { name: '🏆 Top 10 por score', value: 'top' },
        { name: '🎲 Proyecto aleatorio', value: 'aleatorio' },
        { name: '❌ Salir', value: 'salir' },
      ],
    });

    if (opcion === 'salir') {
      console.log('\n🐝 ¡Hasta pronto!\n');
      return;
    }

    if (opcion === 'categorias') await explorarCategorias();
    else if (opcion === 'buscar') await buscarProyecto();
    else if (opcion === 'top') await mostrarTop(10);
    else if (opcion === 'aleatorio') await proyectoAleatorio();
  }
}

async function explorarCategorias() {
  const cats = {};
  for (const p of proyectos) cats[p.categoria] = (cats[p.categoria] || 0) + 1;

  const lista = Object.entries(cats).sort((a, b) => b[1] - a[1]);

  const cat = await select({
    message: '📚 Elige una categoría',
    choices: [
      { name: '⬅️  Volver al menú', value: '__back__' },
      ...lista.map(([c, n]) => ({
        name: `${CATEGORIAS[c] || c} (${n})`,
        value: c,
      })),
    ],
  });

  if (cat === '__back__') return;

  const filtrados = proyectos
    .filter(p => p.categoria === cat)
    .sort((a, b) => b.score - a.score);

  const elegido = await select({
    message: `📦 ${CATEGORIAS[cat] || cat} (${filtrados.length})`,
    choices: [
      { name: '⬅️  Volver', value: '__back__' },
      ...filtrados.map(p => ({
        name: `[${String(p.score).padStart(2)}] ${p.nombre.padEnd(35)} ⭐ ${estrellaTxt(p.estrellas)}`,
        value: p.id,
      })),
    ],
    pageSize: 15,
  });

  if (elegido === '__back__') return;

  const p = proyectos.find(x => x.id === elegido);
  if (p) await verProyecto(p);
}

async function buscarProyecto() {
  const texto = await input({
    message: '🔍 Buscar (nombre, descripción o categoría)',
  });

  if (!texto.trim()) return;

  const q = texto.toLowerCase();
  const resultados = proyectos
    .filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      p.categoria.includes(q)
    )
    .sort((a, b) => b.score - a.score);

  if (!resultados.length) {
    console.log(`\n🐝 Nada encontrado para "${texto}"\n`);
    return;
  }

  const elegido = await select({
    message: `🔍 ${resultados.length} resultados`,
    choices: [
      { name: '⬅️  Volver al menú', value: '__back__' },
      ...resultados.slice(0, 30).map(p => ({
        name: `[${String(p.score).padStart(2)}] ${p.nombre.padEnd(35)} ${p.descripcion.slice(0, 40)}`,
        value: p.id,
      })),
    ],
    pageSize: 15,
  });

  if (elegido === '__back__') return;
  const p = proyectos.find(x => x.id === elegido);
  if (p) await verProyecto(p);
}

async function mostrarTop(n = 10) {
  const top = [...proyectos].sort((a, b) => b.score - a.score).slice(0, n);

  const elegido = await select({
    message: `🏆 Top ${n} por score`,
    choices: [
      { name: '⬅️  Volver al menú', value: '__back__' },
      ...top.map(p => ({
        name: `[${String(p.score).padStart(2)}] ${p.nombre.padEnd(35)} ⭐ ${estrellaTxt(p.estrellas)}`,
        value: p.id,
      })),
    ],
  });

  if (elegido === '__back__') return;
  const p = proyectos.find(x => x.id === elegido);
  if (p) await verProyecto(p);
}

async function proyectoAleatorio() {
  const p = proyectos[Math.floor(Math.random() * proyectos.length)];
  console.log(`\n🎲 ¡Proyecto aleatorio!`);
  await verProyecto(p);
}

async function verProyecto(p) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`🐝 ${p.nombre}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`  ${p.descripcion}`);
  console.log();
  console.log(`  📂 Categoría:   ${CATEGORIAS[p.categoria] || p.categoria}`);
  console.log(`  🏅 Score:       ${p.score}/100`);
  console.log(`  ⭐ Estrellas:   ${p.estrellas.toLocaleString()}`);
  console.log(`  📜 Licencia:    ${p.licencia}`);
  if (p.url) console.log(`  🔗 URL:         ${p.url}`);
  console.log(`${'─'.repeat(60)}\n`);

  if (p.url) {
    const accion = await select({
      message: '¿Qué quieres hacer?',
      choices: [
        { name: '📋 Solo volver al menú', value: 'volver' },
        { name: '📥 Clonar este proyecto', value: 'clonar' },
      ],
    });

    if (accion === 'clonar') {
      const dir = await input({
        message: '📁 Directorio destino',
        default: '.',
      });

      const ok = await confirm({
        message: `¿Clonar ${p.nombre} en ${dir}/${p.nombre}?`,
        default: true,
      });

      if (ok) {
        console.log(`\n🐝 Clonando ${p.nombre}...\n`);
        const r = spawnSync('git', ['clone', p.url, `${dir}/${p.nombre}`], { stdio: 'inherit' });
        if (r.status === 0) console.log(`\n✅ Listo en ${dir}/${p.nombre}\n`);
        else console.log('\n❌ Error al clonar.\n');
      }
    }
  }
}

// ============ Comandos CLI ============

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
      console.log(`  [${String(p.score).padStart(2)}] ${p.nombre.padEnd(32)} ⭐ ${estrellaTxt(p.estrellas).padEnd(5)} ${p.categoria}`);
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
      console.log(`  ${(CATEGORIAS[cat] || cat).padEnd(24)} ${n}`);
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

program
  .command('interactive')
  .alias('i')
  .alias('menu')
  .description('Menú interactivo para explorar el catálogo')
  .action(async () => {
    try {
      await menuPrincipal();
    } catch (err) {
      if (err.name === 'ExitPromptError') {
        console.log('\n🐝 ¡Hasta pronto!\n');
      } else {
        throw err;
      }
    }
  });

if (process.argv.length === 2) program.help();
program.parse();
