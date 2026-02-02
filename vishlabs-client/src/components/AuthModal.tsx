"use client";

import styles from "./AuthModal.module.scss";
import { signIn } from "next-auth/react";
import { X, User } from "lucide-react";
import { useState, useEffect } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      if (provider === 'credentials') {
        // Demo login
        await signIn('credentials', { 
          username: 'demo', 
          password: 'demo',
          redirect: false 
        });
        onClose();
        // Force reload to update session state if needed, though useSession handles it
        window.location.reload(); 
      } else {
        await signIn(provider);
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal}>
        <button 
          onClick={onClose} 
          className={styles.closeButton}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className={styles.header}>
          <h2 id="modal-title">Welcome Back</h2>
          <p>Sign in to access exclusive projects and content.</p>
        </div>

        <div className={styles.authButtons}>
          <button 
            className={`${styles.button} ${styles.primary}`}
            onClick={() => handleSignIn('google')}
            disabled={isLoading}
          >
            <i className="fa-brands fa-google" style={{ fontSize: '1.2rem' }}></i>
            <span>Continue with Google</span>
          </button>

          <button 
            className={styles.button}
            onClick={() => handleSignIn('credentials')}
            disabled={isLoading}
          >
            <User size={20} />
            <span>Demo User Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
