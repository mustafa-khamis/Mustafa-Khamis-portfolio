// src/sections/About.jsx
import React from 'react';
import styles from './About.module.css';
import aboutImg from '../assets/profile3.jpeg';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.imageContainer}>
          <img src={aboutImg} alt="Mustafa Khamis image" className={styles.image} />
          <div className={styles.frame}></div>
        </div>
        <div className={styles.content}>
          <h2 className={styles.heading}>Building with <span className="gradient-text">Purpose.</span></h2>
          <p className={styles.text}>
            I am Mustafa Khamis, a Software Engineer and Web developer who believes that great projects are built at the intersection of rigorous logic and human emotion. 
          </p>
          <p className={styles.text}>
            Currently leading engineering efforts at **exeCode** and contributing to **samaLync**, I focus on architecting systems that don't just work—they scale. 
          </p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span>SudanTeach</span>
              <p>Platform Founder</p>
            </div>
            <div className={styles.statItem}>
              <span>imiPharm</span>
              <p>Lead Architect</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}