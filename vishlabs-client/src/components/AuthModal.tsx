"use client";

import styles from "./AuthModal.module.scss";
import { signIn } from "next-auth/react";
import { X, Github, User } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

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
    <div className={styles.overlay} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={20} />
        </button>

        <div className={styles.header}>
          <h2>Welcome Back</h2>
          <p>Sign in to access exclusive projects and content.</p>
        </div>

        <div className={styles.authButtons}>
          <button 
            className={`${styles.button} ${styles.primary}`}
            onClick={() => handleSignIn('github')}
            disabled={isLoading}
          >
            <Github size={20} />
            <span>Continue with GitHub</span>
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
