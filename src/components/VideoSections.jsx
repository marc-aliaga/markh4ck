import React from "react";
import { CATEGORIES, videosByCategory } from "../data/videos";
import { FadeIn, FadeInStagger } from "./FadeIn";
import VideoCard from "./VideoCard";

function CategoryHeader({ cat }) {
  const red = cat.color === "red";
  const count = videosByCategory(cat.id).length;
  return (
    <div className="flex items-end justify-between gap-4 mb-6 max-md:flex-col max-md:items-start max-md:gap-2">
      <div>
        <div className="flex items-center gap-3">
          <span
            className={`font-term text-xs px-2 py-1 rounded border ${
              red
                ? "text-[#ff1f3d] border-[#ff1f3d]/50 bg-[#ff1f3d]/5"
                : "text-[#39ff14] border-[#39ff14]/50 bg-[#39ff14]/5"
            }`}
          >
            {cat.short}
          </span>
          <h3
            className={`font-dirt text-3xl max-md:text-2xl ${red ? "txt-blood" : "txt-acid"}`}
          >
            {cat.name}
          </h3>
        </div>
        <p className="mt-2 text-[#8a8a93] max-w-xl">{cat.tagline}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-term text-xs text-[#8a8a93] whitespace-nowrap">
          {count} {count === 1 ? "vídeo" : "vídeos"}
        </span>
        {cat.playlist && (
          <a
            href={cat.playlist}
            target="_blank"
            rel="noreferrer"
            className={`font-term text-xs whitespace-nowrap transition-colors ${
              red ? "text-[#ff1f3d] hover:text-white" : "text-[#39ff14] hover:text-white"
            }`}
          >
            playlist ↗
          </a>
        )}
      </div>
    </div>
  );
}

function VideoSections() {
  return (
    <div className="flex flex-col gap-16">
      {CATEGORIES.map((cat) => {
        const vids = videosByCategory(cat.id);
        if (!vids.length) return null;
        return (
          <section key={cat.id} id={cat.id} className="scroll-mt-20">
            <FadeIn>
              <CategoryHeader cat={cat} />
            </FadeIn>
            <FadeInStagger
              faster
              className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1"
            >
              {vids.map((v) => (
                <FadeIn key={v.id}>
                  <VideoCard video={v} accent={cat.color} />
                </FadeIn>
              ))}
            </FadeInStagger>
          </section>
        );
      })}
    </div>
  );
}

export default VideoSections;
