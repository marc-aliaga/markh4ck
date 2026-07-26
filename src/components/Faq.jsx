import React, { useState } from "react";
import { ChevronDownIcon } from "./Icons";

const FAQS = [
  {
    q: "¿Necesito experiencia previa en programación?",
    a: "No. de0aHacker está pensado para empezar desde 0: primero construyes las bases (arquitectura, ensamblador, lógica) y luego avanzas hacia reversing y hacking real.",
  },
  {
    q: "¿Qué diferencia esta academia de otros cursos de hacking?",
    a: "Aprendes a usar la IA como copiloto para analizar binarios y automatizar tareas más rápido, en vez de hacerlo todo manualmente como en los cursos tradicionales.",
  },
  {
    q: "¿Cuánto tiempo tengo acceso al contenido?",
    a: "de0aHacker funciona por suscripción mensual: mientras tu suscripción esté activa tienes acceso a todos los módulos, las actualizaciones y la comunidad privada. Puedes cancelar cuando quieras y conservas el acceso hasta el final del periodo ya pagado.",
  },
  {
    q: "¿Hay comunidad o soporte incluido?",
    a: "Sí, al completar el formulario accedes a la comunidad privada en Skool donde resolvemos dudas y compartimos retos.",
  },
];

function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-[820px] mx-auto w-full bg-[#131315] rounded-3xl border border-white/5 px-10 py-14 max-md:px-5 max-md:py-8">
      <h3 className="text-4xl font-bold text-white mb-10 text-center max-md:text-2xl max-md:mb-6">
        Preguntas frecuentes
      </h3>
      <div className="flex flex-col divide-y divide-white/10">
        {FAQS.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div key={item.q} className="py-6">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-6 text-left"
              >
                <span className="text-xl font-medium text-white max-md:text-base">
                  {item.q}
                </span>
                <ChevronDownIcon
                  className={`w-6 h-6 text-[#da7756] shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="mt-4 text-lg text-[#8a8a93] leading-relaxed max-md:text-base">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;
