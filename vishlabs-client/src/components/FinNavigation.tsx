"use client";
import React, { useState } from "react";
import styles from "./FinNavigation.module.scss";
import Dashboard from "./fintech/Dashboard";
import Market from "./fintech/Market";
import Portfolio from "./fintech/Portfolio";
import News from "./fintech/News";

const FinNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navLinks = [
    { name: "Dashboard", component: <Dashboard /> },
    { name: "Market", component: <Market /> },
    { name: "Portfolio", component: <Portfolio /> },
    { name: "News", component: <News /> },
  ];

  const handleNavClick = (tabName: string) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className={styles.navigationContainer}>
        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`${styles.navButton} ${
                activeTab === link.name ? styles.active : ""
              }`}
              onClick={() => handleNavClick(link.name)}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          className={`${styles.hamburger} ${
            isMobileMenuOpen ? styles.open : ""
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation Overlay */}
        <div
          className={`${styles.mobileNav} ${
            isMobileMenuOpen ? styles.open : ""
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`${styles.mobileNavLink} ${
                activeTab === link.name ? styles.active : ""
              }`}
              onClick={() => handleNavClick(link.name)}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.contentArea}>
        {navLinks.find((link) => link.name === activeTab)?.component}
      </div>
    </>
  );
};

export default FinNavigation;
