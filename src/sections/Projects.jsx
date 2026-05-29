// src/sections/Projects.jsx
import React from 'react';
import styles from './Projects.module.css';


export default function Projects() {
  const projects = [
    {
      title: "Monty ShowCase",
      type: "E-commerce Platform",
      desc: "Designed and developed a dynamic e-commerce platform for showcasing and selling high-end products, emphasizing user experience and visual appeal.",
      img: "/images/montyshowcaseHeroSection.png",
      link: "https://monty-showcase.vercel.app"
    },
    {
      title: "ExeCode Agency",
      type: "High-End SaaS Platform",
      desc: "Architected a scalable digital engineering agency platform with modern tech stacks, focusing on seamless user experience and performance.",
      img: "/images/ExeCode-Poster.png",
      link: "https://execode-team.vercel.app"
    },
    {
      title: "SudanTeach", // Preserving specific brand capitalization
      type: "Interactive Learning Ecosystem",
      desc: "Built an immersive online education platform offering live courses, tailored specifically to enhance digital learning accessibility.",
      img: "/images/SudanTeachPoster.png",
      link: "https://sudanteach.com"
    },
    {
      title: "Mohamed Yaser Vision",
      type: "Professional Portfolio",
      desc: "Developed a visually striking, impact-focused portfolio for professional photography and cinematic videography branding.",
      img: "/images/Poster-MohamedYaser.png",
      link: "https://mohamedyaser.sudanteach.com"
    }
  ];

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Selected <span className="gradient-text">Work</span></h2>
        
        <div className={styles.projectList}>
          {/* The Progress Track */}
          <div className={styles.trackLine}></div>

          {projects.map((proj, idx) => (
            <div key={idx} className={styles.projectRow}>
              {/* Dynamic Scroll Spot */}
              <div className={styles.scrollSpot}></div>
              
              <div className={styles.projectInfo}>
                <div className={styles.stickyContent}>
                  <span className={styles.type}>{proj.type}</span>
                  <h3 className={styles.title}>{proj.title}</h3>
                  <p className={styles.desc}>{proj.desc}</p>
                  <div className={styles.projectbtns}>
                  
                  <button
                  onClick={()=>{
                    const link = proj.link;

                    window.open(link, '_blank',"noopener,noreferrer"); 
                  }}
                  className={styles.live}
                  >live <img src="/icons/live.png" alt="" /></button>
                  <button className={styles.viewBtn}>
                    Explore Project <span>→</span>
                  </button>
                  </div>
                </div>
              </div>
              
              <div className={styles.projectVisual}>
                <div className={styles.glowEffect}></div>
                <img src={proj.img} alt={proj.title} className={styles.poster} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}