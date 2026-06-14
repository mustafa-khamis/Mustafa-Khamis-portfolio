import React from 'react';
import { motion } from 'framer-motion';
import styles from './ValueProp.module.css';

const propositions = [
  {
    title: "Conversion-Optimized Interfaces",
    desc: "I don't just build websites; I engineer conversion funnels. Every micro-interaction and layout decision is optimized to guide users toward your business goals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  },
  {
    title: "Scalable Architecture",
    desc: "Your product should grow with your business. I architect robust backend systems and resilient frontends that handle high traffic without breaking a sweat.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  },
  {
    title: "Flawless Execution",
    desc: "No missed deadlines. No sloppy code. I pride myself on extreme ownership, transparent communication, and delivering enterprise-grade quality on time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    )
  }
];

export default function ValueProp() {
  return (
    <section id="value" className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Why Partner With <span className="gradient-text">Me?</span>
          </h2>
          <p className={styles.sub}>
            I bridge the gap between complex engineering and business strategy, ensuring your technology investment yields maximum returns.
          </p>
        </div>

        <div className={styles.grid}>
          {propositions.map((prop, idx) => (
            <motion.div 
              key={idx} 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                {prop.icon}
              </div>
              <h3 className={styles.cardTitle}>{prop.title}</h3>
              <p className={styles.cardDesc}>{prop.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
