"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState } from "react";
import AuthModal from "./AuthModal";

interface AuthModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const useAuthModal = () => useContext(AuthModalContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <SessionProvider>
      <AuthModalContext.Provider value={{ openModal, closeModal }}>
        {children}
        <AuthModal isOpen={isOpen} onClose={closeModal} />
      </AuthModalContext.Provider>
    </SessionProvider>
  );
}
