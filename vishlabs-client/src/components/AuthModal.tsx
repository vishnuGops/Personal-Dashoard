"use client";

import styles from "./AuthModal.module.scss";
import { signIn } from "next-auth/react";
import { X, User, Mail, Lock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { signupUser } from "@/app/actions/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const enableDemoAuth = process.env.NEXT_PUBLIC_DEMO_AUTH_ENABLED === "true";

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode("signIn");
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await signIn(provider);
    } catch (err) {
      console.error("Login failed", err);
      setError("An error occurred during sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (mode === "signUp") {
        const result = await signupUser(formData);
        if (result.error) {
          setError(result.error);
          setIsLoading(false);
          return;
        }
        // Signup success, auto-login
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        
        if (res?.error) {
          setError("Account created, but automatic sign-in failed. Please sign in manually.");
          setMode("signIn");
        } else {
          onClose();
          window.location.reload();
        }
      } else {
        // Sign In mode
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError("Invalid email or password.");
        } else {
          onClose();
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setError("An unexpected error occurred.");
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
          <h2 id="modal-title">
            {mode === "signIn" ? "Welcome Back!" : "Create an Account"}
          </h2>
          <p>
            {mode === "signIn" 
              ? "Sign in to access more features and content." 
              : "Sign up to start your journey."}
          </p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === "signUp" && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                  minLength={2}
                  maxLength={50}
                />
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : (mode === "signIn" ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={styles.authButtons}>
          <button
            className={styles.button}
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: 600,
            }}
            onClick={() => handleOAuthSignIn("google")}
            type="button"
            disabled={isLoading}
          >
            <i
              className="fa-brands fa-google"
              style={{ fontSize: "1.2rem" }}
            ></i>
            <span>Google</span>
          </button>

          {enableDemoAuth && mode === "signIn" && (
            <button
              className={styles.button}
              onClick={() => handleOAuthSignIn("credentials")}
              type="button"
              disabled={isLoading}
            >
              <User size={20} />
              <span>Demo User Login</span>
            </button>
          )}
        </div>

        <div className={styles.footer}>
          {mode === "signIn" ? (
            <>
              Don't have an account? 
              <button 
                type="button" 
                onClick={() => {
                  setMode("signUp");
                  setError(null);
                }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account? 
              <button 
                type="button" 
                onClick={() => {
                  setMode("signIn");
                  setError(null);
                }}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
