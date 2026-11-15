import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import { FadeIn, FadeInStagger } from "./FadeIn";
import VideoSections from "./VideoSections";
import EntryList from "./EntryList";
import Socials from "./Socials";
import { GUIAS, HTB, FEATURED, SECTIONS } from "../data/content";
import avatar from "../assets/pranay.jpg";

const YT_CHANNEL = "https://www.youtube.com/@MarkH4ck";
const GITHUB = "https://github.com/marc-aliaga";

const STATS = [
  { value: "4.3K+", label: "suscriptores" },
  { value: "134K+", label: "visualizaciones" },
  { value: "39", label: "vídeos publicados" },
];

const TOPICS = [
  { icon: "⚙️", title: "Reversing", desc: "Ingeniería inversa de binarios x86 y ARM con x64dbg, IDA Pro y Ghidra." },
  { icon: "🔓", title: "Cracking & CTFs", desc: "Crackmes, licencias, anti-debug y retos de Root-Me resueltos paso a paso." },
  { icon: "🏢", title: "Active Directory", desc: "Home labs y explotación de redes corporativas con Windows Server y Kali." },
  { icon: "📦", title: "Hack The Box", desc: "Máquinas resueltas de principio a fin, documentadas con capturas y comandos." },
];

const PROJECTS = [
  {
    name: "Assembly-Introduction",
    lang: "Assembly",
    desc: "Curso paso a paso sobre los fundamentos de la computación: desde operaciones con bits hasta cómo se comunican dos ordenadores.",
  },
  {
    name: "C_projects",
    lang: "C",
    desc: "Recopilación de herramientas y proyectos escritos en C.",
  },
  {
    name: "Blockchain-python",
    lang: "Python",
    desc: "Thela: una blockchain sencilla implementada desde cero en Python.",
  },
  {
    name: "Quantitative-Finance",
    lang: "TypeScript",
    desc: "Gestión de riesgo, métodos de valoración y teoría de carteras con código interactivo.",
  },
  {
    name: "ornstein-uhlenbeck-process",
    lang: "Python",
    desc: "Implementación completa del proceso estocástico de Ornstein–Uhlenbeck: simulación y visualización.",
  },
  {
    name: "Valuation-Methods",
    lang: "Python",
    desc: "Toolkit de valoración de empresas: DCF con CAPM, equivalente cierto y modelo dinámico de dividendos.",
  },
];

const LANG_COLOR = {
  Assembly: "#6E4C13",
  C: "#555555",
  Python: "#3572A5",
  TypeScript: "#3178c6",
};

const FEATURED_WT = FEATURED.slice(0, 2);

