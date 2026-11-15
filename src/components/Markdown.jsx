import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Imagen que se oculta sola si la captura todavía no está subida,
// para que una guía sin screenshots no muestre iconos rotos.
function WtImage({ src, alt }) {
  const [ok, setOk] = React.useState(true);
  if (!ok) return null;
  return (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      onError={() => setOk(false)}
      className="my-5 w-full rounded-lg border border-[#39ff14]/20 bg-black shadow-[0_0_30px_-10px_rgba(57,255,20,0.4)]"
    />
  );
}

const components = {
  img: WtImage,
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
