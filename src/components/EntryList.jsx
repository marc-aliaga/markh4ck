import React from "react";
import { Link } from "react-router-dom";
import { FadeIn, FadeInStagger } from "./FadeIn";
import { SECTIONS } from "../data/content";

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

function EntryCard({ entry }) {
  const sec = SECTIONS[entry.section];
  const red = sec.color === "red";
  return (
    <Link
      to={`${sec.route}/${entry.slug}`}
      className={`neon-card ${red ? "red" : ""} group flex flex-col rounded-2xl p-5 h-full`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`font-term text-[11px] px-2 py-0.5 rounded border ${
            red
              ? "text-[#ff1f3d] border-[#ff1f3d]/50 bg-[#ff1f3d]/5"
              : "text-[#39ff14] border-[#39ff14]/50 bg-[#39ff14]/5"
          }`}
        >
          {entry.category}
        </span>
        {entry.difficulty && (
          <span className="font-term text-[11px] text-[#8a8a93]">{entry.difficulty}</span>
        )}
        <span className="ml-auto font-term text-[11px] text-[#8a8a93]">
          {fmtDate(entry.date)}
        </span>
      </div>
      <h3 className="font-bebas text-2xl leading-[1.05] tracking-wide text-white group-hover:text-[#39ff14] transition-colors">
        {entry.title}
      </h3>
      <p className="mt-3 text-[#8a8a93] leading-relaxed flex-1">{entry.excerpt}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {entry.tags?.slice(0, 3).map((tg) => (
          <span
            key={tg}
            className="font-term text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#8a8a93]"
          >
            #{tg}
          </span>
        ))}
        <span
          className={`ml-auto font-term text-xs transition-colors ${
            red ? "text-[#ff1f3d]" : "text-[#39ff14]"
          } opacity-0 group-hover:opacity-100`}
        >
          leer →
        </span>
      </div>
    </Link>
  );
}

function EntryList({ entries }) {
  if (!entries?.length) {
    return (
      <p className="font-term text-sm text-[#8a8a93]">
        Todavía no hay nada por aquí. Pronto. _
      </p>
    );
  }
  return (
    <FadeInStagger faster className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
      {entries.map((entry) => (
        <FadeIn key={`${entry.section}/${entry.slug}`}>
          <EntryCard entry={entry} />
        </FadeIn>
      ))}
    </FadeInStagger>
  );
}

export default EntryList;
export { EntryCard };
