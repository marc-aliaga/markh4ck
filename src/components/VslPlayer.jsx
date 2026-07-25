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
      <div className="relative w-full aspect-video bg-[#0d0d0f] rounded-2xl overflow-hidden border border-[#da7756]/30 shadow-[0_0_0_1px_rgba(218,119,86,0.15),0_30px_80px_-20px_rgba(218,119,86,0.45)]">
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
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0d0d0f]/80 hover:bg-[#0d0d0f]/70 transition-colors"
          >
            <span className="flex items-center justify-center w-20 h-20 rounded-full bg-[#da7756] shadow-[0_0_40px_rgba(218,119,86,0.6)] group-hover:bg-[#c2603f] transition-colors">
              <PlayIcon className="w-9 h-9 text-white translate-x-[2px]" />
            </span>
            <span className="text-white font-medium font-mono text-sm tracking-wide">
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
