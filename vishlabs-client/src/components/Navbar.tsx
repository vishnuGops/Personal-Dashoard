"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import styles from "./Navbar.module.scss";
import { useAuthModal } from "./AuthProvider";

export default function Navbar() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { openModal } = useAuthModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    setIsMobileMenuOpen(false); // Close mobile menu on click
    // If the user is already on the page they are clicking
    if (pathname === href) {
      e.preventDefault();
      // Scroll both body and documentElement to ensure it works across different scroll setups
      document.body.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  //TODO: Fix dropdown close on outside click
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   if (isDropdownOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [isDropdownOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const AuthSection = () =>
    session ? (
      <div className={styles["user-profile"]} ref={dropdownRef}>
        <button
          className={styles["avatar-btn"]}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Image
            src={session.user?.image || "https://github.com/shadcn.png"}
            alt={session.user?.name || "User"}
            width={40}
            height={40}
            className={styles.avatar}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          />
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button onClick={() => signOut()}>Logout</button>
          </div>
        )}
      </div>
    ) : (
      <button
        className={styles["auth-button"]}
        onClick={() => {
          openModal();
          setIsMobileMenuOpen(false);
        }}
      >
        Sign In
      </button>
    );

  return (
    <div className={styles["custom-toolbar"]}>
      <div className={styles["navbar-logo"]}>
        <Link href="/" onClick={(e) => handleScroll(e, "/")}>
          <img src="/images/VG_logo.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <span className={styles.spacer}></span>

      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => handleScroll(e, link.href)}
          >
            {link.name}
          </Link>
        ))}
        <AuthSection />
      </nav>

      {/* Hamburger Button */}
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
      <div
        className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        <div className={styles.mobileNavContent}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
            >
              {link.name}
            </Link>
          ))}
          <div className={styles.mobileAuth}>
            <AuthSection />
          </div>
        </div>
      </div>
    </div>
  );
}
