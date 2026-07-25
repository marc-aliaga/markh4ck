import React, { useRef, useState } from "react";
import Container from "./Container";
import pranay from "../assets/pranay.jpg";
import { FadeIn, FadeInStagger } from "./FadeIn";
import { LockIcon } from "./Icons";
import VslPlayer from "./VslPlayer";
import LeadQuiz from "./LeadQuiz";
import Faq from "./Faq";
import Socials from "./Socials";

const LEVELS = [
  {
    n: "01",
    title: "Fundamentos",
    desc: "Arquitectura, ensamblador y cómo piensa una máquina por dentro.",
  },
  {
    n: "02",
    title: "Reversing con IA",
    desc: "Usa LLMs como copiloto para analizar binarios mucho más rápido.",
  },
  {
    n: "03",
    title: "Hacking ético",
    desc: "Explotación práctica paso a paso, de forma segura y legal.",
  },
  {
    n: "04",
    title: "Automatización",
    desc: "Scripts y agentes de IA para acelerar tu flujo de trabajo.",
  },
  {
    n: "05",
    title: "Proyecto final",
    desc: "Aplica todo lo aprendido y entra en la comunidad privada.",
  },
];

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
            De 0 a <span className="text-[#da7756]">Hacker</span>
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
            <div className="group flex items-center gap-8 bg-[#131315] rounded-3xl border border-white/5 hover:border-[#da7756]/40 transition-colors p-8 max-md:flex-col max-md:items-start max-md:gap-4 max-md:p-6">
              <span className="text-6xl font-mono font-extrabold text-white/10 group-hover:text-[#da7756]/30 transition-colors shrink-0 max-md:text-4xl">
                {level.n}
              </span>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {level.title}
                </h3>
                <p className="text-[#8a8a93] leading-relaxed">
                  {level.desc}
                </p>
              </div>
            </div>
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

      <FadeInStagger className="grid gap-4 grid-cols-3 max-mdd:grid-cols-1 mb-4">
        {[1, 2, 3].map((n) => (
          <FadeIn key={n}>
            <div className="h-full bg-[#131315] rounded-3xl border border-dashed border-white/10 p-6 flex items-center justify-center text-center">
              <p className="text-sm text-[#6b6a66] italic">
                Testimonio de alumno #{n} — sustituye este bloque antes de
                publicar.
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
            Empieza gratis ahora mismo
          </h2>
          <p className="mt-2 text-[#8a8a93] text-lg max-md:text-base">
            Mira el vídeo, responde 4 preguntas y entra a de0aHacker.
          </p>
          <a
            href="#vsl"
            className="inline-block mt-8 bg-[#da7756] hover:bg-[#c2603f] transition-colors text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-[0_0_40px_rgba(218,119,86,0.5)]"
          >
            Ver el vídeo →
          </a>
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
