import React from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { label: "guías", to: "/guias" },
  { label: "htb", to: "/htb" },
  { label: "vídeos", to: "/#videos" },
  { label: "proyectos", to: "/#proyectos" },
  { label: "contacto", to: "/#contacto" },
];

const YT_CHANNEL = "https://www.youtube.com/@MarkH4ck";

function Navbar() {
  const { pathname } = useLocation();

  const handleAnchor = (e, to) => {
    if (!to.startsWith("/#") || pathname !== "/") return;
    e.preventDefault();
    document.getElementById(to.slice(2))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030303]/80 backdrop-blur-md">
      <nav className="flex max-w-[1240px] justify-between items-center gap-4 mx-auto px-6 py-4 max-lg:px-3 max-md:flex-col max-md:gap-3">
        <Link
          to="/"
          className="flex items-baseline gap-1 text-xl font-bold tracking-wider font-bebas uppercase text-white hover:opacity-80 transition-opacity"
        >
          Mark
          <span
            className="glitch text-[#39ff14] [text-shadow:0_0_10px_rgba(57,255,20,0.75)]"
            data-text="H4ck"
          >
            H4ck
          </span>
          <span className="text-[#ff1f3d] animate-blink">_</span>
        </Link>

        <div className="flex items-center gap-x-6 gap-y-2 max-md:gap-x-4 flex-wrap justify-center">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-mono text-sm">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={(e) => handleAnchor(e, l.to)}
                className="text-[#8a8a93] transition-colors hover:text-[#39ff14]"
              >
                ./{l.label}
              </Link>
            ))}
          </div>
          <a
            href={`${YT_CHANNEL}?sub_confirmation=1`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs font-bold px-4 py-2 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/40 text-[#39ff14] hover:bg-[#39ff14] hover:text-[#030303] transition-colors max-md:hidden"
          >
            ▶ suscríbete
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
