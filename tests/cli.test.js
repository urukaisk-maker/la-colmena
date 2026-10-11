import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const proyectos = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'proyectos.json'), 'utf-8')
);

describe('Catálogo de proyectos', () => {
  it('debe tener al menos 100 proyectos', () => {
    expect(proyectos.length).toBeGreaterThanOrEqual(100);
  });

  it('cada proyecto debe tener los campos obligatorios', () => {
    for (const p of proyectos) {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('nombre');
      expect(p).toHaveProperty('descripcion');
      expect(p).toHaveProperty('categoria');
      expect(p).toHaveProperty('score');
      expect(p).toHaveProperty('estrellas');
      expect(p).toHaveProperty('licencia');
    }
  });

  it('los ids deben ser únicos', () => {
    const ids = proyectos.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('los scores deben estar entre 0 y 100', () => {
    for (const p of proyectos) {
      expect(p.score).toBeGreaterThanOrEqual(0);
      expect(p.score).toBeLessThanOrEqual(100);
    }
  });

  it('debe haber al menos 15 categorías', () => {
    const categorias = new Set(proyectos.map(p => p.categoria));
    expect(categorias.size).toBeGreaterThanOrEqual(15);
  });
});
