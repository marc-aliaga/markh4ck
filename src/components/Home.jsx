import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import { FadeIn, FadeInStagger } from "./FadeIn";
import VideoSections from "./VideoSections";
import EntryList from "./EntryList";
import Socials from "./Socials";
import { GUIAS, HTB, FEATURED, SECTIONS } from "../data/content";

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
    <div className="retro90">
    <style>{retroCSS}</style>
    <Container>
      <div className="retro-topline"><span>[ MARK H4CK // TERMINAL WEB ]</span><span>ÚLTIMA ACTUALIZACIÓN: 2026</span></div>
      <nav className="retro-nav" aria-label="Navegación retro">
        <a href="#guias">[ GUÍAS ]</a><a href="#htb">[ HTB ]</a><a href="#videos">[ VÍDEOS ]</a><a href="#proyectos">[ CÓDIGO ]</a><a href="#contacto">[ CONTACTO ]</a>
      </nav>
      {/* Hero */}
      <section className="retro-hero pt-24 pb-20 text-center max-md:pt-14 max-md:pb-12">
        <div className="retro-window-title"><span>■ C:\MARK_H4CK\HOME.EXE</span><span>_ □ ×</span></div>
        <div className="retro-hero-body"><div className="retro-eyebrow">&lt;HTML&gt; // EST. 1998 // &lt;/HTML&gt;</div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(40px,10vw,110px)] leading-[1.1] tracking-tight"
        >
          <span className="text-[#39ff14]">
            MARK H4CK
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-8 max-w-[680px] text-xl text-[#8a8a93] leading-relaxed max-md:text-base max-md:mt-5"
        >
          Soy Marc, de España 🇪🇸. Rompo binarios, monto laboratorios de Active
          Directory y resuelvo máquinas de Hack The Box. Todo lo que descubro
          acaba aquí documentado, paso a paso.
        </motion.p>
        <div className="retro-status"><span className="retro-blink">●</span> SYSTEM ONLINE <span>·</span> 56K MODEM CONNECTED <span>·</span> NO COOKIES, JUST CHAOS</div>
        </div>
      </section>
      <div className="retro-marquee"><div>[ SYSTEM ONLINE ] // REVERSE ENGINEERING // ACTIVE DIRECTORY // CTF // ASSEMBLY // HACKING ÉTICO //</div></div>

      {/* Stats */}
      <FadeInStagger className="grid grid-cols-3 gap-4 mb-24 max-md:mb-16 max-md:gap-2">
        {STATS.map((s) => (
          <FadeIn key={s.label}>
            <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 text-center max-md:p-4">
              <p className="font-mono text-3xl font-bold text-[#39ff14] max-md:text-lg">{s.value}</p>
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
                      <h3 className="mt-3 font-mono font-bold text-xl leading-snug group-hover:text-[#39ff14] transition-colors">
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
                  <h3 className="mt-3 font-mono font-bold text-xl leading-snug text-[#39ff14]">
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
    </div>
  );
}

const retroCSS = `
.retro90 { --lime:#8dfca4; --dim:#a7b8aa; --red:#f38c8c; color:#e5f4e8; font-family: "Courier New", Consolas, monospace; min-height:100vh; background:#080d0a; background-image:linear-gradient(rgba(86,150,100,.025) 1px,transparent 1px); background-size:100% 4px; }
.retro90 * { box-sizing:border-box; }
.retro90 .retro-topline { display:flex; justify-content:space-between; gap:12px; padding:12px 0; border-bottom:1px solid #315a3c; color:var(--lime); font: 12px "Courier New",monospace; }
.retro90 .retro-nav { display:flex; flex-wrap:wrap; gap:10px 20px; padding:18px 0; margin-bottom:30px; border-bottom:1px solid #294a32; background:transparent; }
.retro90 .retro-nav a { color:var(--lime); font: bold 13px "Courier New",monospace; text-decoration:none; }
.retro90 .retro-nav a:hover { color:#fff; text-decoration:underline; }
.retro90 .retro-hero { padding:0!important; margin-bottom:25px; border:1px solid #386947; background:#0a120d; }
.retro90 .retro-window-title { display:flex; justify-content:space-between; gap:8px; padding:10px 15px; background:#14291a; color:var(--lime); border-bottom:1px solid #386947; font: bold 12px "Courier New",monospace; text-align:left; }
.retro90 .retro-hero-body { padding:48px 24px 35px; background:transparent; }
.retro90 .retro-eyebrow { color:#91b99b; font-size:12px; letter-spacing:1px; margin-bottom:18px; }
.retro90 .retro-hero h1 { font-family:"Courier New",Consolas,monospace!important; font-weight:900!important; font-size:clamp(38px,9vw,105px)!important; line-height:1.08!important; letter-spacing:-3px; text-shadow:none!important; overflow-wrap:anywhere; }
.retro90 .retro-hero h1 span { background:none!important; color:var(--lime)!important; -webkit-text-fill-color:var(--lime)!important; }
.retro90 .retro-hero p { color:#d5e2d7!important; font-family:"Courier New",monospace!important; font-size:clamp(14px,1.5vw,17px)!important; line-height:1.85!important; max-width:750px; }
.retro90 .retro-status { display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-top:30px; padding-top:15px; border-top:1px solid #284532; color:var(--lime); font-size:11px; }
.retro90 .retro-blink { animation:retroBlink 1.2s steps(1) infinite; }
@keyframes retroBlink { 50% { opacity:0; } }
.retro90 .retro-marquee { overflow:hidden; white-space:nowrap; border-top:1px solid #315a3c; border-bottom:1px solid #315a3c; background:#101c13; color:var(--lime); padding:10px 0; font:12px "Courier New",monospace; margin-bottom:55px; }
.retro90 .retro-marquee>div { width:max-content; animation:retroScroll 35s linear infinite; }
@keyframes retroScroll { to { transform:translateX(-45%); } }
.retro90 h2 { font-family:"Courier New",Consolas,monospace!important; font-weight:800!important; text-transform:none; letter-spacing:-1px; color:#e9f7ec!important; text-shadow:none!important; }
.retro90 h2:before { content:"> "; color:var(--lime); }
.retro90 section { scroll-margin-top:30px; }
.retro90 section p, .retro90 section a, .retro90 section h3 { font-family:"Courier New",Consolas,monospace!important; }
.retro90 .rounded-3xl { border-radius:2px!important; }
.retro90 .rounded-3xl, .retro90 .neon-card { background:#0e1711!important; border:1px solid #315a3c!important; box-shadow:none!important; transition:background .15s,border-color .15s; }
.retro90 a.rounded-3xl:hover, .retro90 a.neon-card:hover { transform:none!important; box-shadow:none!important; background:#14231a!important; border-color:var(--lime)!important; }
.retro90 .font-dirt, .retro90 .font-bebas, .retro90 .font-term, .retro90 .font-mono { font-family:"Courier New",Consolas,monospace!important; letter-spacing:normal; text-shadow:none!important; }
.retro90 .txt-grunge, .retro90 .txt-acid { text-shadow:none!important; }
.retro90 .text-\[\#8a8a93\] { color:#b8c7bc!important; }
.retro90 a:focus-visible { outline:2px solid var(--lime); outline-offset:3px; }
@media(max-width:640px) { .retro90 .retro-topline span:last-child{display:none} .retro90 .retro-nav{gap:12px} .retro90 .retro-hero-body{padding:32px 14px 24px} .retro90 .retro-hero h1{letter-spacing:-2px} .retro90 .retro-status{font-size:10px} }
@media(prefers-reduced-motion:reduce) { .retro90 .retro-blink,.retro90 .retro-marquee>div { animation:none!important; } }
`;
export default Home;
