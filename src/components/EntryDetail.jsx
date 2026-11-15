import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "./Container";
import { FadeIn } from "./FadeIn";
import Markdown from "./Markdown";
import { getEntry, getSectionEntries, SECTIONS } from "../data/content";
import { extractToc } from "../lib/toc";

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

/* ── iconos de los enlaces de cabecera ──────────────────────────────────── */
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.77.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.57V8.43L15.8 12l-6.2 3.57Z" />
  </svg>
);
const TrophyIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 4h12v4a6 6 0 0 1-12 0V4Z" />
    <path d="M6 6H3v1a4 4 0 0 0 4 4M18 6h3v1a4 4 0 0 1-4 4" />
    <path d="M12 14v3M9 21h6M10 17h4" />
  </svg>
);

function LinkPill({ href, icon: Icon, children, red }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-term text-xs transition-colors ${
        red
          ? "border-[#ff1f3d]/40 text-[#ff8a9a] hover:border-[#ff1f3d] hover:text-[#ff1f3d] hover:bg-[#ff1f3d]/5"
          : "border-[#39ff14]/40 text-[#9dffb0] hover:border-[#39ff14] hover:text-[#39ff14] hover:bg-[#39ff14]/5"
      }`}
    >
      <Icon />
      {children}
    </a>
  );
}

function EntryDetail({ section }) {
  const { slug } = useParams();
  const entry = getEntry(section, slug);
  const sec = SECTIONS[section];

  const toc = useMemo(() => extractToc(entry?.body || ""), [entry]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scrollspy: marca en el menú la fase visible.
  useEffect(() => {
    if (!toc.length) return;
    const nodes = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean);
    if (!nodes.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [toc]);

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

  const onTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      history.replaceState(null, "", `#${id}`);
    }
  };

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

            {/* enlaces: repo, vídeo, máquina resuelta */}
            {(entry.repo || entry.video || entry.machine) && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {entry.repo && (
                  <LinkPill href={entry.repo} icon={GithubIcon}>
                    Código / notas
                  </LinkPill>
                )}
                {entry.video ? (
                  <LinkPill href={entry.video} icon={YoutubeIcon} red>
                    Vídeo explicativo
                  </LinkPill>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 font-term text-xs text-[#6b6b73]">
                    <YoutubeIcon />
                    Vídeo · próximamente
                  </span>
                )}
                {entry.machine && (
                  <LinkPill href={entry.machine} icon={TrophyIcon} red>
                    Máquina resuelta (HTB)
                  </LinkPill>
                )}
              </div>
            )}
          </header>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)] gap-10">
          {/* menú de fases (izquierda) */}
          <aside className="hidden lg:block order-first">
            <div className="sticky top-24">
              {toc.length > 0 && (
                <>
                  <p className="font-term text-xs text-[#8a8a93] mb-3">// fases</p>
                  <nav className="flex flex-col border-l border-white/10 mb-10">
                    {toc.map((t) => {
                      const active = activeId === t.id;
                      return (
                        <a
                          key={t.id}
                          href={`#${t.id}`}
                          onClick={(e) => onTocClick(e, t.id)}
                          className={`-ml-px border-l-2 py-1.5 transition-colors font-term leading-tight ${
                            t.level === 3 ? "pl-6 text-[11px]" : "pl-3 text-xs"
                          } ${
                            active
                              ? red
                                ? "border-[#ff1f3d] text-[#ff1f3d]"
                                : "border-[#39ff14] text-[#39ff14]"
                              : "border-transparent text-[#8a8a93] hover:text-white"
                          }`}
                        >
                          {t.text}
                        </a>
                      );
                    })}
                  </nav>
                </>
              )}

              {others.length > 0 && (
                <>
                  <p className="font-term text-xs text-[#8a8a93] mb-3">
                    // más en {sec.label.toLowerCase()}
                  </p>
                  <div className="flex flex-col gap-3">
                    {others.map((w) => (
                      <Link
                        key={w.slug}
                        to={`${sec.route}/${w.slug}`}
                        className={`neon-card ${red ? "red" : ""} group rounded-xl p-3`}
                      >
                        <span
                          className={`font-term text-[10px] ${
                            red ? "text-[#ff1f3d]" : "text-[#39ff14]"
                          }`}
                        >
                          {w.category}
                        </span>
                        <p className="mt-1 font-bebas text-base leading-tight tracking-wide text-white group-hover:text-[#39ff14] transition-colors">
                          {w.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* contenido */}
          <article className="min-w-0">
            <FadeIn>
              <Markdown>{entry.body}</Markdown>
            </FadeIn>
          </article>
        </div>
      </div>
    </Container>
  );
}

export default EntryDetail;
