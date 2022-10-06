// React icons
import { RiFolder3Fill } from "@react-icons/all-files/ri/RiFolder3Fill";
import { GoTriangleDown } from "@react-icons/all-files/go/GoTriangleDown";
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";
import { SiMarkdown } from "@react-icons/all-files/si/SiMarkdown";
import { VscCollapseAll } from "@react-icons/all-files/vsc/VscCollapseAll";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { Popover, Transition } from "@headlessui/react";
import { CopyBlock, nord } from "react-code-blocks";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import gearData from "../data/GearData.json";

export default function AboutMe() {
  const [render, setRender] = useState("my-bio");

  function Render(value) {
    if (value === "/") {
      return <Root />;
    } else if (value === "my-bio") {
      return <MyBio closeBio={setRender} />;
    } else if (value === "interests") {
      return <Interests closeInterests={setRender} />;
    } else if (value === "gear") {
      return <Gear closeGear={setRender} />;
    }
  }

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="lg:grid grid-cols-12 h-full flex flex-col ">
        <div className="col-span-2 grid lg:grid-cols-6">
          <div className="col-span-6 lg:border-r lg:border-b-0 border-b border-[#1E2D3D] text-white gap-2.5 relative overflow-hidden">
            <PersonalInfo setRender={setRender} render={render} />
          </div>
        </div>
        <AnimatePresence>{Render(render)}</AnimatePresence>
      </div>
    </motion.div>
  );
}

function Root() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center text-white col-span-10"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      Nothing here, click something
    </motion.div>
  );
}

function MyBio({ closeBio }) {
  return (
    <motion.div
      className="col-span-10 h-full flex  justify-center overflow-hidden flex-col"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      <div className="w-full">
        <div className="grid grid-cols-12 border-b border-[#1E2D3D]">
          <div className="lg:col-span-2 col-span-5 text-white border-r border-[#1E2D3D] py-2.5 relative px-4">
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => {
                closeBio("/");
              }}
            >
              <AiOutlineClose />
            </button>
            <p className="pr-5 truncate">my-bio</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-thin h-full">
        <CopyBlock
          language={`jsx`}
          text={`
/*
I am Wisnu Wicaksono, a web developer, an electrical engineer and VIM pilot who lives in Jakarta, Indonesia.
I am a freelancer who is now working with an amazing team from different regions around the world. 
I like sports, new technology and games.
*/
          `}
          showLineNumbers={true}
          theme={nord}
          codeBlock
        />
      </div>
    </motion.div>
  );
}

function Interests({ closeInterests }) {
  return (
    <motion.div
      className="col-span-10 h-full flex  justify-center overflow-hidden flex-col"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      <div className="w-full">
        <div className="grid grid-cols-12 border-b border-[#1E2D3D]">
          <div className="lg:col-span-2 col-span-4 text-white border-r border-[#1E2D3D] py-2.5 relative px-4">
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => closeInterests("/")}
            >
              <AiOutlineClose />
            </button>
            <p>interests</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-thin h-full">
        <CopyBlock
          language={`jsx`}
          text={`belom`}
          showLineNumbers={true}
          theme={nord}
          wrapLines={true}
          codeBlock
        />
      </div>
    </motion.div>
  );
}

