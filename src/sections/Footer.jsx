// src/sections/Footer.jsx
import React from "react";
import styles from "./Footer.module.css";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        
        {/* Brand */}
        <div className={styles.brand}>
          <h2 className={styles.logo}>
            M.Khamis<span>.</span>
          </h2>

          <p className={styles.description}>
            Building premium digital experiences with modern frontend,
            scalable backend systems, and high-end UI engineering.
          </p>

          <div className={styles.socialIcons}>
            <a
              href="https://github.com/safsafrwanda2006"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/mustafa-kh-hassan-b26ab5370"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.instagram.com/safsaf3469/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/250794101251"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>

            <a href="mailto:safsafrwanda2006@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className={styles.linksWrapper}>
          
          <div className={styles.links}>
            <h4>Navigation</h4>

            <a href="#hero">Home</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#startproject">Start Project</a>
            <a href="#contact">Contact</a>
          </div>

          <div className={styles.links}>
            <h4>Projects</h4>

            <a href="#">SudanTeach</a>
            <a href="#">imiPharm</a>
            <a href="#">ExeCode</a>
          </div>

          <div className={styles.links}>
            <h4>Contact</h4>

            <a href="mailto:m.mustafakh249@gmail.com">
              m.mustafakh249@gmail.com
            </a>

            <a
              href="https://wa.me/250794101251"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <a href="#">Kigali, Rwanda</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={`container ${styles.bottom}`}>
        <p>© 2026 Mustafa Khamis. All Rights Reserved.</p>

        <button
          className={styles.topButton}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
}