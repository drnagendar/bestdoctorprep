import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Link from "next/link";
import {
  SITE_NAME,
  COPYRIGHT_YEAR,
  DISCLAIMER_LINK,
  PRIVACY_LINK,
  TERMS_LINK,
} from "./lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: SITE_NAME,
  description: "Revise faster, retain longer with AI-powered medical flashcards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header>
            <Header />
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="max-w-7xl mx-auto w-full px-6 py-6">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="w-full border-t text-center text-sm text-gray-500 py-4">
            <div className="max-w-7xl mx-auto px-6 space-y-2">
              <p className="space-x-4">
                <Link href={DISCLAIMER_LINK} className="hover:underline">
                  Disclaimer
                </Link>
                <Link href={PRIVACY_LINK} className="hover:underline">
                  Privacy
                </Link>
                <Link href={TERMS_LINK} className="hover:underline">
                  Terms
                </Link>
              </p>
              <p>
                © {COPYRIGHT_YEAR} {SITE_NAME}. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}