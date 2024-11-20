import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: {
    default: "Mermaider - Online Mermaid.js Diagram Editor",
    template: "%s | Mermaider"
  },
  description: "Create, edit, and export Mermaid.js diagrams with a modern, user-friendly interface. Supports flowcharts, sequence diagrams, Gantt charts, and more.",
  keywords: ["mermaid.js", "diagram editor", "flowchart", "sequence diagram", "gantt chart", "visualization"],
  authors: [{ name: "sf000000" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mermaider.vercel.app",
    title: "Mermaider - Online Mermaid.js Diagram Editor",
    description: "Create, edit, and export Mermaid.js diagrams with a modern, user-friendly interface",
    siteName: "Mermaider"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mermaider - Online Mermaid.js Diagram Editor",
    description: "Create, edit, and export Mermaid.js diagrams with a modern, user-friendly interface"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
