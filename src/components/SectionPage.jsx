import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { FadeIn } from "./FadeIn";
import EntryList from "./EntryList";
import { getSectionEntries, SECTIONS } from "../data/content";

function SectionPage({ section }) {
  const sec = SECTIONS[section];
  const entries = getSectionEntries(section);
  const red = sec.color === "red";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [section]);

  return (
    <Container>
      <div className="pt-10 pb-24 max-md:pt-6">
        <FadeIn>
          <nav className="font-term text-xs text-[#8a8a93] mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-[#39ff14]">inicio</Link>
            <span>/</span>
            <span className="text-white/70">{sec.label.toLowerCase()}</span>
          </nav>
        </FadeIn>
        <FadeIn>
          <p className={`font-mono text-sm mb-2 ${red ? "text-[#ff1f3d]" : "text-[#39ff14]"}`}>
            // {sec.route}
          </p>
          <h1 className="font-dirt text-5xl max-md:text-3xl txt-grunge">{sec.label}</h1>
          <p className="mt-3 text-[#8a8a93] max-w-2xl leading-relaxed">{sec.blurb}</p>
          <p className="mt-2 font-term text-xs text-[#8a8a93]">
            {entries.length} {entries.length === 1 ? "entrada" : "entradas"}
          </p>
        </FadeIn>
        <div className="mt-10">
          <EntryList entries={entries} />
        </div>
      </div>
    </Container>
  );
}

export default SectionPage;
