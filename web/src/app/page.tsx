'use client';

import { useState, useMemo } from 'react';
import proyectos from '@/data/proyectos.json';

type Proyecto = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  score: number;
  estrellas: number;
  licencia: string;
  url?: string;
};

const CATEGORIAS: Record<string, string> = {
  skills: '🧩 Habilidades',
  'coding-agents': '🤖 Agentes codificantes',
  mcp: '🔌 Servidores MCP',
  'mcp-chat': '💬 MCP chat apps',
  chat: '💬 Apps de chat',
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

const TODOS = proyectos as Proyecto[];

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState<string | null>(null);
  const [orden, setOrden] = useState<'score' | 'estrellas' | 'nombre'>('score');

  const lista = useMemo(() => {
    let r = [...TODOS];
    if (categoria) r = r.filter(p => p.categoria === categoria);
    if (busqueda) {
      const q = busqueda.toLowerCase();
      r = r.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.categoria.includes(q)
      );
    }
    if (orden === 'score') r.sort((a, b) => b.score - a.score);
    else if (orden === 'estrellas') r.sort((a, b) => b.estrellas - a.estrellas);
    else r.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return r;
  }, [busqueda, categoria, orden]);

  const cats = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of TODOS) c[p.categoria] = (c[p.categoria] || 0) + 1;
    return Object.entries(c).sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <h1>🐝 La Colmena</h1>
          <p>{TODOS.length} herramientas open-source para vibe coding</p>
        </div>
      </header>

      <main className="main">
        <input
          type="text"
          className="buscador"
          placeholder="🔍 Buscar por nombre, descripción o categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="chips">
          <button
            className={`chip ${categoria === null ? 'activo' : ''}`}
            onClick={() => setCategoria(null)}
          >
            Todas ({TODOS.length})
          </button>
          {cats.map(([cat, n]) => (
            <button
              key={cat}
              className={`chip ${categoria === cat ? 'activo' : ''}`}
              onClick={() => setCategoria(cat)}
            >
              {CATEGORIAS[cat] || cat} ({n})
            </button>
          ))}
        </div>

        <div className="orden">
          <span className="orden-label">Ordenar por:</span>
          {(['score', 'estrellas', 'nombre'] as const).map(o => (
            <button
              key={o}
              className={`orden-btn ${orden === o ? 'activo' : ''}`}
              onClick={() => setOrden(o)}
            >
              {o === 'score' ? 'Puntuación' : o === 'estrellas' ? 'Estrellas' : 'Nombre'}
            </button>
          ))}
        </div>

        <p className="contador">
          {lista.length} resultado{lista.length === 1 ? '' : 's'}
        </p>

        {lista.length === 0 ? (
          <div className="vacio">🐝 Sin resultados para &quot;{busqueda}&quot;</div>
        ) : (
          <div className="grid">
            {lista.map(p => {
              const stars = p.estrellas >= 1000
                ? (p.estrellas / 1000).toFixed(0) + 'k'
                : String(p.estrellas);
              const contenido = (
                <>
                  <div className="card-header">
                    <h3 className="card-titulo">{p.nombre}</h3>
                    <span className="card-score">{p.score}</span>
                  </div>
                  <p className="card-desc">{p.descripcion}</p>
                  <div className="card-meta">
                    <span>⭐ {stars}</span>
                    <span className="sep">·</span>
                    <span>{p.licencia}</span>
                    <span className="sep">·</span>
                    <span className="cat">{p.categoria}</span>
                  </div>
                </>
              );

              return p.url ? (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card link"
                >
                  {contenido}
                </a>
              ) : (
                <div key={p.id} className="card">
                  {contenido}
                </div>
              );
            })}
          </div>
        )}
      </main>

            <footer className="footer">
        <p>
          Hecho con ☕ y 🐝 por{' '}
          <a
            href="https://silly-boba-dc057e.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Manuel Casimiro Carrasco
          </a>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Proyecto{' '}
          <a
            href="https://rad-dolphin-182dfb.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Urukais Klick
          </a>
          {' · '}
          Datos de{' '}
          <a
            href="https://archestack.github.io/best-of-vibe-coding/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Best of Vibe Coding
          </a>
        </p>
      </footer>
    </>
  );
}
