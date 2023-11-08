import { BiGitBranch, BiRefresh, BiXCircle } from "react-icons/bi";
import { IoWarningOutline, IoLogoGithub } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="border-t border-lines text-off-white text-xs flex items-center justify-between select-none bg-layout relative z-10">
      <div className="flex items-center border-r border-lines divide-x divide-lines">
        <a
          target="_blank"
          href="https://github.com/wiscaksono/wiscaksono-site"
          className="flex items-center gap-x-2 px-2 py-1 hover:text-white transition-colors"
        >
          <BiGitBranch className="text-lg" />
          <p>main</p>
        </a>
        <button className="items-center gap-x-2 px-2 py-1 md:flex hidden group">
          <BiRefresh className="text-xl group-active:rotate-180 transition-transform" />
        </button>
        <div className="items-center gap-x-1 px-2 py-1 md:flex hidden">
          <BiXCircle className="text-base" />
          <p>0</p>
          <IoWarningOutline className="text-base" />
          <p>0</p>
        </div>
        <div className="items-center gap-x-1 px-2 py-1 md:flex hidden">
          <p>--NORMAL--</p>
        </div>
      </div>

      <div className="flex items-center divide-x divide-lines border-l border-lines">
        <div className="items-center gap-x-2 px-2 py-1 md:flex hidden">
          <p>Special thanks to:</p>
          <a
            href="https://www.behance.net/darelova"
            target="_blank"
            className="hover:text-white transition-colors"
            data-umami-event="Yanka Darelova link"
          >
            Yanka Darelova
          </a>
        </div>
        <a
          target="_blank"
          href="https://github.com/wiscaksono"
          className="flex items-center gap-x-1 px-2 py-1 hover:text-white transition-colors"
          data-umami-event="GitHub link footer"
        >
          <p>Wiscaksono</p>
          <IoLogoGithub className="text-lg" />
        </a>
      </div>
    </footer>
  );
}
