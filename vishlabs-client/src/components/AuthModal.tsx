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
  const enableDemoAuth = process.env.DEMO_AUTH_ENABLED === "true";

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      if (provider === "credentials") {
        // Demo login
        const res = await signIn("credentials", {
          username: "demo",
          password: "demo",
          redirect: false,
        });
        if (!res?.ok) {
          console.error("Demo login failed", res?.error);
          return;
        }
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
          <h2 style={{ fontSize: "2rem" }} id="modal-title">
            Hello Friend!
          </h2>
          <p style={{ fontSize: "1.5rem" }}>
            Sign in to access more features and content.
          </p>
        </div>

        <div className={styles.authButtons}>
          <button
            className={`${styles.button}`}
            style={{
              backgroundColor: "#01bf71",
              color: "#fff",
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
              fontFamily: "inherit",
            }}
            onClick={() => handleSignIn("google")}
            disabled={isLoading}
          >
            <i
              className="fa-brands fa-google"
              style={{ fontSize: "1.2rem" }}
            ></i>
            <span style={{ fontSize: "1.5rem" }}>Continue with Google</span>
          </button>

          {enableDemoAuth && (
            <button
              className={styles.button}
              onClick={() => handleSignIn("credentials")}
              disabled={isLoading}
            >
              <User size={20} />
              <span>Demo User Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
