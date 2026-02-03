"use client";

import { useAuthModal } from "./AuthProvider";
import { Lock } from "lucide-react";

interface LoginPlaceholderProps {
  title?: string;
  message?: string;
}

export default function LoginPlaceholder({
  title = "Access Restricted",
  message = "Please sign in to view this page.",
}: LoginPlaceholderProps) {
  const { openModal } = useAuthModal();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1rem",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        margin: "4rem auto",
        minWidth: "80%",
        textAlign: "center",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Lock size={60} style={{ marginBottom: "1rem", color: "#888" }} />
      <h3 style={{ fontSize: "1.8rem", marginBottom: "0rem", color: "#fff" }}>
        {title}
      </h3>
      <p style={{ color: "#999", marginBottom: "1.5rem", fontSize: "1.6rem" }}>
        {message}
      </p>
      <button
        onClick={openModal}
        style={{
          background: "#fff",
          color: "#000",
          border: "none",
          padding: "0.75rem 1rem",
          borderRadius: "6px",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "1.2rem",
        }}
      >
        Sign In to View
      </button>
    </div>
  );
}
