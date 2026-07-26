import React, { useState } from "react";
import { CheckIcon } from "./Icons";

// TODO: sustituye por la URL real de tu comunidad/curso en Skool.
const SKOOL_URL = "https://www.skool.com/de0ahacker";

// TODO: pega aquí la URL de tu Google Apps Script (Deploy > Web app).
// Con esto, cada respuesta del quiz se guarda como fila en tu Google Sheet.
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
      origen: "quiz",
      fecha: new Date().toISOString(),
    }),
  }).catch(() => {});
}

const QUESTIONS = [
  {
    key: "disciplina",
    question: "¿Cuál es tu disciplina en informática?",
    options: ["Reverser", "Pentester", "Programador", "Otro"],
  },
  {
    key: "nivel",
    question: "¿Cuál es tu nivel actual?",
    options: [
      "Principiante total",
      "Tengo bases",
      "Nivel intermedio",
      "Avanzado",
    ],
  },
  {
    key: "tiempo",
    question: "¿Cuánto tiempo puedes dedicarle a la semana?",
    options: ["Menos de 2h", "2-5h", "5-10h", "Más de 10h"],
  },
  {
    key: "objetivo",
    question: "¿Cuál es tu objetivo principal?",
    options: [
      "Conseguir trabajo en ciberseguridad",
      "Aprender por hobby",
      "Mejorar en mi trabajo actual",
      "Crear mis propias herramientas",
    ],
  },
];

function LeadQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [redirecting, setRedirecting] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const handleSelect = (option) => {
    const nextAnswers = { ...answers, [current.key]: option };
    setAnswers(nextAnswers);

    if (!isLast) {
      setTimeout(() => setStep((s) => s + 1), 250);
      return;
    }

    sendLeadToSheet(nextAnswers);
    const params = new URLSearchParams({ utm_source: "vsl", ...nextAnswers });
    const url = `${SKOOL_URL}?${params.toString()}`;
    setRedirectUrl(url);
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = url;
    }, 5000);
  };

  if (redirecting) {
    return (
      <div className="w-full bg-[#131315] rounded-3xl border border-[#da7756]/30 px-8 py-14 text-center max-md:px-5 max-md:py-10 shadow-[0_0_80px_-20px_rgba(218,119,86,0.35)]">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#da7756]/10 border border-[#da7756]/40 mb-6">
          <CheckIcon className="w-7 h-7 text-[#da7756]" />
        </span>
        <h3 className="text-3xl font-bold text-white max-md:text-2xl">
          Ya tienes tu plaza en de0aHacker
        </h3>
        <p className="mt-4 text-lg text-[#8a8a93] max-w-[560px] mx-auto leading-relaxed max-md:text-base">
          Partiendo de tu nivel —{" "}
          <span className="text-white font-medium">{answers.nivel}</span>—
          vas a tener las lecciones, los laboratorios de reversing con IA y
          la comunidad que necesitas para conseguir tu objetivo:{" "}
          <span className="text-white font-medium">{answers.objetivo}</span>.
        </p>

        <a
          href={redirectUrl || "#"}
          className="inline-block mt-8 bg-[#da7756] hover:bg-[#c2603f] transition-colors text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-[0_0_40px_rgba(218,119,86,0.5)]"
        >
          Entrar a de0aHacker →
        </a>

        <p className="mt-4 text-xs font-mono text-[#6b6a66]">
          &gt; te llevamos automáticamente en unos segundos...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#131315] rounded-3xl border border-white/5 px-8 py-10 max-md:px-5">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {QUESTIONS.map((q, idx) => (
          <div
            key={q.key}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              idx <= step ? "bg-[#da7756]" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <p className="text-sm font-mono font-medium text-[#da7756] mb-2">
        Pregunta {step + 1} de {QUESTIONS.length}
      </p>
      <h3 className="text-3xl font-bold text-white mb-6 max-md:text-2xl">
        {current.question}
      </h3>

      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        {current.options.map((option) => {
          const selected = answers[current.key] === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`flex items-center justify-between gap-3 text-left px-5 py-4 rounded-2xl border transition-colors ${
                selected
                  ? "border-[#da7756] bg-[#da7756]/10 text-white"
                  : "border-white/10 hover:border-[#da7756]/60 text-white"
              }`}
            >
              <span className="font-medium">{option}</span>
              {selected && (
                <CheckIcon className="w-5 h-5 text-[#da7756] shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LeadQuiz;
