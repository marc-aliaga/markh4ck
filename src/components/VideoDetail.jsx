import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "./Container";
import { FadeIn } from "./FadeIn";
import { getVideo, getCategory, videosByCategory, YT_CHANNEL } from "../data/videos";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

function VideoDetail() {
  const { id } = useParams();
  const video = getVideo(id);
  const [start, setStart] = useState(0);
  const [nonce, setNonce] = useState(0); // fuerza recarga del iframe al saltar de capítulo
  const playerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setStart(0);
    setNonce(0);
  }, [id]);

  if (!video) {
    return (
      <Container>
        <div className="py-32 text-center">
          <h1 className="font-dirt text-5xl txt-acid">404</h1>
          <p className="mt-4 text-[#8a8a93]">Ese vídeo no existe (todavía).</p>
          <Link to="/" className="inline-block mt-6 font-term text-[#39ff14] hover:text-[#ff1f3d]">
            ← volver al inicio
          </Link>
        </div>
      </Container>
    );
  }

  const cat = getCategory(video.category);
  const red = cat?.color === "red";
  const related = videosByCategory(video.category).filter((v) => v.id !== id);

  const jumpTo = (sec) => {
    setStart(sec);
    setNonce((n) => n + 1);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Container>
      <div className="pt-6 pb-20 max-md:pt-2">
        {/* migas */}
        <FadeIn>
          <nav className="font-term text-xs text-[#8a8a93] mb-5 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-[#39ff14]">inicio</Link>
            <span>/</span>
            <Link to={`/#${cat?.id}`} className="hover:text-[#39ff14]">
              {cat?.name?.toLowerCase()}
            </Link>
            <span>/</span>
            <span className="text-white/70 truncate max-w-[50vw]">{video.title}</span>
          </nav>
        </FadeIn>

        <div className="grid grid-cols-[1fr_340px] gap-8 max-lg:grid-cols-1">
          <div>
            {/* Reproductor arriba */}
            <FadeIn>
              <div
                ref={playerRef}
                className="term-window scroll-mt-20 rounded-xl overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[#39ff14]/20 bg-black/40">
                  <span className="w-3 h-3 rounded-full bg-[#ff1f3d]" />
                  <span className="w-3 h-3 rounded-full bg-[#f5c518]" />
                  <span className="w-3 h-3 rounded-full bg-[#39ff14]" />
                  <span className="ml-2 font-term text-xs text-[#8a8a93] truncate">
                    markh4ck@yt:~$ play {video.id}
                  </span>
                </div>
                <div className="relative aspect-video bg-black">
                  <iframe
                    key={nonce}
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1${
                      start ? `&start=${start}&autoplay=1` : ""
                    }`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </FadeIn>

            {/* Título + meta */}
            <FadeIn>
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`font-term text-xs px-2 py-1 rounded border ${
                      red
                        ? "text-[#ff1f3d] border-[#ff1f3d]/50 bg-[#ff1f3d]/5"
                        : "text-[#39ff14] border-[#39ff14]/50 bg-[#39ff14]/5"
                    }`}
                  >
                    {cat?.name}
                  </span>
                  {video.part && (
                    <span className="sticker font-bebas text-sm tracking-wider text-white px-3 py-0.5">
                      {video.part}
                    </span>
                  )}
                </div>
                <h1
                  className={`font-dirt text-4xl leading-[1.05] max-md:text-3xl ${
                    red ? "txt-grunge" : "txt-grunge"
                  }`}
                >
                  {video.title}
                </h1>
                <p className="mt-3 font-term text-xs text-[#8a8a93]">
                  {fmtDate(video.date)} · {video.views.toLocaleString("es-ES")} vistas
                </p>
                <p className="mt-5 text-[#b8b8c0] leading-relaxed max-w-2xl">{video.summary}</p>
                <a
                  href={`${YT_CHANNEL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-5 font-term text-xs text-[#8a8a93] hover:text-[#39ff14] transition-colors"
                >
                  ↗ abrir en YouTube
                </a>
              </div>
            </FadeIn>

            {/* Walkthrough / pasos */}
            <FadeIn>
              <div className="mt-10">
                <h2 className="font-dirt text-2xl txt-acid brush-underline mb-6 inline-block text-[#39ff14]">
                  Walkthrough
                </h2>
                <ol className="relative border-l border-[#39ff14]/20 ml-3">
                  {video.chapters.map((c, i) => (
                    <li key={i} className="relative pl-8 pb-6 last:pb-0">
                      <button
                        type="button"
                        onClick={() => jumpTo(c.start)}
                        className="group text-left w-full"
                      >
                        <span
                          className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-black transition-colors ${
                            red
                              ? "border-[#ff1f3d] group-hover:bg-[#ff1f3d]"
                              : "border-[#39ff14] group-hover:bg-[#39ff14]"
                          }`}
                        />
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`font-term text-xs px-1.5 py-0.5 rounded shrink-0 ${
                              red
                                ? "text-[#ff1f3d] bg-[#ff1f3d]/10"
                                : "text-[#39ff14] bg-[#39ff14]/10"
                            }`}
                          >
                            {c.time}
                          </span>
                          <span className="font-bebas text-xl tracking-wide text-white group-hover:text-[#39ff14] transition-colors">
                            {c.label}
                          </span>
                          <span className="ml-auto font-term text-[10px] text-[#8a8a93] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ▶ ir al minuto
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar: más de la misma temática */}
          <aside className="max-lg:mt-4">
            <FadeIn>
              <div className="sticky top-6">
                <p className="font-term text-xs text-[#8a8a93] mb-4">
                  // más de {cat?.name?.toLowerCase()}
                </p>
                <div className="flex flex-col gap-3">
                  {related.length === 0 && (
                    <p className="text-sm text-[#8a8a93]">Pronto más vídeos de esta serie.</p>
                  )}
                  {related.map((v) => (
                    <Link
                      key={v.id}
                      to={`/video/${v.id}`}
                      className={`neon-card ${red ? "red" : ""} group flex gap-3 rounded-xl p-2`}
                    >
                      <div className="relative w-28 aspect-video shrink-0 rounded-md overflow-hidden bg-black">
                        <img
                          src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div className="min-w-0">
                        {v.part && (
                          <span className="font-term text-[10px] text-[#39ff14]">{v.part}</span>
                        )}
                        <p className="font-bebas text-base leading-tight tracking-wide text-white group-hover:text-[#39ff14] transition-colors line-clamp-3">
                          {v.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </div>
    </Container>
  );
}

export default VideoDetail;
