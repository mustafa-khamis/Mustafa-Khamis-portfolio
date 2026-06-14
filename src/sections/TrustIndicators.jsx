import React from 'react';
import { motion } from 'framer-motion';
import styles from './TrustIndicators.module.css';

const testimonials = [
  {
    quote: "Working with him felt like having an entire engineering team. The execution was flawless, and the business impact was immediate.",
    author: "CEO, Tech Startup",
    role: "E-Commerce Sector"
  },
  {
    quote: "He doesn't just write code; he understands the business mechanics behind it. The platform he architected scaled effortlessly.",
    author: "Founder, SudanTeach",
    role: "EdTech Sector"
  }
];

export default function TrustIndicators() {
  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          
          <div className={styles.textColumn}>
            <h2 className={styles.heading}>A Reputation Built on <span className="gradient-text">Results.</span></h2>
            <p className={styles.sub}>
              My clients don't just hire a developer—they partner with an engineering leader dedicated to their commercial success.
            </p>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <h4>100%</h4>
                <p>Client Retention</p>
              </div>
              <div className={styles.statItem}>
                <h4>Zero</h4>
                <p>Missed Deadlines</p>
              </div>
            </div>
          </div>

          <div className={styles.testimonialColumn}>
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx} 
                className={styles.testimonialCard}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.quoteText}>{test.quote}</p>
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>{test.author}</p>
                  <p className={styles.authorRole}>{test.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
