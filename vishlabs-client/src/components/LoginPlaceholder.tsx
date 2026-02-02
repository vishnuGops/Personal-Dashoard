"use client";

import { useAuthModal } from "./AuthProvider";
import { Lock } from "lucide-react";

export default function LoginPlaceholder() {
  const { openModal } = useAuthModal();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      margin: '4rem auto',
      maxWidth: '600px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Lock size={48} style={{ marginBottom: '1rem', color: '#888' }} />
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>
        Access Restricted
      </h3>
      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
        Please sign in to view the Career Timeline and Photo Gallery.
      </p>
      <button 
        onClick={openModal}
        style={{
          background: '#fff',
          color: '#000',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Sign In to View
      </button>
    </div>
  );
}
