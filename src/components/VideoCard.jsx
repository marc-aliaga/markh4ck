import React from "react";
import { Link } from "react-router-dom";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

const fmtViews = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "")}K vistas` : `${n} vistas`;

const fmtLen = (s) => {
  const m = Math.floor(s / 60);
  const sec = String(s % 60).padStart(2, "0");
  return `${m}:${sec}`;
};

function VideoCard({ video, accent = "green" }) {
  const isRed = accent === "red";
  return (
    <Link
      to={`/video/${video.id}`}
      className={`neon-card ${isRed ? "red" : ""} group rounded-2xl overflow-hidden flex flex-col`}
    >
      <div className="relative aspect-video bg-black overflow-hidden">
        <img
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500"
        />
        {/* degradado inferior */}
        <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
        {/* play */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl text-black translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${
              isRed
                ? "bg-[#ff1f3d] shadow-[0_0_40px_rgba(255,31,61,0.7)]"
                : "bg-[#39ff14] shadow-[0_0_40px_rgba(57,255,20,0.7)]"
            }`}
          >
            ▶
          </span>
        </span>
        {video.part && (
          <span className="sticker absolute top-3 left-3 font-bebas text-sm tracking-wider text-white px-3 py-0.5">
            {video.part}
          </span>
        )}
        <span className="absolute bottom-2 right-2 font-term text-[11px] bg-black/80 text-[#39ff14] px-1.5 py-0.5 rounded">
          {fmtLen(video.length)}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-bebas text-[22px] leading-[1.05] tracking-wide text-white group-hover:text-[#39ff14] transition-colors">
          {video.title}
        </h3>
        <p className="mt-auto font-term text-[11px] text-[#8a8a93] flex items-center gap-2">
          <span>{fmtDate(video.date)}</span>
          <span className="text-[#39ff14]">·</span>
          <span>{fmtViews(video.views)}</span>
          <span className="text-[#8a8a93]/40">·</span>
          <span className="text-[#8a8a93]">{video.chapters.length} pasos</span>
        </p>
      </div>
    </Link>
  );
}

export default VideoCard;
