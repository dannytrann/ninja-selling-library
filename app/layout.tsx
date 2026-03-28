import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ninja Selling Library - 528 Videos Organized by Topic",
  description: "A free, searchable library of 528 Ninja Selling videos organized into 25 topics with key concepts, action items, and an embedded video player. Based on the Ninja Selling methodology by Larry Kendall.",
  openGraph: {
    title: "Ninja Selling Library",
    description: "528 Ninja Selling videos organized into 25 topics with key concepts and action items.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[var(--background)]">
        {children}
      </body>
    </html>
  );
}