function SectionTitle({ kicker, title, children }) {
  return (
    <FadeIn>
      <div className="mb-8 max-md:mb-6">
        <p className="font-mono text-sm text-[#39ff14] mb-2">{kicker}</p>
        <h2 className="text-4xl leading-tight max-md:text-2xl">{title}</h2>
        {children}
      </div>
    </FadeIn>
  );
}

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <Container>
      {/* Hero */}
      <section className="grid grid-cols-[1fr_auto] items-center gap-12 pt-16 pb-20 max-md:grid-cols-1 max-md:pt-8 max-md:pb-12 max-md:gap-8">
        <div className="max-md:order-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[#39ff14] mb-4"
          >
            <span className="text-[#8a8a93]">$ whoami</span>
            <br />
            &gt; Marc Aliaga — aka Mark H4ck
            <span className="text-[#ff1f3d] animate-blink">_</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-7xl leading-[1.05] max-md:text-[40px] max-md:leading-[1.1]"
          >
            Reversing, AD y{" "}
            <span className="bg-gradient-to-r from-[#39ff14] to-[#ff1f3d] bg-clip-text text-transparent">
              Hack The Box
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 text-xl text-[#8a8a93] max-w-[620px] leading-relaxed max-md:text-base"
          >
            Soy Marc, de España 🇪🇸. Este es mi rincón para documentar lo que voy
            aprendiendo de ciberseguridad: rompo binarios, monto laboratorios de
            Active Directory y resuelvo máquinas de Hack The Box. Todo lo que
            descubro acaba aquí escrito, paso a paso.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/htb"
              className="bg-[#39ff14] hover:bg-[#2fd60f] transition-colors text-[#030303] font-bold px-7 py-4 rounded-2xl shadow-[0_0_40px_-6px_rgba(57,255,20,0.6)]"
            >
              Ver walkthroughs de HTB
            </Link>
            <Link
              to="/guias"
              className="border border-white/10 hover:border-[#39ff14]/50 transition-colors text-white font-bold px-7 py-4 rounded-2xl"
            >
              Leer mis guías
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative w-[320px] h-[320px] max-md:w-[180px] max-md:h-[180px] max-md:order-1 max-md:mx-auto"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#39ff14] to-[#ff1f3d] blur-md opacity-70" />
          <img
            src={avatar}
            alt="Mark H4ck"
            className="relative w-full h-full rounded-full object-cover border-4 border-[#030303]"
          />
        </motion.div>
      </section>

      {/* Stats */}
      <FadeInStagger className="grid grid-cols-3 gap-4 mb-24 max-md:mb-16 max-md:gap-2">
        {STATS.map((s) => (
          <FadeIn key={s.label}>
            <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 text-center max-md:p-4">
              <p className="font-bebas text-4xl font-bold text-white max-md:text-xl">{s.value}</p>
              <p className="mt-1 font-mono text-sm text-[#8a8a93] max-md:text-xs">{s.label}</p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>

      {/* Trabajo destacado */}
      {FEATURED_WT.length > 0 && (
        <section className="mb-24 max-md:mb-16">
          <SectionTitle kicker="// destacado" title="Lo último que he roto" />
          <FadeInStagger faster className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
            {FEATURED_WT.map((w) => {
              const sec = SECTIONS[w.section];
              return (
                <FadeIn key={`${w.section}/${w.slug}`}>
                  <Link
                    to={`${sec.route}/${w.slug}`}
                    className="neon-card red group flex h-full flex-col justify-between rounded-3xl p-7 min-h-[220px]"
                  >
                    <div>
                      <span className="font-term text-xs text-[#ff1f3d]">
                        {sec.label.toLowerCase()} · {w.date ? new Date(w.date).getFullYear() : ""}
                      </span>
                      <h3 className="mt-3 font-dirt text-2xl leading-tight txt-grunge group-hover:text-[#39ff14] transition-colors">
                        {w.title}
                      </h3>
                    </div>
                    <p className="mt-5 text-[#8a8a93] leading-relaxed">{w.excerpt}</p>
                  </Link>
                </FadeIn>
              );
            })}
            <FadeIn>
              <a
                href={`${YT_CHANNEL}?sub_confirmation=1`}
                target="_blank"
                rel="noreferrer"
                className="neon-card group flex h-full flex-col justify-between rounded-3xl p-7 min-h-[220px]"
              >
                <div>
                  <span className="font-term text-xs text-[#39ff14]">youtube · @MarkH4ck</span>
                  <h3 className="mt-3 font-dirt text-2xl leading-tight txt-acid">
                    Vídeos nuevos cada semana
                  </h3>
                </div>
                <p className="mt-5 text-[#8a8a93] leading-relaxed">
                  Reversing, pentesting de Active Directory y retos resueltos paso
                  a paso. Suscríbete para no perderte ninguno. ▶
                </p>
              </a>
            </FadeIn>
          </FadeInStagger>
        </section>
      )}

      {/* Guías */}
      <section id="guias" className="mb-24 max-md:mb-16 scroll-mt-24">
        <SectionTitle kicker="// /guias" title="Guías">
          <p className="mt-2 text-[#8a8a93] max-w-2xl">{SECTIONS.guias.blurb}</p>
        </SectionTitle>
        <EntryList entries={GUIAS.slice(0, 4)} />
        {GUIAS.length > 4 && (
          <div className="mt-6">
            <Link to="/guias" className="font-term text-sm text-[#39ff14] hover:text-[#ff1f3d]">
              ver todas las guías →
            </Link>
          </div>
        )}
      </section>

      {/* HTB */}
      <section id="htb" className="mb-24 max-md:mb-16 scroll-mt-24">
        <SectionTitle kicker="// /htb" title="Hack The Box">
          <p className="mt-2 text-[#8a8a93] max-w-2xl">{SECTIONS.htb.blurb}</p>
        </SectionTitle>
        <EntryList entries={HTB.slice(0, 4)} />
        {HTB.length > 4 && (
          <div className="mt-6">
            <Link to="/htb" className="font-term text-sm text-[#ff1f3d] hover:text-[#39ff14]">
              ver todos los walkthroughs →
            </Link>
          </div>
        )}
      </section>

      {/* Últimos vídeos */}
      <section id="videos" className="mb-24 max-md:mb-16 scroll-mt-24">
        <SectionTitle kicker="// youtube.com/@MarkH4ck" title="Vídeos por temática">
          <p className="mt-2 text-[#8a8a93]">
            Cada vídeo abre su propia página con el reproductor arriba y el
            walkthrough paso a paso debajo. Haz clic en cualquier card.
          </p>
        </SectionTitle>
        <VideoSections />
        <div className="mt-10 text-center">
          <a
            href={`${YT_CHANNEL}/videos`}
            target="_blank"
            rel="noreferrer"
            className="font-term text-[#39ff14] hover:text-[#ff1f3d] transition-colors"
          >
            ver todos los vídeos en YouTube →
          </a>
        </div>
      </section>

      {/* Sobre mí / temas */}
      <section className="mb-24 max-md:mb-16">
        <SectionTitle kicker="// sobre mí" title="En qué ando metido" />
        <FadeInStagger faster className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {TOPICS.map((t) => (
            <FadeIn key={t.title}>
              <div className="h-full bg-[#0d0d0d] border border-white/5 hover:border-[#ff1f3d]/40 transition-colors rounded-3xl p-6">
                <span className="text-3xl">{t.icon}</span>
                <h3 className="mt-4 text-xl leading-tight">{t.title}</h3>
                <p className="mt-2 text-[#8a8a93] leading-relaxed">{t.desc}</p>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </section>

      {/* Proyectos GitHub */}
      <section id="proyectos" className="mb-24 max-md:mb-16 scroll-mt-24">
        <SectionTitle kicker="// github.com/marc-aliaga" title="Proyectos en GitHub" />
        <FadeInStagger faster className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {PROJECTS.map((p) => (
            <FadeIn key={p.name}>
              <a
                href={`${GITHUB}/${p.name}`}
                target="_blank"
                rel="noreferrer"
                className="h-full flex flex-col bg-[#0d0d0d] border border-white/5 hover:border-[#39ff14]/40 transition-colors rounded-3xl p-6"
              >
                <p className="font-mono font-bold text-white break-all">
                  <span className="text-[#8a8a93]">~/</span>
                  {p.name}
                </p>
                <p className="mt-3 text-[#8a8a93] leading-relaxed flex-1">{p.desc}</p>
                <p className="mt-4 flex items-center gap-2 font-mono text-xs text-[#8a8a93]">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: LANG_COLOR[p.lang] || "#888" }}
                  />
                  {p.lang}
                </p>
              </a>
            </FadeIn>
          ))}
        </FadeInStagger>
        <div className="mt-6 text-center">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[#39ff14] hover:text-[#ff1f3d] transition-colors"
          >
            ver perfil completo en GitHub →
          </a>
        </div>
      </section>

      {/* Redes */}
      <section id="contacto" className="mb-10 scroll-mt-24">
        <SectionTitle kicker="// contacto" title="Sígueme" />
        <Socials />
        <p className="mt-10 mb-4 text-center font-mono text-xs text-[#8a8a93]">
          © {new Date().getFullYear()} Mark H4ck · hecho con café y ensamblador
        </p>
      </section>
    </Container>
  );
}

export default Home;
