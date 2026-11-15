import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify, nodeText } from "../lib/toc";

// Imagen que se oculta sola si la captura todavía no está subida,
// para que una guía sin screenshots no muestre iconos rotos.
// Todas las capturas se muestran en una "caja" de dimensiones uniformes
// (misma altura, ancho completo, object-contain) para una estética consistente.
function WtImage({ src, alt }) {
  const [ok, setOk] = React.useState(true);
  if (!ok) return null;
  return (
    <figure className="my-6">
      <div className="wt-shot flex items-center justify-center overflow-hidden rounded-lg border border-[#39ff14]/20 bg-black shadow-[0_0_30px_-10px_rgba(57,255,20,0.4)]">
        <img
          src={src}
          alt={alt || ""}
          loading="lazy"
          onError={() => setOk(false)}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      {alt ? (
        <figcaption className="mt-2 text-center font-term text-[11px] text-[#8a8a93]">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

// Headings con id (para que el menú de fases pueda enlazar y hacer scrollspy).
const heading = (Tag) =>
  function H({ children }) {
    const id = slugify(nodeText(children));
    return (
      <Tag id={id} className="wt-anchor">
        {children}
      </Tag>
    );
  };

const components = {
  img: WtImage,
  h2: heading("h2"),
  h3: heading("h3"),
  a: (props) => <a target="_blank" rel="noreferrer" {...props} />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse font-term text-sm">{children}</table>
    </div>
  ),
};

export default function Markdown({ children }) {
  return (
    <div className="wt-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
