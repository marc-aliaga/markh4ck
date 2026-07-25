import React from "react";

const socialData = [
  {
    name: "Youtube",
    link: "https://www.youtube.com/@MarkH4ck",
  },
  {
    name: "github",
    link: "https://github.com/markh4ck",
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
          className="flex w-full min-h-[56px] justify-center items-center bg-white/5 hover:bg-white/10 transition-colors duration-300 ease-[ease-out] text-white text-lg leading-6 text-center tracking-[-0.01em] px-6 py-4 rounded-[99px]"
        >
          {social.name}
        </a>
      ))}
    </div>
  );
}

export default Socials;
