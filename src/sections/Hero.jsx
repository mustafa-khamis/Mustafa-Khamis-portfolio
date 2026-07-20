import React, { Suspense } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import HeroCanvas from "../components/canvas/HeroCanvas";

export default function Hero() {
  const metrics = [
    { value: "$2M+", label: "Revenue Impact" },
    { value: "12+", label: "Enterprise Products" },
    { value: "100%", label: "On-Time Delivery" },
  ];

  return (
    <section className={`section-padding ${styles.hero}`}>
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>
      
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.pulse}></span>
            Available for new opportunities
          </motion.div>
          
          <h1 className={styles.title}>
            Engineering Digital Experiences That <span className="gradient-text-accent">Drive Revenue.</span>
          </h1>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I partner with ambitious brands to build scalable, high-performance Software Solutions that solve complex business problems and convert visitors into customers.
          </motion.p>

          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={() => {
                window.location = ("#startproject");
              }}
              className="btn-primary"
            >
              Start a Project
            </button>
            <button
              onClick={() => { window.location = ("#casestudies"); }}
              className="btn-secondary"
            >
              View Case Studies
            </button>
          </motion.div>

          <motion.div 
            className={styles.metrics}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {metrics.map((metric, i) => (
              <div key={i} className={styles.metricItem}>
                <h3 className="gradient-text-accent">{metric.value}</h3>
                <p>{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
