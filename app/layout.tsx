import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header"; // ✅ Corrected relative path

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
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
