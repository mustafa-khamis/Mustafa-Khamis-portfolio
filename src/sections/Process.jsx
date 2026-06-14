import React from 'react';
import { motion } from 'framer-motion';
import styles from './Process.module.css';

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We start by deeply understanding your business goals, target audience, and current bottlenecks. I conduct a technical audit and propose a strategic roadmap."
  },
  {
    num: "02",
    title: "System Architecture",
    desc: "Before writing a single line of code, I design the database schema, API structure, and UI/UX flows to ensure the foundation is robust and scalable."
  },
  {
    num: "03",
    title: "Execution & Engineering",
    desc: "Using modern, high-performance tech stacks, I build your product with clean, maintainable code. You get regular updates and full transparency."
  },
  {
    num: "04",
    title: "Launch & Optimization",
    desc: "Rigorous testing precedes deployment. Post-launch, we monitor analytics, optimize performance, and ensure your conversion rates hit their targets."
  }
];

export default function Process() {
  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>The <span className="gradient-text">Process</span></h2>
          <p className={styles.sub}>
            A systematic, predictable approach to engineering digital products that mitigate risk and accelerate time-to-market.
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              className={styles.stepCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
