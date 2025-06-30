import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BestDoctorPrep",
  description: "Revise faster, retain longer with AI-powered medical flashcards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Top Navigation/Header */}
          <Header />

          {/* Main content area */}
          <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
            {children}
          </main>

          {/* Global Footer (sticky) */}
          <footer className="text-center text-sm text-gray-500 py-4 border-t w-full">
            <p className="mb-1">
              <Link href="/disclaimer" className="hover:underline">
                Disclaimer: Not affiliated with ICMR or NPTEL
              </Link>
            </p>
            <p>
              © {new Date().getFullYear()} BestDoctorPrep.in — All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
