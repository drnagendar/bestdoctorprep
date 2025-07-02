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
      <body>
        <div className={`flex flex-col min-h-screen ${inter.className}`}>
          <Header />

          {/* Body Content aligned exactly with Header */}
          <div className="flex-1 w-full px-6 py-6">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500 py-4 border-t w-full">
            <p className="mb-1 space-x-4">
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
          </footer>
        </div>
      </body>
    </html>
  );
}
