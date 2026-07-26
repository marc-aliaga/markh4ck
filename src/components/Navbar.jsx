import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FadeIn } from "./FadeIn";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <FadeIn>
      <div className="flex max-w-[1240px] justify-between items-center mx-auto px-6 py-5 max-lg:mx-2">
        <Link
          to="/"
          className="flex items-baseline gap-1 text-lg font-bold tracking-tight font-mono text-white hover:opacity-80 transition-opacity"
        >
          de0a<span className="text-[#da7756]">Hacker</span>
          <span className="text-[#da7756] animate-blink">_</span>
        </Link>

        {!isHome && (
          <Link
            to="/"
            className="text-sm font-medium text-[#8a8a93] hover:text-[#da7756] transition-colors"
          >
            ← Volver a la home
          </Link>
        )}
      </div>
    </FadeIn>
  );
}

export default Navbar;
