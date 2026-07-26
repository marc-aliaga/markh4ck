import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import pranay from "../assets/pranay.jpg";
import { FadeIn, FadeInStagger } from "./FadeIn";
import { LockIcon } from "./Icons";
import VslPlayer from "./VslPlayer";
import LeadQuiz from "./LeadQuiz";
import Faq from "./Faq";
import Socials from "./Socials";

const YOUTUBE_VIDEOS = [
  {
    id: "YYyjC55o7Dk",
    title: "Crackeando un serial paso a paso (Ingeniería Inversa)",
  },
  {
    id: "l2LuTCvoC-g",
    title: "Esto es lo que hay dentro de un .EXE",
  },
  {
    id: "slNbu0a65so",
    title: "Aprende a crackear un programa desde 0 (CTF)",
  },
];

// TODO: sustituye cada videoId por el vídeo explicativo real del módulo
const LEVELS = [
  {
    n: "01",
    title: "Entendiendo el lenguaje máquina",
    desc: "Compilación, ensamblador, hexadecimal y formatos PE/ELF.",
    videoId: "dQw4w9WgXcQ",
  },
  {
    n: "02",
    title: "Análisis estático y dinámico con IA",
    desc: "Debuggers y disassemblers usando LLMs como copiloto para analizar binarios mucho más rápido.",
    videoId: "dQw4w9WgXcQ",
  },
  {
    n: "03",
    title: "Cracking de software",
    desc: "Licencias, anti-debug y packers: cómo funcionan y cómo saltárselos.",
    videoId: "dQw4w9WgXcQ",
  },
  {
    n: "04",
    title: "Explotación binaria y malware",
    desc: "De la vulnerabilidad al exploit, y análisis de muestras de malware reales.",
    videoId: "dQw4w9WgXcQ",
  },
  {
    n: "05",
    title: "Proyecto final",
    desc: "Aplica todo lo aprendido en un reto completo y entra en la comunidad privada.",
    videoId: "dQw4w9WgXcQ",
  },
];

