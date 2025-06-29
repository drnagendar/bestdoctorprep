// File: app/layout.tsx
import "./globals.css";
import { AuthProvider } from "./context/AuthContext"; // ✅ Ensure the path is correct

export const metadata = {
  title: "BestDoctorPrep",
  description: "Flashcards for medical students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}