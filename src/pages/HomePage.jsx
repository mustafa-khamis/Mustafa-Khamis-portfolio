import React from "react";
import Header from "../sections/Header";
import Hero from "../sections/Hero";
import SocialProof from "../sections/SocialProof";
import ValueProp from "../sections/ValueProp";
import CaseStudies from "../sections/CaseStudies";
import Process from "../sections/Process";
import TrustIndicators from "../sections/TrustIndicators";
import StartProjectCTA from "../sections/StartProjectCTA";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <SocialProof />
      <div id="valueprop">
        <ValueProp />
      </div>
      <CaseStudies />
      <div id="process">
        <Process />
      </div>
      <TrustIndicators />
      <StartProjectCTA />
      <Contact />
      <Footer />
    </main>
  );
}
