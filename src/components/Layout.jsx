/* eslint-disable jsx-a11y/anchor-is-valid */
import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";
import { AiOutlineGithub } from "@react-icons/all-files/ai/AiOutlineGithub";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout({ children, setIsNavbar, isNavbar }) {
  // For toggle navbar on mobile
  const [navbar, setNavbar] = useState(false);

  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    if (windowDimension.winHeight > 768) {
      setNavbar(() => setNavbar(false));
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);
  // bg-[#010c15]
  return (
    <div
      className="h-screen flex bg-[#010c15] items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url("tower-nord.webp")` }}
    >
      <div className="custom-size bg-[#011627]/[85%] backdrop-blur-md rounded-lg border border-[#1E2D3D] flex justify-between flex-col overflow-hidden">
        <header className="grid grid-cols-12  text-[#607B96] border-b border-[#1E2D3D] items-center">
          <div className="lg:col-span-2 col-span-11 lg:border-r border-[#1E2D3D] py-4 pl-4">
            <span>Wisnu Wicaksono</span>
          </div>

          {/* Navbar  Desktop*/}
          <div className="col-span-10 hidden lg:block">
            <nav className="flex justify-between items-center">
              <div>
                <button
                  className={`px-5 py-4 border-r border-r-[#1E2D3D] border-b-2 h-full transition-all hover:text-white ${
                    isNavbar === "/"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-transparent"
                  }`}
                  onClick={() => {
                    setIsNavbar("/");
                  }}
                >
                  _hello
                </button>
                <button
                  className={`px-5 py-4 border-r border-r-[#1E2D3D] border-b-2 h-full transition-all hover:text-white ${
                    isNavbar === "about-me"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-transparent"
                  }`}
                  onClick={() => {
                    setIsNavbar("about-me");
                  }}
                >
                  _about-me
                </button>
                <button
                  className={`px-5 py-4 border-r border-r-[#1E2D3D] border-b-2 h-full transition-all hover:text-white ${
                    isNavbar === "projects"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-transparent"
                  }`}
                  onClick={() => {
                    setIsNavbar("projects");
                  }}
                >
                  _projects
                </button>
              </div>

              <button
                id="border-b"
                className={`px-5 py-4 border-l border-l-[#1E2D3D] border-b-2 h-full transition-all hover:text-white ${
                  isNavbar === "contact-me"
                    ? "border-b-2 border-[#FEA55F] text-white"
                    : "border-b-transparent"
                }`}
                onClick={() => {
                  setIsNavbar("contact-me");
                }}
              >
                _contact-me
              </button>
            </nav>
          </div>

          {/* Navbar Mobile */}
          {navbar ? (
            <button
              className="justify-self-center text-xl block lg:hidden"
              onClick={() => setNavbar((setNavbar) => !setNavbar)}
            >
              <AiOutlineClose />
            </button>
          ) : (
            <button
              className="justify-self-center text-xl block lg:hidden"
              onClick={() => setNavbar((setNavbar) => !setNavbar)}
            >
              <FiMenu />
            </button>
          )}
        </header>

        {/* Navbar mobile */}
        <AnimatePresence>
          {navbar ? (
            <motion.div
              className="flex flex-col h-full"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="flex flex-col h-full text-white">
                <button
                  className={`px-5 py-4 border-b  transition-all w-full text-left ${
                    isNavbar === "/"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-[#1E2D3D]"
                  }`}
                  onClick={() => {
                    setIsNavbar("/");
                    setNavbar(false);
                  }}
                >
                  _hello
                </button>
                <button
                  className={`px-5 py-4 border-b  transition-all w-full text-left ${
                    isNavbar === "about-me"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-[#1E2D3D]"
                  }`}
                  onClick={() => {
                    setIsNavbar("about-me");
                    setNavbar(false);
                  }}
                >
                  _about-me
                </button>
                <button
                  className={`px-5 py-4 border-b  transition-all w-full text-left ${
                    isNavbar === "projects"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-[#1E2D3D]"
                  }`}
                  onClick={() => {
                    setIsNavbar("projects");
                    setNavbar(false);
                  }}
                >
                  _projects
                </button>
                <button
                  className={`px-5 py-4 border-b  transition-all w-full text-left ${
                    isNavbar === "contact-me"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-[#1E2D3D]"
                  }`}
                  onClick={() => {
                    setIsNavbar("contact-me");
                    setNavbar(false);
                  }}
                >
                  _contact-me
                </button>
              </div>

              <footer className="block lg:hidden">
                <div className="grid grid-cols-12 px-5 text-[#607B96] border-t border-[#1E2D3D]">
                  <div className="col-span-11 flex items-center">
                    <p className="pr-4 py-1.5">find me in:</p>
                    <a
                      href="https://twitter.com/wiscaksono"
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-2.5 border-x border-[#1E2D3D] hover:text-white transition-colors"
                      aria-label="Follow me on twitter"
                    >
                      <AiOutlineTwitter />
                    </a>
                    <a
                      href="https://facebook.com/wiscaksono"
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-2.5 border-r border-[#1E2D3D] hover:text-white transition-colors"
                      aria-label="Follow me on facebook"
                    >
                      <FaFacebookF />
                    </a>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <a
                      href="https://github.com/wiscaksono"
                      className="flex items-center justify-center gap-1.5 pl-4 border-l border-[#1E2D3D] py-1.5 hover:text-white transition-colors"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Follow me on github"
                    >
                      <span className="hidden">Wiscaksono</span>
                      <AiOutlineGithub className="text-xl" />
                    </a>
                  </div>
                </div>
              </footer>
            </motion.div>
          ) : (
            <main className="self-center h-full w-full overflow-hidden">
              {children}
            </main>
          )}
        </AnimatePresence>
        <footer className="lg:grid grid-cols-12 text-[#607B96] border-t border-[#1E2D3D] hidden">
          <div className="col-span-2 flex items-center">
            <p className="px-4 py-1.5 truncate">find me in:</p>
            <a
              href="https://twitter.com/wiscaksono"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-2.5 border-x border-[#1E2D3D] hover:text-white transition-colors"
              aria-label="Follow me on twitter"
            >
              <AiOutlineTwitter />
            </a>
            <a
              href="https://facebook.com/wiscaksono"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-2.5 border-r border-[#1E2D3D] hover:text-white transition-colors"
              aria-label="Follow me on facebook"
            >
              <FaFacebookF />
            </a>
          </div>
          <div className="col-span-10 flex items-center justify-end ">
            <a
              href="https://github.com/wiscaksono"
              className="flex items-center justify-center gap-1.5 pl-4 border-l border-[#1E2D3D] py-1.5 hover:text-white transition-colors pr-4"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow me on github"
            >
              <span>Wiscaksono</span>
              <AiOutlineGithub className="text-xl" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
