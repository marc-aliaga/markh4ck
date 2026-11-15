// ─────────────────────────────────────────────────────────────────────────────
//  Contenido dirigido por carpetas (zero-config).
//
//  Para publicar una entrada nueva en la web NO hay que tocar código:
//
//    • Guía (Active Directory, labs, notas):
//        1. crea  src/content/guias/<slug>.md
//        2. deja las capturas en  public/guias/<slug>/
//
//    • Walkthrough de HTB:
//        1. crea  src/content/htb/<slug>.md
//        2. deja las capturas en  public/htb/<slug>/
//
//  Cada .md empieza con un bloque de "frontmatter" entre --- --- , por ejemplo:
//
//    ---
//    title: "HTB · Nombre — resumen corto"
//    date: 2026-11-14
//    difficulty: "Media"
//    os: "Windows"
//    tags: [LLM, MSSQL, RCE]
//    excerpt: "Una o dos frases que resumen el ataque."
//    featured: true        # (opcional) lo destaca en la portada
//    ---
//
//  En el .md, enlaza las imágenes con  /guias/<slug>/foto.png  o  /htb/<slug>/foto.png
//  El nombre del archivo (<slug>) es la URL:  /guias/<slug>  o  /htb/<slug>.
// ─────────────────────────────────────────────────────────────────────────────

// Carga TODOS los markdown de cada carpeta de golpe (texto crudo).
const guiasFiles = import.meta.glob("../content/guias/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const htbFiles = import.meta.glob("../content/htb/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Metadatos de cada sección de la web.
export const SECTIONS = {
  guias: {
    key: "guias",
    label: "Guías",
    color: "green", // verde neón
    route: "/guias",
    blurb:
      "Laboratorios y apuntes paso a paso: Active Directory, redes, reversing y todo lo que voy montando en casa.",
  },
  htb: {
    key: "htb",
    label: "HTB",
    color: "red", // rojo neón
    route: "/htb",
    blurb:
      "Máquinas de Hack The Box resueltas de principio a fin: enumeración, explotación y escalada, con capturas y comandos.",
  },
};

// ── mini-parser de frontmatter (sin dependencias) ────────────────────────────
function parseScalar(raw) {
  let v = raw.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  if (v === "true") return true;
  if (v === "false") return false;
  return v;
}

function parseFrontmatter(rawText) {
  const text = rawText.replace(/^﻿/, "");
  const match = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/.exec(text);
  if (!match) return { data: {}, body: text };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // comentario al final de la línea (fuera de comillas)
    if (!/^["']/.test(value)) value = value.replace(/\s+#.*$/, "").trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => parseScalar(s))
        .filter((s) => s !== "");
    } else {
      data[key] = parseScalar(value);
    }
  }
  return { data, body: text.slice(match[0].length) };
}

// ── construir el catálogo de una sección ─────────────────────────────────────
function build(sectionKey, files) {
  return Object.entries(files)
    .map(([path, raw]) => {
      const slug = path.split("/").pop().replace(/\.md$/, "");
      const { data, body } = parseFrontmatter(raw);
      return {
        slug,
        section: sectionKey,
        body,
        title: data.title || slug,
        date: data.date ? String(data.date) : "",
        category: data.category || SECTIONS[sectionKey].label,
        difficulty: data.difficulty || "",
        os: data.os || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt || "",
        featured: data.featured === true,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const GUIAS = build("guias", guiasFiles);
export const HTB = build("htb", htbFiles);
export const ALL = [...HTB, ...GUIAS];

export const getSectionEntries = (key) => (key === "htb" ? HTB : GUIAS);

export const getEntry = (section, slug) =>
  ALL.find((e) => e.section === section && e.slug === slug);

export const FEATURED = ALL.filter((e) => e.featured);
