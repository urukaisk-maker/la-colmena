# 🐝 La Colmena
colmena i                             # ✨ Menú interactivo con flechas
[![CI](https://github.com/urukaisk-maker/la-colmena/actions/workflows/ci.yml/badge.svg)](https://github.com/urukaisk-maker/la-colmena/actions/workflows/ci.yml)

CLI y hub web para explorar las mejores herramientas open-source de **vibe coding**.
Datos basados en [Best of Vibe Coding](https://archestack.github.io/best-of-vibe-coding/).

## 🚀 ¿Qué es La Colmena?

La Colmena es un ecosistema de dos herramientas que trabajan juntas:

1. **CLI `colmena`** — Un comando de terminal para explorar, buscar y clonar herramientas open-source.
2. **Hub web** — Una interfaz visual en Next.js que muestra el mismo catálogo de forma filtrable.

Ambas consumen el mismo archivo de datos (`data/proyectos.json`), que contiene **117 proyectos** organizados en 19 categorías.

## 📦 Instalación

### CLI (global)

```bash
git clone https://github.com/urukaisk-maker/la-colmena.git
cd la-colmena
npm install
npm link
