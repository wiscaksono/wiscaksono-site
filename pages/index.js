/* eslint-disable @next/next/no-img-element */
import Typewriter from "typewriter-effect";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useTheme } from "next-themes";
import { useState, useEffect, Fragment } from "react";
import "swiper/css";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import { projects } from "/json/data.json";
import { Dialog, Transition } from "@headlessui/react";

export default function Home({ newsData }) {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Get 4 data
  const personalProjects = [];
  for (let i = 0; i < 4; i++) {
    const getAllData = {
      title: `${newsData[i].title}`,
      description: `${newsData[i].description}`,
      url: `${newsData[i].url}`,
      image: `${newsData[i].urlToImage}`,
    };
    personalProjects.push(getAllData);
  }

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
            <a href="#main" className="text-4xl font-extrabold">
              wsn.
            </a>
            <div className="flex flex-col items-end">
              <h6 className="font-semibold">self service</h6>
              <p className="font-light text-xs">20% OFF</p>
            </div>
          </nav>
          <div className="w-[95%] relative flex items-center justify-center h-[calc(100vh-90px)] mx-auto">
            <Typewriter
              options={{
                loop: true,
                wrapperClassName: "text-5xl dot-gothic",
                cursorClassName: "text-5xl dot-gothic",
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
            <ul className="flex flex-col gap-5 absolute left-0">
              <li className="writing-mode-tb -rotate-180 text-sm">
                <a href="#main">home</a>
              </li>
              <li className="writing-mode-tb -rotate-180 text-sm">
                <a href="#cases">cases</a>
              </li>
              <li className="writing-mode-tb -rotate-180 text-sm">
                <a href="#projects">projects</a>
              </li>
              <li className="writing-mode-tb -rotate-180 text-sm">
                <a href="#about-me">about me</a>
              </li>
              <li className="writing-mode-tb -rotate-180 text-sm">
                <a href="#contact">contact</a>
              </li>
            </ul>

            {renderThemeChanger()}
          </div>
        </div>
      </header>
      <main>
        <section className="border-b-2 border-b-[#E7E7E7]" id="cases">
          <div className=" ml-[5%] flex items-start my-[182px] gap-[92px] ">
            <div className="flex flex-col gap-2 writing-mode-tb -rotate-180 flex-grow-0">
              <h3 className="font-extrabold text-3xl ">amazing cases</h3>
              <div className="w-[7px] h-[90px] bg-black dark:bg-white self-end" />
            </div>

            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              // grabCursor={true}
              modules={[Autoplay]}
              autoplay={{
                delay: 2000,
                // disableOnInteraction: false,
              }}
            >
              {projects.map((project, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <ModalImage image={project.image} alt="image" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>

        {/* <section className="border-b-2 border-b-[#E7E7E7]" id="projects">
          <div className="w-[90%] mx-auto my-[174px]">
            <div className="flex flex-col justify-end gap-2 mb-24">
              <h3 className="font-extrabold text-3xl text-end">
                personal projects
              </h3>
              <div className="w-[90px] h-[7px] bg-black self-end dark:bg-white" />
            </div>

            <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-rows-2 gap-[87px] mb-[87px]">
              {projects.map((project, idx) => {
                return (
                  <Project
                    judul={project.name}
                    desc={project.description}
                    url={project.url}
                    image={`/projects/${project.image}`}
                    key={idx}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-center">
              <button>
                <Link href="posts" className="font-semibold text-lg">
                  show more project
                </Link>
                <div className="w-6 h-[2px] bg-black dark:bg-white" />
              </button>
            </div>
          </div>
        </section> */}

        <section className="border-b-2 border-b-[#E7E7E7]" id="about-me">
          <div className="w-[90%] mx-auto mt-[161px]">
            <div className="flex flex-col gap-2 mb-24">
              <h3 className="font-extrabold text-3xl text-start">about me</h3>
              <div className="w-[90px] h-[7px] bg-black dark:bg-white" />
            </div>

            <div className="w-[90%] mx-auto flex items-center gap-[71px] mb-[74px]">
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
                />
              </a>
              <a href="#" className="w-[35px] h-[35px]">
                <Image
                  src={"/icons/linkedin.svg"}
                  alt="Figma"
                  width={"100%"}
                  height={"100%"}
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
                />
              </a>
              <a href="#" className="w-[35px] h-[35px]">
                <Image
                  src={"/icons/youtube.svg"}
                  alt="Youtube"
                  width={"100%"}
                  height={"100%"}
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
              design by <span className="font-bold">marcos oliveira</span> &
              coding by <span className="font-bold">me</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function ModalImage({ image }) {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal}>
        <Image
          src={`/projects/${image}`}
          width={391}
          height={356}
          className="object-cover"
          alt="aoskdasd"
        />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-2xl flex items-center justify-center">
                  <img
                    src={`/projects/${image}`}
                    className="w-max h-max"
                    alt={`oaskdas`}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const Project = ({ judul, desc, url, image }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function imageCheck(value) {
    if (value === "null") {
      return "/placeholder-image.webp";
    } else {
      return value;
    }
  }

  return (
    <div className="flex gap-9 flex-col lg:flex-row">
      <button
        className="lg:w-[233px] lg:h-[233px] h-[300px] bg-[#F9F9F9] flex-shrink-0 flex items-center justify-center relative"
        onClick={openModal}
      >
        <img
          src={imageCheck(image)}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-3 right-3">
          <p className="bg-white rounded-full text-[10px] py-[1px] px-2 font-extrabold">
            HTML
          </p>
        </div>
      </button>
      <article className="flex flex-col justify-between">
        <div>
          <h4 className="font-extrabold text-xl mb-1">{judul}</h4>
          <desc className="text-[#808080] font-light lg:line-clamp-5 line-clamp-3">
            {desc}
          </desc>
        </div>
        <a href={url} target={"_blank"} rel="noreferrer" className="w-max">
          <span>see project</span>
          <div className="w-6 h-[2px] bg-black dark:bg-white " />
        </a>
      </article>

      {/* Open Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-2xl flex items-center justify-center">
                  <img src={image} className="w-max h-max" alt={judul} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  let newsData;
  await axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`
    )
    .then((res) => {
      newsData = res.data.articles;
    });

  return {
    props: { newsData },
  };
};
