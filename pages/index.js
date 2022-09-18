/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Typewriter from "typewriter-effect";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useTheme } from "next-themes";
import { useState, useEffect, Fragment } from "react";
import "swiper/css";
import Head from "next/head";
import { projects } from "/json/data.json";
import { Dialog, Transition } from "@headlessui/react";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <a
          role={"button"}
          className="font-extrabold text-sm absolute right-0 bottom-10 writing-mode-tb -rotate-180"
          onClick={() => setTheme("light")}
        >
          light mode.
        </a>
      );
    } else {
      return (
        <a
          role={"button"}
          className="font-extrabold text-sm absolute right-0 bottom-10 writing-mode-tb -rotate-180"
          onClick={() => setTheme("dark")}
        >
          dark mode.
        </a>
      );
    }
  };
  return (
    <>
      <Head>
        <title>Wiscaksono</title>
        <meta name="description" content="Wisnu Wicaksono Personal Page" />
      </Head>
      <header
        className="flex items-center justify-center  border-t-4 border-t-black dark:border-t-white border-b-2 border-b-[#E7E7E7] transition-colors duration-300"
        id="main"
      >
        <div className="w-full h-full">
          <nav className="flex items-center justify-between w-[90%] mx-auto mt-11">
            <a href="/" className="text-4xl font-extrabold">
              wsn.
            </a>
            <h6 className="font-semibold">personal site</h6>
          </nav>
          <div className="w-[95%] relative flex items-center justify-center h-[calc(100vh-90px)] mx-auto">
            <div>
              <Typewriter
                options={{
                  loop: true,
                  wrapperClassName: "lg:text-5xl text-xl dot-gothic",
                  cursorClassName: "lg:text-5xl text-xl dot-gothic",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Wisnu Wicaksono")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("front-end.web(developer)_")
                    .pauseFor(500)
                    .start();
                }}
              />
            </div>
            <ul className="flex md:flex-col gap-5 absolute md:left-0 left-auto top-5 md:top-auto flex-wrap justify-center">
              <li className="writing-mode-tb-nav text-sm">
                <a href="#main">home</a>
              </li>
              <li className="writing-mode-tb-nav text-sm">
                <a href="#cases">cases</a>
              </li>
              <li className="writing-mode-tb-nav text-sm">
                <a href="#projects">projects</a>
              </li>
              <li className="writing-mode-tb-nav text-sm">
                <a href="#about-me">about me</a>
              </li>
              <li className="writing-mode-tb-nav text-sm">
                <a href="#contact">contact</a>
              </li>
            </ul>
            {renderThemeChanger()}
          </div>
        </div>
      </header>
      <main>
        <section className="border-b-2 border-b-[#E7E7E7]" id="cases">
          <div className=" ml-[5%] flex flex-col md:flex-row items-start my-[182px] gap-[92px] overflow-hidden">
            <div className="flex flex-col gap-2 writing-mode-tb-case flex-grow-0">
              <h3 className="font-extrabold text-3xl ">amazing cases</h3>
              <div className="md:w-[7px] md:h-[90px] w-[90px] h-[7px] bg-black dark:bg-white lg:self-end" />
            </div>

            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              modules={[Autoplay]}
              autoplay={{
                delay: 2000,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              grabCursor={true}
            >
              {projects.map((data, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <ModalImage image={data.image} alt="image" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
        <section className="border-b-2 border-b-[#E7E7E7]" id="about-me">
          <div className="w-[90%] mx-auto mt-[161px]">
            <div className="flex flex-col gap-2 mb-24">
              <h3 className="font-extrabold text-3xl text-start">about me</h3>
              <div className="w-[90px] h-[7px] bg-black dark:bg-white" />
            </div>

            <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-center gap-[71px] mb-[74px]">
              <Image
                src="/profile-pict2.png"
                width={198}
                height={198}
                alt="Profile Picture"
              />
              <div>
                <h4 className="text-3xl mb-3">Wisnu Wicaksono</h4>
                <p className="font-extralight text-sm mb-3">
                  I am an active 8th semester student at the Institute of
                  Technology-PLN majoring in Electrical Engineering. I am also a
                  sociable person, able to work well together, and able to
                  implement the material that I understand. Besides, I can
                  operate various programming languages.
                </p>
                <div className="flex gap-2 text-sm">
                  <a
                    href="https://www.instagram.com/amachoker/"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    INSTAGRAM
                  </a>
                  <a
                    href="https://github.com/wiscaksono"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    GITHUB
                  </a>
                  <a href="mailto:wwicaksono96@gmail.com" rel="noreferrer">
                    EMAIL
                  </a>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-4  gap-[34px] md:grid-cols-2 grid-cols-1 mb-[123px]">
              <div className="py-4 pl-5 pr-3 border border-gray-200 rounded-[10px] flex items-center gap-4">
                <div className="pr-4 border-r border-black/25 dark:border-white/25 flex items-center justify-center">
                  <Image
                    src={"/icons/ui-ux.svg"}
                    width={30}
                    height={30}
                    alt="UI UX Design"
                    className="invert-0 dark:invert"
                  />
                </div>

                <div>
                  <h6 className="text-base font-extrabold">
                    Interface & Design
                  </h6>
                  <p className="text-xs font-extralight">
                    Briefing, wireframe, UX, UI and branding.
                  </p>
                </div>
              </div>
              <div className="py-4 pl-5 pr-3 border border-gray-200 rounded-[10px] flex items-center gap-4">
                <div className="pr-4 border-r border-black/25 dark:border-white/25 flex items-center justify-center">
                  <Image
                    src={"/icons/html-css.svg"}
                    width={30}
                    height={30}
                    alt="HTML CSS"
                    className="invert-0 dark:invert"
                  />
                </div>

                <div>
                  <h6 className="text-base font-extrabold">HTML & CSS</h6>
                  <p className="text-xs font-extralight">
                    Responsive websites with fast loading.
                  </p>
                </div>
              </div>
              <div className="py-4 pl-5 pr-3 border border-gray-200 rounded-[10px] flex items-center gap-4">
                <div className="pr-4 border-r border-black/25 dark:border-white/25 flex items-center justify-center">
                  <Image
                    src={"/icons/next-js.svg"}
                    width={30}
                    height={30}
                    alt="Next Js"
                    className="invert-0 dark:invert"
                  />
                </div>

                <div>
                  <h6 className="text-base font-extrabold">Next.js</h6>
                  <p className="text-xs font-extralight">
                    Build your system with node.js.
                  </p>
                </div>
              </div>
              <div className="py-4 pl-5 pr-3 border border-gray-200 rounded-[10px] flex items-center gap-4">
                <div className="pr-4 border-r border-black/25 dark:border-white/25 flex items-center justify-center">
                  <Image
                    src={"/icons/wordpress.svg"}
                    width={30}
                    height={30}
                    alt="Wordpress"
                    className="invert-0 dark:invert"
                  />
                </div>

                <div>
                  <h6 className="text-base font-extrabold">Wordpress</h6>
                  <p className="text-xs font-extralight">
                    Create your e-commerce or blog with PHP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer
          className="h-[70vh] items-center justify-center flex w-[90%] relative mx-auto"
          id="contact"
        >
          <div>
            <div className="flex items-center justify-center flex-col gap-2 mb-[62px]">
              <h3 className="font-extrabold text-[30px]">contact me</h3>
              <div className="w-[90px] h-[7px] bg-black dark:bg-white" />
            </div>
            <div className="flex items-center justify-center gap-[84px] mb-[78px] flex-wrap">
              <a href="#" className="w-[35px] h-[35px]">
                <Image
                  src={"/icons/figma.svg"}
                  alt="Figma"
                  width={"100%"}
                  height={"100%"}
                  className="dark:invert"
                />
              </a>
              <a href="#" className="w-[35px] h-[35px]">
                <Image
                  src={"/icons/linkedin.svg"}
                  alt="Figma"
                  width={"100%"}
                  height={"100%"}
                  className="dark:invert"
                />
              </a>
              <a
                href="https://www.instagram.com/amachoker/"
                className="w-[35px] h-[35px]"
                target={"_blank"}
                rel="noreferrer"
              >
                <Image
                  src={"/icons/instagram.svg"}
                  alt="Instagram"
                  width={"100%"}
                  height={"100%"}
                  className="dark:invert"
                />
              </a>
              <a
                href="https://github.com/wiscaksono"
                className="w-[35px] h-[35px]"
                target={"_blank"}
                rel="noreferrer"
              >
                <Image
                  src={"/icons/github.svg"}
                  alt="Github"
                  width={"100%"}
                  height={"100%"}
                  className="dark:invert"
                />
              </a>
              <a href="#" className="w-[35px] h-[35px]">
                <Image
                  src={"/icons/dribble.svg"}
                  alt="Dribble"
                  width={"100%"}
                  height={"100%"}
                  className="dark:invert"
                />
              </a>
              <a href="#" className="w-[35px] h-[35px]">
                <Image
                  src={"/icons/youtube.svg"}
                  alt="Youtube"
                  width={"100%"}
                  height={"100%"}
                  className="dark:invert"
                />
              </a>
            </div>

            <div className="flex items-center justify-center">
              <div>
                <h4 className="font-semibold text-lg mb-1.5">
                  order of service
                </h4>
                <div className="w-[18px] h-[2px] bg-black dark:bg-white self-start" />
              </div>
            </div>

            <a
              href="#main"
              className="text-4xl font-extrabold absolute bottom-5 left-0"
            >
              wsn.
            </a>
            <p className="text-xs font-light text-[#808080] absolute bottom-5 right-0">
              design by <span className="font-bold">marcos oliveira</span>{" "}
              <br className="block md:hidden" /> & coding by{" "}
              <span className="font-bold">me</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function ModalImage({ image }) {
  return (
    <>
      <Image
        src={`/projects/${image}`}
        width={391}
        height={356}
        className="object-cover"
        quality={80}
        alt="Image"
      />
    </>
  );
}
