"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Easy Therapy" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Easy Therapy" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <Script src="/worker-registration.js" 
          strategy="afterInteractive" 
          id="service-worker-registration" 
        />
      </body>
    </html>
  );
}