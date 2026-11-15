import React from "react";

// Convierte un texto en un id estable para anclas (#...), quitando
// acentos, backticks y cualquier cosa que no sea alfanumérico.
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // acentos
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

// Aplana los children de React a texto plano (para generar el id del heading).
export function nodeText(children) {
  if (children == null) return "";
  if (typeof children === "string" || typeof children === "number")
    return String(children);
  if (Array.isArray(children)) return children.map(nodeText).join("");
  if (React.isValidElement(children)) return nodeText(children.props.children);
  return "";
}

// Extrae el índice (## y ###) del cuerpo markdown, ignorando bloques de código.
export function extractToc(body) {
  const toc = [];
  let inCode = false;
  for (const line of String(body).split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].replace(/[`*_~]/g, "").trim();
    toc.push({ level, text, id: slugify(m[2]) });
  }
  return toc;
}
