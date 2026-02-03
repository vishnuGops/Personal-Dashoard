# Authentication System Documentation

## 1. Executive Summary

This document details the authentication system implementation for the Personal Dashboard application. The system provides a secure, user-friendly login experience using Google OAuth and a demo account. It leverages Next.js 15+ features, including Server Components, Middleware, and NextAuth.js (Auth.js v5 Beta), to ensure robust security and optimal performance.

---

## 2. Planning & Architecture

### 2.1 Technology Stack Selection

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | Provides server-side rendering (SSR) for auth checks, reducing client-side flicker and improving security. |
| **Auth Library** | **NextAuth.js (Auth.js v5 Beta)** | The standard for Next.js auth. V5 offers better support for the App Router and Edge Middleware. |
| **Styling** | **SCSS Modules** | Matches the existing project's styling strategy, offering scoped styles without CSS-in-JS runtime overhead. |
| **Icons** | **Lucide React & FontAwesome** | Consistent with the existing design system; FontAwesome used specifically for brand icons like Google. |
| **State Management** | **React Context API** | Used for the global Auth Modal state to avoid prop drilling and keep the modal accessible from anywhere. |

### 2.2 Design System & UX

*   **Modal-First Approach:** Instead of redirecting to a dedicated `/login` page, a modal overlays the current content. This keeps the user in context and feels more modern.
*   **Visual Consistency:**
    *   **Dark Mode:** The modal uses a dark theme (`#1a1a1a` background) to match the dashboard's aesthetic.
    *   **Glassmorphism:** Slight backdrop blur on the overlay adds depth.
    *   **Typography:** Buttons and headers inherit the project's font stack (Inter/Jersey 10).
*   **Feedback:**
    *   **Loading States:** Buttons are disabled and show loading indicators during auth requests.
    *   **Access Restricted:** Unauthenticated users see a polite "locked" placeholder on the homepage instead of a blank space.

---

## 3. Implementation Details

### 3.1 Authentication Flow

```mermaid
graph TD
    A[User Visits Site] --> B{Session Exists?}
    B -- Yes --> C[Show Profile Avatar]
    B -- No --> D[Show 'Sign In' Button]
    
    D --> E[Open Auth Modal]
    E --> F[Select Provider (Google/Demo)]
    F --> G[NextAuth Processing]
    G --> H[Redirect/Reload]
    
    H --> I{Success?}
    I -- Yes --> J[Update UI to Auth State]
    I -- No --> K[Show Error]
```

### 3.2 Core Components

#### 1. Configuration (`src/auth.ts`)
*   Central configuration file exporting `handlers`, `auth`, `signIn`, and `signOut`.
*   **Providers:**
    *   `Google`: Uses OAuth 2.0.
    *   `Credentials`: A mock provider for the "Demo User" (username: `demo`, password: `demo`).

#### 2. Middleware (`src/middleware.ts`)
*   Protects specific routes (e.g., `/projects`).
*   Runs on the Edge.
*   Redirects unauthenticated users to the homepage (`/`) if they try to access protected paths.

#### 3. Context Provider (`src/components/AuthProvider.tsx`)
*   Wraps the app in `SessionProvider` (for client-side session access) and `AuthModalContext`.
*   Exposes `useAuthModal()` hook, allowing any component (Navbar, LoginPlaceholder) to trigger the login modal.

#### 4. Components
*   **`Navbar.tsx`:** Displays user avatar (using optimized `next/image`) or "Sign In" button. Handles logout via dropdown.
*   **`AuthModal.tsx`:** The accessible dialog component. Handles the `signIn` call.
*   **`LoginPlaceholder.tsx`:** A UI component shown to unauthenticated users on the landing page, prompting them to log in.

---

## 4. Setup Guide

### 4.1 Google Cloud Console Setup

1.  **Create Project:** Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2.  **OAuth Consent Screen:**
    *   Select **External** user type.
    *   Fill in app name, support email, and developer email.
3.  **Create Credentials:**
    *   Go to **Credentials** > **Create Credentials** > **OAuth Client ID**.
    *   **Type:** Web Application.
    *   **Authorized Origins:**
        *   `http://localhost:3000`
        *   `https://<your-project>.vercel.app` (Production URL)
    *   **Authorized Redirect URIs:**
        *   `http://localhost:3000/api/auth/callback/google`
        *   `https://<your-project>.vercel.app/api/auth/callback/google`
4.  **Copy Keys:** Save the **Client ID** and **Client Secret**.

### 4.2 Environment Variables

Create a `.env.local` file (this file is git-ignored for security):

```env
# Google Auth
GOOGLE_CLIENT_ID="your_client_id"
GOOGLE_CLIENT_SECRET="your_client_secret"

# Next Auth
# Generate with: npx auth secret
AUTH_SECRET="long_random_string"
```

### 4.3 Vercel Deployment

1.  Push code to GitHub.
2.  Import project in Vercel.
3.  **Go to Settings > Environment Variables.**
4.  Add the keys from `.env.local` (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET`).
5.  Redeploy.

---

## 5. Optimizations & Best Practices Applied

*   **Image Optimization:** The user avatar uses `next/image` with `remotePatterns` configured for Google/GitHub domains to ensure fast loading and proper sizing.
*   **Accessibility (a11y):**
    *   The `AuthModal` implements `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
    *   Keyboard navigation support (Escape key to close).
*   **Security:**
    *   **Middleware Protection:** Route gating happens on the server/edge, preventing flash of content.
    *   **Environment Variables:** Sensitive keys are strictly kept out of the codebase via `.gitignore`.
*   **Performance:**
    *   **Dynamic Imports:** Auth logic is split between client and server to minimize bundle size.
    *   **Server Components:** The initial session check on the landing page happens on the server (`page.tsx`), reducing client-side JavaScript execution.
