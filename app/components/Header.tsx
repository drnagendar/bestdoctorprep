'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

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
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-4">
        {/* Logo / Title */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-center sm:text-left">
          BestDoctorPrep
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
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
              <span className="text-sm hidden sm:inline-block whitespace-nowrap">
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
            <>
              <Link
                href="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition text-center"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
