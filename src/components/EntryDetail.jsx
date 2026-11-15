import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "./Container";
import { FadeIn } from "./FadeIn";
import Markdown from "./Markdown";
import { getEntry, getSectionEntries, SECTIONS } from "../data/content";

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

function EntryDetail({ section }) {
  const { slug } = useParams();
  const entry = getEntry(section, slug);
  const sec = SECTIONS[section];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!entry) {
    return (
      <Container>
        <div className="py-32 text-center">
          <h1 className="font-dirt text-5xl txt-acid">404</h1>
          <p className="mt-4 text-[#8a8a93]">Esto no existe (todavía).</p>
          <Link
            to={sec.route}
            className="inline-block mt-6 font-term text-[#39ff14] hover:text-[#ff1f3d]"
          >
            ← volver a {sec.label}
          </Link>
        </div>
      </Container>
    );
  }

  const red = sec.color === "red";
  const others = getSectionEntries(section)
    .filter((e) => e.slug !== slug)
    .slice(0, 4);

  return (
    <Container>
      <div className="pt-6 pb-24 max-md:pt-2">
        {/* migas */}
        <FadeIn>
          <nav className="font-term text-xs text-[#8a8a93] mb-6 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-[#39ff14]">inicio</Link>
            <span>/</span>
            <Link to={sec.route} className="hover:text-[#39ff14]">
              {sec.label.toLowerCase()}
            </Link>
            <span>/</span>
            <span className="text-white/70 truncate max-w-[60vw]">{entry.slug}</span>
          </nav>
        </FadeIn>

        {/* cabecera */}
        <FadeIn>
          <header className="mb-10 border-b border-white/10 pb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`font-term text-xs px-2 py-1 rounded border ${
                  red
                    ? "text-[#ff1f3d] border-[#ff1f3d]/50 bg-[#ff1f3d]/5"
                    : "text-[#39ff14] border-[#39ff14]/50 bg-[#39ff14]/5"
                }`}
              >
                {entry.category}
              </span>
              {entry.difficulty && (
                <span className="font-term text-xs px-2 py-1 rounded border border-white/15 text-[#8a8a93]">
                  dificultad: {entry.difficulty}
                </span>
              )}
              {entry.os && (
                <span className="font-term text-xs px-2 py-1 rounded border border-white/15 text-[#8a8a93]">
                  {entry.os}
                </span>
              )}
            </div>
            <h1 className="font-dirt text-4xl leading-[1.05] max-md:text-3xl txt-grunge">
              {entry.title}
            </h1>
            {entry.date && (
              <p className="mt-4 font-term text-xs text-[#8a8a93]">{fmtDate(entry.date)}</p>
            )}
            {entry.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.tags.map((tg) => (
                  <span
                    key={tg}
                    className="font-term text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#8a8a93]"
                  >
                    #{tg}
                  </span>
                ))}
              </div>
            )}
          </header>
        </FadeIn>

        <div className="grid grid-cols-[1fr_280px] gap-10 max-lg:grid-cols-1">
          {/* contenido */}
          <article className="min-w-0">
            <FadeIn>
              <Markdown>{entry.body}</Markdown>
            </FadeIn>
          </article>

          {/* sidebar */}
          <aside className="max-lg:mt-4">
            <div className="sticky top-24">
              <p className="font-term text-xs text-[#8a8a93] mb-4">
                // más en {sec.label.toLowerCase()}
              </p>
              <div className="flex flex-col gap-3">
                {others.map((w) => (
                  <Link
                    key={w.slug}
                    to={`${sec.route}/${w.slug}`}
                    className={`neon-card ${red ? "red" : ""} group rounded-xl p-4`}
                  >
                    <span
                      className={`font-term text-[10px] ${
                        red ? "text-[#ff1f3d]" : "text-[#39ff14]"
                      }`}
                    >
                      {w.category}
                    </span>
                    <p className="mt-1 font-bebas text-lg leading-tight tracking-wide text-white group-hover:text-[#39ff14] transition-colors">
                      {w.title}
                    </p>
                  </Link>
                ))}
                {others.length === 0 && (
                  <p className="font-term text-xs text-[#8a8a93]">
                    Más cosas en camino. _
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}

export default EntryDetail;
