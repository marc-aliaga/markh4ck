import React, { useRef, useState } from "react";
import { PlayIcon } from "./Icons";

// Reemplaza esto por tu vídeo real cuando lo tengas.
// - Sube el archivo a /public/videos/vsl.mp4 (o cambia VIDEO_SRC por un embed de YouTube/Vimeo).
// - POSTER_SRC es la miniatura que se ve antes de darle a play.
const VIDEO_SRC = "/videos/vsl.mp4";
const POSTER_SRC = "";

function VslPlayer({ onFinish }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setErrored(true));
  };

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video bg-[#0d0d0f] rounded-3xl overflow-hidden border-2 border-[#da7756]/50 shadow-[0_0_0_1px_rgba(218,119,86,0.15),0_30px_80px_-20px_rgba(218,119,86,0.4)]">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC || undefined}
          className="w-full h-full object-cover"
          controls={playing}
          onEnded={onFinish}
          onError={() => setErrored(true)}
          playsInline
        />

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-t from-black/90 via-black/40 to-black/10 hover:via-black/55 transition-colors"
          >
            <span className="flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-[#da7756]/60 group-hover:bg-[#da7756]/10 transition-colors">
              <PlayIcon className="w-6 h-6 text-[#da7756] translate-x-[1px]" />
              <span className="text-white font-semibold text-sm tracking-wide">
                Ver vídeo
              </span>
            </span>
            <span className="text-[#8a8a93] font-mono text-xs tracking-wide">
              &gt; play_para_ver_como_funciona.sh
            </span>
          </button>
        )}
      </div>

      {errored && (
        <p className="mt-3 text-sm text-[#8a8a93] text-center font-mono">
          El vídeo aún no está disponible.{" "}
          <button
            type="button"
            onClick={onFinish}
            className="underline decoration-[#da7756] text-[#da7756] hover:text-[#ff8b66] font-medium"
          >
            Continúa aquí →
          </button>
        </p>
      )}
    </div>
  );
}

export default VslPlayer;
