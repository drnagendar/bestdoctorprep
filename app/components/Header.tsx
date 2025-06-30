"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between p-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-2xl font-bold mb-2 sm:mb-0">
        <Link href="/">BestDoctorPrep</Link>
      </h1>

      <nav className="flex items-center flex-wrap gap-4 justify-center sm:justify-end">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/flashcards" className="hover:underline">
          Flashcards
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>

        {user ? (
          <>
            <span className="text-sm hidden sm:block">Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
