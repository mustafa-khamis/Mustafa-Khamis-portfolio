import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import profileImage from "../assets/profile.png";

export default function Hero() {
  const metrics = [
    { value: "$2M+", label: "Revenue Impact" },
    { value: "12+", label: "Enterprise Products" },
    { value: "100%", label: "On-Time Delivery" },
  ];

  return (
    <section className={`section-padding ${styles.hero}`}>
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.badge}>
            <span className={styles.pulse}></span>
            Available for new opportunities
          </div>
          
          <h1 className={styles.title}>
            Engineering Digital Experiences That <span className="gradient-text">Drive Revenue.</span>
          </h1>
          
          <p className={styles.subtitle}>
            I partner with ambitious brands to build scalable, high-performance web products that solve complex business problems and convert visitors into customers.
          </p>

          <div className={styles.ctaGroup}>
            <button
              onClick={() => {
                window.location = ("#startproject");
              }}
              className="btn-primary"
            >
              Start a Project
            </button>
            <button
              onClick={() => { window.location = ("/#casestudies"); }}
              className="btn-secondary"
            >
              View Case Studies
            </button>
          </div>

          <div className={styles.metrics}>
            {metrics.map((metric, i) => (
              <div key={i} className={styles.metricItem}>
                <h3 className="gradient-text-accent">{metric.value}</h3>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className={styles.glowOverlay}></div>
          <div className={styles.imageContainer}>
            <img
              src={profileImage}
              alt="Mustafa Khamis - Software Engineer"
              className={styles.image}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
