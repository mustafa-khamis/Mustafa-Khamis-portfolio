import React from 'react';
import { motion } from 'framer-motion';
import styles from './CaseStudies.module.css';

const caseStudies = [
  {
    title: "SudanTeach",
    type: "EdTech Platform",
    problem: "Limited access to interactive digital education in developing regions with low-bandwidth constraints.",
    solution: "Architected a highly optimized, low-latency live learning ecosystem with resilient streaming capabilities.",
    impact: "Scaled to 10,000+ active learners, significantly improving digital learning accessibility across the country.",
    img: "/images/SudanTeachPoster.png",
    link: "https://sudanteach.com"
  },
  {
    title: "imiPharm",
    type: "HealthTech Infrastructure",
    problem: "Inefficient inventory management and disjointed communication between pharmacies and suppliers.",
    solution: "Developed a comprehensive centralized dashboard with real-time inventory tracking and automated ordering workflows.",
    impact: "Reduced operational overhead by 40% and eliminated stockout events for partnered pharmacies.",
    img: "/images/imipharm.png", // Assuming this image name based on context
    link: "#"
  },
  {
    title: "CanLens Studio",
    type: "E-Commerce & Booking",
    problem: "Fragmented customer journey requiring multiple platforms for equipment purchasing and studio booking.",
    solution: "Unified the experience into a seamless platform with dynamic scheduling, integrated payments, and inventory sync.",
    impact: "Increased booking conversion rate by 65% and streamlined administrative workload.",
    img: "/images/canlensHero.png",
    link: "https://canlens.sudanteach.com"
  },
  {
    title: "Monty Showcase",
    type: "Premium Retail Platform",
    problem: "High bounce rates due to poor visual presentation and slow load times on mobile devices.",
    solution: "Rebuilt the front-end with a focus on immersive visuals, micro-interactions, and aggressive performance optimization.",
    impact: "Decreased bounce rate by 30% and increased average session duration by 2 minutes.",
    img: "/images/montyshowcaseHeroSection.png",
    link: "https://monty-showcase.vercel.app"
  }
];

export default function CaseStudies() {
  return (
    <section id="casestudies" className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>Selected <span className="gradient-text">Case Studies</span></h2>
          <p className={styles.sub}>
            A look at how I've helped businesses overcome complex technical challenges and achieve measurable growth.
          </p>
        </div>

        <div className={styles.list}>
          {caseStudies.map((study, idx) => (
            <motion.div 
              key={idx} 
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.visual}>
                <div className={styles.glowEffect}></div>
                <img src={study.img} alt={`${study.title} Interface`} className={styles.image} />
              </div>

              <div className={styles.content}>
                <span className={styles.type}>{study.type}</span>
                <h3 className={styles.title}>{study.title}</h3>
                
                <div className={styles.details}>
                  <div className={styles.detailBlock}>
                    <h4>The Challenge</h4>
                    <p>{study.problem}</p>
                  </div>
                  <div className={styles.detailBlock}>
                    <h4>The Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                  <div className={styles.detailBlock}>
                    <h4>The Impact</h4>
                    <p className={styles.highlightImpact}>{study.impact}</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <a href={study.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    View Live Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