function Gear({ closeGear }) {
  console.log(gearData.gearType[0].gearList[1].type);
  function Content({ title, item, desc, list }) {
    return (
      <div className="mb-10">
        <h1 className="text-2xl font-medium text-white mb-5">{title}</h1>
        <div className="pl-10">
          <ul className="list-disc text-white/80">
            {list.map((data, index) => {
              return (
                <div key={index}>
                  <li className="font-medium text-lg text-white/90">
                    {data.item}
                  </li>
                  <p className="mb-2.5">{data.desc}</p>
                  <div className="flex gap-2.5 mb-5">
                    {data.type?.map((data, index) => {
                      return (
                        <div
                          className="text-xs bg-[#1b2b3a] py-1 px-2 rounded-full flex items-center gap-1.5 w-max "
                          key={index}
                        >
                          <div className="w-1 h-1 rounded-full bg-white" />
                          <span>{data}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="col-span-10 h-full flex  justify-center overflow-hidden flex-col"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      <div className="w-full">
        <div className="grid grid-cols-12 border-b border-[#1E2D3D]">
          <div className="lg:col-span-2 col-span-4 text-white border-r border-[#1E2D3D] py-2.5 relative px-4">
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => closeGear("/")}
            >
              <AiOutlineClose />
            </button>
            <p>gear</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-thin h-full lg:p-16 md:p-8 p-4">
        {gearData.gearType.map((data, index) => {
          return <Content title={data.gear} key={index} list={data.gearList} />;
        })}
      </div>
    </motion.div>
  );
}

function PersonalInfo({ setRender, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenBio, setIsOpenBio] = useState(false);
  const [isOpenInterests, setIsOpenInterests] = useState(false);

  function openPopover() {
    setIsOpen(!isOpen);
  }

  function CollapseAll() {
    setIsOpenInterests(false);
    setIsOpenBio(false);
  }

  function openPopoverBio() {
    setIsOpenBio(!isOpenBio);
  }

  function openPopoverInterests() {
    setIsOpenInterests(!isOpenInterests);
  }

  return (
    <Popover>
      <>
        <div className="relative">
          <Popover.Button
            className={`
                ${isOpen ? "text-white" : "text-white/50"}
               flex items-center gap-2.5 border-b border-[#1E2D3D] py-2.5 px-4 w-full`}
            onClick={openPopover}
          >
            <GoTriangleDown
              className={`${isOpen ? "" : "-rotate-90"} transition-all`}
            />
            <span className="text-left pr-5 truncate">personal info</span>
          </Popover.Button>
          <button
            onClick={CollapseAll}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          >
            <VscCollapseAll />
          </button>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-in duration-200"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <Popover.Panel className=" px-4 text-white py-4">
            <Popover.Group className={`flex flex-col gap-1.5`}>
              <Popover>
                <>
                  <Popover.Button
                    className={`
                ${isOpenBio ? "text-white" : "text-white/50"}
               flex items-center gap-2.5  w-full transition-colors`}
                    onClick={openPopoverBio}
                  >
                    <HiChevronRight
                      className={`${
                        isOpenBio ? "rotate-90" : ""
                      } transition-all`}
                    />
                    <RiFolder3Fill
                      className={`${
                        isOpenBio ? "text-[#E99287]" : "text-[#b36d64]"
                      } transition-colors`}
                    />
                    <span className="pr-5 truncate">bio</span>
                  </Popover.Button>

                  <Transition
                    show={isOpenBio}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-linear duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                    className="flex flex-col"
                  >
                    <Popover.Panel
                      className={`px-4 my-1 ml-2.5 inline-flex items-center gap-2.5 transition-colors ${
                        render === "my-bio" ? "text-white" : "text-[#607B96]"
                      }`}
                      as="button"
                      onClick={() => setRender("my-bio")}
                    >
                      <SiMarkdown />
                      <span className="truncate">my-bio</span>
                    </Popover.Panel>
                    <Popover.Panel
                      className={`px-4 my-1 ml-2.5 inline-flex items-center gap-2.5 transition-colors ${
                        render === "gear" ? "text-white" : "text-[#607B96]"
                      }`}
                      as="button"
                      onClick={() => setRender("gear")}
                    >
                      <SiMarkdown />
                      <span className="truncate">gear</span>
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>
              <Popover>
                <>
                  <Popover.Button
                    className={`
                ${isOpenInterests ? "text-white" : "text-white/50"}
               flex items-center gap-2.5  w-full transition-colors`}
                    onClick={openPopoverInterests}
                  >
                    <HiChevronRight
                      className={`${
                        isOpenInterests ? "rotate-90" : ""
                      } transition-all`}
                    />
                    <RiFolder3Fill
                      className={`${
                        isOpenInterests ? "text-[#E99287]" : "text-[#b36d64]"
                      } transition-colors`}
                    />
                    <span className="truncate">interests</span>
                  </Popover.Button>

                  <Transition
                    show={isOpenInterests}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-linear duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <Popover.Panel
                      className={`px-4 my-1 ml-2.5 inline-flex items-center gap-2.5 transition-colors ${
                        render === "interests" ? "text-white" : "text-[#607B96]"
                      }`}
                      as="button"
                      onClick={() => setRender("interests")}
                    >
                      <SiMarkdown />
                      <span className="pr-5 truncate">interests</span>
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>
            </Popover.Group>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  );
}
