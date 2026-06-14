import React from "react";
import styles from "./SocialProof.module.css";

export default function SocialProof() {
  const brands = [
    { name: "SudanTeach", type: "Education Platform" },
    { name: "imiPharm", type: "HealthTech" },
    { name: "CanLens", type: "E-Commerce" },
    { name: "ExeCode", type: "Agency" },
    { name: "Monty Showcase", type: "Retail" },
  ];

  return (
    <section className={styles.socialProof}>
      <div className="container">
        <p className={styles.label}>Trusted by forward-thinking companies & founders</p>
        <div className={styles.logoCloud}>
          {brands.map((brand, idx) => (
            <div key={idx} className={styles.brandLogo}>
              <span className={styles.brandName}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
