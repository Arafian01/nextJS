import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@app/components/Navbar";

export const metadata: Metadata = {
  title: "NextApp",
  description: "Modern Next.js App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900">
        <Navbar />
        
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