function LevelCard({ level }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="group bg-[#131315] rounded-3xl border border-white/5 hover:border-[#da7756]/40 transition-colors p-8 max-md:p-6">
      <div className="flex items-center gap-8 max-md:flex-col max-md:items-start max-md:gap-4">
        <span className="text-6xl font-mono font-extrabold text-white/10 group-hover:text-[#da7756]/30 transition-colors shrink-0 max-md:text-4xl">
          {level.n}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-white mb-1">
            {level.title}
          </h3>
          <p className="text-[#8a8a93] leading-relaxed">{level.desc}</p>
          <button
            type="button"
            onClick={() => setShowVideo((v) => !v)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-mono text-[#da7756] hover:text-[#c2603f] transition-colors"
          >
            {showVideo ? "▲ ocultar vídeo del módulo" : "▶ ver vídeo del módulo"}
          </button>
        </div>
      </div>
      {showVideo && (
        <div className="mt-6 aspect-video max-w-[480px] rounded-2xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${level.videoId}`}
            title={`Vídeo explicativo — ${level.title}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

function Home() {
  const [videoFinished, setVideoFinished] = useState(false);
  const quizRef = useRef(null);

  const handleVideoFinish = () => {
    setVideoFinished(true);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <Container id="home">
      {/* Hero + VSL */}
      <FadeIn>
        <div
          id="vsl"
          className="text-center max-w-[820px] mx-auto pt-20 pb-14 max-md:pt-10 max-md:pb-8"
        >
          <h1 className="text-8xl font-extrabold tracking-tight leading-[1.02] max-md:text-[46px] max-md:leading-[1.05]">
            De 0 a{" "}
            <span className="inline-block bg-[#da7756] text-[#0a0a0a] px-4 rounded-2xl -rotate-1 max-md:px-2 max-md:rounded-xl">
              Hacker
            </span>
            <br />
            con IA
          </h1>
          <p className="mt-8 text-2xl text-[#8a8a93] max-w-[680px] mx-auto max-md:text-lg">
            Mira el vídeo de 5 minutos y descubre cómo pasar de cero a
            analizar binarios y explotar sistemas, usando la IA como
            copiloto.
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="max-w-[640px] mx-auto">
          <VslPlayer onFinish={handleVideoFinish} />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="flex items-center justify-center gap-3 mt-8 mb-4">
          <img
            src={pranay}
            alt="Mark H4ck"
            className="w-10 h-10 rounded-full object-cover grayscale"
          />
          <span className="text-sm font-mono text-[#8a8a93]">
            Por <span className="font-semibold text-white">Mark H4ck</span>{" "}
            · +4.000 seguidores
          </span>
        </div>
      </FadeIn>

      <div ref={quizRef} className="pt-6 scroll-mt-6">
        {videoFinished ? (
          <FadeIn>
            <LeadQuiz />
          </FadeIn>
        ) : (
          <div className="w-full bg-[#131315] rounded-3xl border border-dashed border-white/10 px-8 py-12 text-center">
            <LockIcon className="w-8 h-8 text-[#da7756] mx-auto mb-3" />
            <p className="text-white font-medium font-mono">
              &gt; termina_el_video_para_desbloquear_tu_acceso
            </p>
            <p className="text-sm text-[#8a8a93] mt-2">
              Al acabar, te haremos 4 preguntas rápidas para personalizar tu
              entrada a de0aHacker.
            </p>
          </div>
        )}
      </div>

      {/* Sistema de niveles */}
      <FadeIn>
        <div className="mt-24 mb-10 text-center max-md:mt-16">
          <span className="text-sm font-mono text-[#da7756]">
            &gt; temario
          </span>
          <h2 className="text-5xl font-extrabold tracking-tight mt-2 max-md:text-3xl">
            Nuestro sistema de niveles
          </h2>
        </div>
      </FadeIn>
      <FadeInStagger className="flex flex-col gap-3 mb-4">
        {LEVELS.map((level) => (
          <FadeIn key={level.n}>
            <LevelCard level={level} />
          </FadeIn>
        ))}
      </FadeInStagger>

      {/* Prueba social */}
      <FadeIn>
        <div className="mt-16 mb-4 bg-[#131315] rounded-3xl border border-white/5 p-12 text-center max-md:p-8">
          <p className="font-mono text-[#da7756] text-2xl max-md:text-lg">
            &gt; Si no puedes ver el Assembly, no conoces el programa.
          </p>
          <p className="mt-3 text-[#8a8a93] text-lg max-md:text-base">
            Comparto laboratorios de reversing y low-level con una comunidad
            de más de 4.000 apasionados por la tecnología.
          </p>
        </div>
      </FadeIn>

      <FadeInStagger className="grid gap-4 grid-cols-3 max-md:grid-cols-1 mb-4">
        {YOUTUBE_VIDEOS.map((video) => (
          <FadeIn key={video.id}>
            <div className="h-full bg-[#131315] rounded-3xl border border-white/5 overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-[#8a8a93] px-4 py-3 truncate">
                {video.title}
              </p>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>

      {/* FAQ */}
      <FadeIn>
        <div className="mt-8 mb-4">
          <Faq />
        </div>
      </FadeIn>

      {/* CTA final */}
      <FadeIn>
        <div className="mb-4 bg-[#131315] rounded-3xl border border-[#da7756]/30 p-14 text-center max-md:p-8 shadow-[0_0_80px_-20px_rgba(218,119,86,0.35)]">
          <h2 className="text-4xl font-extrabold text-white max-md:text-2xl">
            ¡Empieza tu camino como hacker hoy!
          </h2>
          <p className="mt-2 text-[#8a8a93] text-lg max-md:text-base">
            Mira el vídeo, responde 4 preguntas y entra a de0aHacker.
          </p>
          <Link
            to="/academia"
            className="inline-block mt-8 bg-[#da7756] hover:bg-[#c2603f] transition-colors text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-[0_0_40px_rgba(218,119,86,0.5)]"
          >
            Acceder a la academia →
          </Link>
        </div>
      </FadeIn>

      {/* Footer */}
      <FadeIn>
        <div className="mb-6 bg-[#131315] rounded-3xl border border-white/5 p-10 max-md:p-6">
          <Socials />
          <p className="text-center text-white/30 text-sm mt-6 font-mono">
            © {new Date().getFullYear()} de0aHacker · por Mark H4ck
          </p>
        </div>
      </FadeIn>
    </Container>
  );
}

export default Home;
