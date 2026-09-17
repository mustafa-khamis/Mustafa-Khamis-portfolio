import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Work", href: "/#casestudies" },
    { name: "About", href: "/#valueprop" },
    { name: "Process", href: "/#process" },
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Mustafa.Kh<span className={styles.dot}>.</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((link, i) => (
            <li key={i}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>

        <div className={styles.navAction}>
          <Link to="/startproject" className={styles.btnNav}>
            Let's Talk
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.toggleActive : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className={styles.backdrop}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={styles.sideMenu}
            >
              <div className={styles.sideMenuContent}>
                <ul className={styles.mobileLinks}>
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <a href={link.href} onClick={() => setMenuOpen(false)}>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/startproject"
                    onClick={() => setMenuOpen(false)}
                    className={styles.sideMenuBtn}
                  >
                    Let's Talk
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
