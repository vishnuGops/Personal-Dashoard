"use client";
import React, { useState } from "react";
import styles from "./FinNavigation.module.scss";

const FinNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "#dashboard" },
    { name: "Market", href: "#market" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "News", href: "#news" },
    { name: "Settings", href: "#settings" },
  ];

  return (
    <div className={styles.navigationContainer}>
      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className={styles.navButton}>
            {link.name}
          </a>
        ))}
      </nav>

      {/* Hamburger Menu Toggle (Mobile) */}
      <button
        className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation Overlay */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FinNavigation;