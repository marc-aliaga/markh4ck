import React, { useEffect, useState } from "react";
import Container from "./Container";
import { FadeIn } from "./FadeIn";
import { CheckIcon, LockIcon } from "./Icons";

// Apertura: finales de agosto de 2026
const LAUNCH_DATE = new Date(2026, 7, 31, 23, 59, 59);

// TODO: pega aquí la URL de tu Google Apps Script (Deploy > Web app) para
// guardar en tu Google Sheet los emails de la lista de espera.
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxnIczMpP2xg2I1W5iGnpM5m9SAvch2X2ndSqDbT_9qSZ7v6rxSeyCFoT1DBxmoC-bH/exec";

function sendLeadToSheet(data) {
  if (GOOGLE_SCRIPT_URL.includes("TU_ID_DE_SCRIPT")) return;
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      ...data,
      origen: "coming_soon",
      fecha: new Date().toISOString(),
    }),
  }).catch(() => {});
}

function getTimeLeft() {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) return;
    sendLeadToSheet({ nombre, email });
    setSubmitted(true);
  };

  return (
    <Container>
      <div className="max-w-[680px] mx-auto text-center pt-16 pb-24 max-md:pt-8 max-md:pb-14">
        <FadeIn>
          <span className="inline-flex items-center gap-2 bg-[#da7756]/10 border border-[#da7756]/40 text-[#da7756] text-sm font-mono font-bold px-4 py-2 rounded-full animate-pulse">
            🔒 próxima apertura · plazas limitadas
          </span>
        </FadeIn>

        <FadeIn>
          <h1 className="mt-8 text-6xl font-extrabold tracking-tight leading-[1.05] max-md:text-4xl">
            de0a
            <span className="inline-block bg-[#da7756] text-[#0a0a0a] px-3 rounded-2xl -rotate-1">
              Hacker
            </span>{" "}
            Academy
            <br />
            está a punto de abrir
          </h1>
          <p className="mt-6 text-xl text-[#8a8a93] max-md:text-base">
            Únete a la waitlist. Al abrir, tendrás acceso al precio que ves
            en pantalla antes de que suba.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mt-10 grid grid-cols-4 gap-3 max-w-[420px] mx-auto">
            {[
              { label: "días", value: timeLeft.days },
              { label: "horas", value: timeLeft.hours },
              { label: "min", value: timeLeft.minutes },
              { label: "seg", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-[#131315] border border-white/5 rounded-2xl py-4"
              >
                <div className="text-3xl font-mono font-extrabold text-white max-md:text-2xl">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-xs font-mono text-[#8a8a93] mt-1 uppercase">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 bg-[#131315] border border-[#da7756]/30 rounded-3xl p-10 shadow-[0_0_80px_-20px_rgba(218,119,86,0.35)] max-md:p-6">
            <p className="text-sm font-mono text-[#da7756] font-bold uppercase tracking-wide">
              Oferta de lanzamiento
            </p>
            <div className="mt-4 flex items-end justify-center gap-4 flex-wrap">
              <span className="text-6xl font-extrabold text-white max-md:text-5xl">
                12€
                <span className="text-xl text-[#8a8a93] font-medium">
                  /mes
                </span>
              </span>
              <span className="text-2xl text-[#6b6a66] line-through font-mono">
                20€/mes
              </span>
            </div>
            <p className="mt-3 text-[#8a8a93]">
              Precio válido solo para los primeros inscritos. Después de la
              apertura, sube a 20€/mes.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-10">
            {submitted ? (
              <div className="bg-[#131315] border border-[#da7756]/30 rounded-3xl p-8 text-center max-md:p-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#da7756]/10 border border-[#da7756]/40 mb-4">
                  <CheckIcon className="w-6 h-6 text-[#da7756]" />
                </span>
                <h3 className="text-2xl font-bold text-white">
                  ¡Estás dentro de la waitlist!
                </h3>
                <p className="mt-2 text-[#8a8a93]">
                  Te avisaremos por email en cuanto abramos. Tendrás acceso
                  al precio de 12€/mes que ves en pantalla.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="max-w-[480px] mx-auto"
              >
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="bg-[#0a0a0a] border border-white/10 focus:border-[#da7756] outline-none text-white placeholder:text-[#6b6a66] px-5 py-4 rounded-2xl transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="bg-[#0a0a0a] border border-white/10 focus:border-[#da7756] outline-none text-white placeholder:text-[#6b6a66] px-5 py-4 rounded-2xl transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full bg-[#da7756] hover:bg-[#c2603f] transition-colors text-white font-bold px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(218,119,86,0.5)]"
                >
                  Unirme a la waitlist →
                </button>
              </form>
            )}
            <p className="mt-4 text-xs font-mono text-[#6b6a66] flex items-center justify-center gap-1.5">
              <LockIcon className="w-3.5 h-3.5" /> sin spam, solo el aviso de
              apertura.
            </p>
          </div>
        </FadeIn>
      </div>
    </Container>
  );
}

export default ComingSoon;
