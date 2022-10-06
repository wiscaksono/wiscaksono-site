import Layout from "./components/Layout";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import { useState } from "react";

import { AnimatePresence } from "framer-motion";

export default function App() {
  const [isNavbar, setIsNavbar] = useState("about-me");

  function render(value) {
    if (value === "/") {
      return <Home />;
    } else if (value === "about-me") {
      return <AboutMe />;
    } else if (value === "projects") {
      return <Projects />;
    } else if (value === "contact-me") {
      return <ContactMe />;
    }
  }

  return (
    <Layout setIsNavbar={setIsNavbar} isNavbar={isNavbar}>
      <AnimatePresence>{render(isNavbar)}</AnimatePresence>
    </Layout>
  );
}
