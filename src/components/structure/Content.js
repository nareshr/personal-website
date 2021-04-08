import React from "react";
import AboutMe from "../sections/AboutMe";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Articles from "../sections/Articles";
import Contact from "../sections/Contact";

function Content() {
  return (
    <main>
      <AboutMe />
      <Skills />
      <Experience />
      <Articles />
      <Contact />
    </main>
  );
}

export default Content;
