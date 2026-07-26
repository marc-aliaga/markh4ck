import React, { useEffect, useRef, useState } from "react";

const YOUTUBE_VIDEO_ID = "cA1kl_Pnzxk";

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  return new Promise((resolve) => {
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
  });
}

function VslPlayer({ onFinish }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => setErrored(true), 8000);

    loadYouTubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new YT.Player(containerRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (e) => {
            clearTimeout(timeout);
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.ENDED) onFinish?.();
          },
          onError: () => {
            clearTimeout(timeout);
            setErrored(true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      playerRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video bg-[#0d0d0f] rounded-3xl overflow-hidden border-2 border-[#da7756]/50 shadow-[0_0_0_1px_rgba(218,119,86,0.15),0_30px_80px_-20px_rgba(218,119,86,0.4)]">
        <div ref={containerRef} className="w-full h-full" />
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
