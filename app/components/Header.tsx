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
    <header className="w-full flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-xl font-bold">
        <Link href="/">MedFlashcards</Link>
      </h1>

      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm hidden sm:block">
              Welcome, {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
