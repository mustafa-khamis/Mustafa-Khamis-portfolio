import React from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import SocialProof from './sections/SocialProof';
import ValueProp from './sections/ValueProp';
import CaseStudies from './sections/CaseStudies';
import Process from './sections/Process';
import TrustIndicators from './sections/TrustIndicators';
import StartProject from './sections/StartProject';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <>
      <main>
        <Header />
        <Hero />
        <SocialProof />
        <ValueProp />
        <CaseStudies />
        <Process />
        <TrustIndicators />
        <StartProject/>
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;