"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';
import styles from './Navbar.module.scss';
import { useAuthModal } from './AuthProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { openModal } = useAuthModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    // If the user is already on the page they are clicking
    if (pathname === href) {
      e.preventDefault();
      // Scroll both body and documentElement to ensure it works across different scroll setups
      document.body.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles['custom-toolbar']}>
      <div className={styles['navbar-logo']}>
        <Link href="/" onClick={(e) => handleScroll(e, '/')}>
          <img src="/images/VG_logo.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <span className={styles.spacer}></span>
      <nav>
        <Link href="/" onClick={(e) => handleScroll(e, '/')}>Home</Link>
        <Link href="/about" onClick={(e) => handleScroll(e, '/about')}>About</Link>
        <Link href="/projects" onClick={(e) => handleScroll(e, '/projects')}>Projects</Link>
        <Link href="/contact" onClick={(e) => handleScroll(e, '/contact')}>Contact</Link>
        
        {session ? (
          <div className={styles['user-profile']}>
            <button 
              className={styles['avatar-btn']}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img 
                src={session.user?.image || "https://github.com/shadcn.png"} 
                alt={session.user?.name || "User"} 
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
            className={styles['auth-button']}
            onClick={openModal}
          >
            Sign In
          </button>
        )}
      </nav>
    </div>
  );
}