import React from "react";

const socialData = [
  {
    name: "Youtube",
    link: "https://www.youtube.com/@MarkH4ck",
  },
  {
    name: "github",
    link: "https://github.com/marc-aliaga",
  },
  {
    name: "Discord ",
    link: "https://discord.gg/UFwYYs6Qw",
  },
];
function Socials() {
  return (
    <div className="flex overflow-hidden justify-around items-center gap-x-2 gap-y-2 my-2  max-md:grid max-md:auto-cols-[1fr] max-md:gap-x-2 max-md:gap-y-2 max-md:grid-cols-[1fr_1fr] max-md:grid-rows-[auto_auto]">
      {socialData.map((social) => (
        <a
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer"
          className="flex w-full min-h-[56px] justify-center items-center bg-white/5 border border-white/5 hover:border-[#39ff14]/50 hover:bg-white/10 hover:shadow-[0_0_25px_-8px_rgba(57,255,20,0.6)] transition-all duration-300 ease-[ease-out] text-white text-lg leading-6 text-center tracking-[-0.01em] px-6 py-4 rounded-[99px]"
        >
          {social.name}
        </a>
      ))}
    </div>
  );
}

export default Socials;
