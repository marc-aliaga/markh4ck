import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "./Container";
import { FadeIn } from "./FadeIn";
import { CheckIcon, DownloadIcon, LockIcon } from "./Icons";

const panelVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
};

const unlockedStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const unlockedItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// Mismo Apps Script que usa el LeadQuiz: cada email queda como fila en tu Google Sheet.
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxnIczMpP2xg2I1W5iGnpM5m9SAvch2X2ndSqDbT_9qSZ7v6rxSeyCFoT1DBxmoC-bH/exec";

// TODO: sube aquí los archivos reales a /public/descargas/ y actualiza esta lista
// (title = lo que ve el usuario, file = nombre exacto del archivo en /public/descargas/).
const RESOURCES = [
  {
    title: "Guía: Ghidra + Claude para Ingeniería Inversa con IA",
    file: "ghidra-mcp-claude-ingenieria-inversa.md",
  },
];

function sendLeadToSheet(email) {
  if (GOOGLE_SCRIPT_URL.includes("TU_ID_DE_SCRIPT")) return;
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      email,
      origen: "recursos-video",
      fecha: new Date().toISOString(),
    }),
  }).catch(() => {});
}

function Recursos() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("form"); // "form" | "loading" | "unlocked"

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLeadToSheet(email);
    setStatus("loading");
    setTimeout(() => setStatus("unlocked"), 900);
  };

  return (
    <Container id="recursos">
      <div className="max-w-[640px] mx-auto pt-20 pb-14 max-md:pt-10 max-md:pb-8">
        <FadeIn>
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold tracking-tight max-md:text-3xl">
              Recursos del <span className="text-[#da7756]">vídeo</span>
            </h1>
            <p className="mt-4 text-lg text-[#8a8a93] max-md:text-base">
              Pon tu email y te desbloqueo al instante todo lo que menciono en
              el vídeo.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="relative">
            <AnimatePresence mode="wait">
              {status === "unlocked" ? (
                <motion.div
                  key="unlocked"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full bg-[#131315] rounded-3xl border border-[#da7756]/30 px-8 py-10 max-md:px-5 shadow-[0_0_80px_-20px_rgba(218,119,86,0.35)]"
                >
                  <motion.div
                    variants={unlockedStagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.span
                      variants={unlockedItem}
                      transition={{ duration: 0.4, ease: "backOut" }}
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#da7756]/10 border border-[#da7756]/40 mb-6"
                    >
                      <CheckIcon className="w-7 h-7 text-[#da7756]" />
                    </motion.span>
                    <motion.h3
                      variants={unlockedItem}
                      className="text-2xl font-bold text-white mb-2"
                    >
                      ¡Gracias por ver el vídeo!
                    </motion.h3>
                    <motion.p
                      variants={unlockedItem}
                      className="text-[#8a8a93] mb-6"
                    >
                      Te avisaré por email en cuanto esté lista la academia.
                      Mientras tanto, aquí tienes tus recursos:
                    </motion.p>
                    <motion.div variants={unlockedItem} className="flex flex-col gap-3">
                      {RESOURCES.map((r) => (
                        <a
                          key={r.file}
                          href={`/descargas/${r.file}`}
                          download
                          className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border border-white/10 hover:border-[#da7756]/60 transition-colors text-white"
                        >
                          <span className="font-medium">{r.title}</span>
                          <DownloadIcon className="w-5 h-5 text-[#da7756] shrink-0" />
                        </a>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : status === "loading" ? (
                <motion.div
                  key="loading"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full bg-[#131315] rounded-3xl border border-white/5 px-8 py-16 max-md:px-5 flex flex-col items-center justify-center gap-4"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-full border-2 border-[#da7756]/30 border-t-[#da7756]"
                  />
                  <p className="text-sm font-mono text-[#8a8a93]">
                    &gt; desbloqueando_recursos...
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full bg-[#131315] rounded-3xl border border-white/5 px-8 py-10 max-md:px-5"
                >
                  <label
                    htmlFor="email"
                    className="flex items-center gap-2 text-sm font-mono text-[#8a8a93] mb-3"
                  >
                    <LockIcon className="w-4 h-4 text-[#da7756]" />
                    Tu email
                  </label>
                  <div className="flex gap-3 max-md:flex-col">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="flex-1 bg-black/30 border border-white/10 focus:border-[#da7756]/60 rounded-2xl px-5 py-4 text-white placeholder:text-[#6b6a66] outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-[#da7756] hover:bg-[#c2603f] transition-colors text-white font-bold px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(218,119,86,0.3)] whitespace-nowrap"
                    >
                      Descargar →
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </Container>
  );
}

export default Recursos;
