import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./StartProjectCTA.module.css";

const CATEGORIES = [
  { label: "Websites & Web Apps", icon: "🌐" },
  { label: "Mobile Apps", icon: "📱" },
  { label: "Automation", icon: "⚙️" },
  { label: "AI Agents", icon: "🤖" },
  { label: "Something Else", icon: "✦" },
];

export default function StartProjectCTA() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.glow} aria-hidden="true" />

          <span className={styles.eyebrow}>Start Something New</span>
          <h2 className={styles.heading}>
            Have a project in mind?
            <br />
            Let&apos;s scope it together.
          </h2>
          <p className={styles.sub}>
            A guided intake with templates, tech stacks, and timelines — built
            for websites, mobile apps, automation and AI agents alike.
          </p>

          <div className={styles.categories}>
            {CATEGORIES.map((cat) => (
              <span key={cat.label} className={styles.categoryPill}>
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </span>
            ))}
          </div>

          <Link to="/startproject" className={styles.cta}>
            Open the Project Planner
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
