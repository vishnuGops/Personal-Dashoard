import type { Metadata } from "next";
import { Jersey_10, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrolling from "@/components/SmoothScrolling";

import AuthProvider from "@/components/AuthProvider";

const jersey10 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jersey10",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Meet Vishnu!",
  description: "Welcome to my world! I am Vishnu Gopal.",
  icons: {
    icon: "/images/VG_logo.png", // Path to your favicon file in the public directory
    apple: "/images/VG_logo.png", // For Apple devices
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jersey10.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <SmoothScrolling>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScrolling>
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
