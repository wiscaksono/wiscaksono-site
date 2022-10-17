/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from "react";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";
import { VscTriangleUp } from "@react-icons/all-files/vsc/VscTriangleUp";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Snake from "./snake/snake";

export default function Home() {
  const [score, setScore] = useState();
  function handleSetScore(value) {
    setScore(value);
  }
  const ALLOWED_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  const [pressed, setPressed] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (ALLOWED_KEYS.includes(key) && !pressed.includes(key)) {
        setPressed((prevPressed) => [...prevPressed, key]);
      }
    };

    const handleKeyUp = (event) => {
      const { key } = event;
      setPressed(pressed.filter((k) => k !== key));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <motion.div
      className="w-full h-full bg-radial bg-no-repeat bg-right"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="flex items-center justify-center h-full max-w-7xl mx-auto">
        <div className="lg:w-1/2 w-full mx-10 lg:ml-10 flex flex-col justify-between h-[80%] lg:h-auto">
          <div className="mb-20">
            <p className="text-white text-lg">Hi all. I am</p>
            <h1 className="text-white lg:text-6xl md:text-5xl text-5xl">
              Wisnu Wicaksono
            </h1>

            <h2 className=" text-[#E99287] lg:text-3xl md:text-2xl text-xl flex items-center gap-3">
              <span className="animate-pulse">&#62;</span>
              <Typewriter
                options={{
                  loop: true,
                  wrapperClassName:
                    " text-[#E99287] lg:text-3xl md:text-2xl text-xl gap-3",
                  cursorClassName:
                    " text-[#E99287] lg:text-3xl md:text-2xl text-xl gap-3",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("front-end.web(developer)_")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("electrical-engineer_")
                    .pauseFor(500)
                    .start();
                }}
              />
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-[#607B96]">
              // you can also see it on my Github page
            </p>
            <p>
              <span className="text-[#4D5BCE]">const</span>{" "}
              <span className="text-[#43D9AD]">githubLink</span>{" "}
              <span className="text-white">=</span>{" "}
              <a
                href="https://github.com/wiscaksono"
                className="text-[#E99287]"
                target="_blank"
                rel="noreferrer"
              >
                "https://github.com/wiscaksono"
              </a>
            </p>
          </div>
        </div>

        <div className="w-1/2 overflow-hidden max-h-[90%] hidden lg:block mr-10">
          <div className="border border-[#0C1616] bg-gradient-to-br from-[#175553] to-[#43D9AD]/10 rounded-lg p-[35px] backdrop-blur-[32px] relative flex gap-6 items-start justify-center">
            <div className="w-1/2 bg-[#263746] rounded-lg  inner-shadow-snake">
              <Snake scoreSnake={handleSetScore} />
            </div>

            <div className="w-1/2 h-full flex flex-col items-center justify-center">
              <div className="bg-[#01142330] rounded-lg p-3 text-white mb-5">
                <div className="mb-4">
                  <p>// use keyboard</p>
                  <p>// arrows to play</p>
                </div>

                <div className="grid grid-cols-3 grid-rows-2 gap-1">
                  <div
                    className={`col-span-3 col-start-2  border border-[#1E2D3D] rounded-lg w-max py-2.5 px-5 transition-all duration-0  shadow-sm shadow-[#607B96] ${
                      pressed.includes("ArrowUp")
                        ? "scale-105 bg-[#071c2e]"
                        : "bg-[#010C15]"
                    }`}
                  >
                    <VscTriangleUp />
                  </div>

                  <div
                    className={`border border-[#1E2D3D] rounded-lg w-max py-2.5 px-5 transition-all duration-0  shadow-sm shadow-[#607B96] ${
                      pressed.includes("ArrowLeft")
                        ? "scale-105 bg-[#071c2e]"
                        : "bg-[#010C15]"
                    }`}
                  >
                    <VscTriangleUp className="-rotate-90" />
                  </div>

                  <div
                    className={`border border-[#1E2D3D] rounded-lg w-max py-2.5 px-5 transition-all duration-0  shadow-sm shadow-[#607B96] ${
                      pressed.includes("ArrowDown")
                        ? "scale-105 bg-[#071c2e]"
                        : "bg-[#010C15]"
                    }`}
                  >
                    <VscTriangleUp className="rotate-180" />
                  </div>

                  <div
                    className={`border border-[#1E2D3D] rounded-lg w-max py-2.5 px-5 transition-all duration-0  shadow-sm shadow-[#607B96] ${
                      pressed.includes("ArrowRight")
                        ? "scale-105 bg-[#071c2e]"
                        : "bg-[#010C15]"
                    }`}
                  >
                    <VscTriangleUp className="rotate-90" />
                  </div>
                </div>
              </div>

              <div className="self-start text-white">
                <p>// your score : {score}</p>
              </div>
            </div>

            <div>
              <div className="x-button-snake p-1 w-max rounded-full top-3 left-3 absolute">
                <RiCloseLine className="text-[#48b3aa] text-[12px]" />
              </div>
              <div className="x-button-snake p-1 w-max rounded-full top-3 right-3 absolute">
                <RiCloseLine className="text-[#48b3aa] text-[12px]" />
              </div>
              <div className="x-button-snake p-1 w-max rounded-full bottom-3 right-3 absolute">
                <RiCloseLine className="text-[#48b3aa] text-[12px]" />
              </div>
              <div className="x-button-snake p-1 w-max rounded-full bottom-3 left-3 absolute">
                <RiCloseLine className="text-[#48b3aa] text-[12px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
