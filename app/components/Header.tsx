"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // ✅ Corrected path

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-bold">
        BestDoctorPrep
      </Link>
      <nav className="space-x-4">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout} className="underline text-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/(auth)/login" className="underline text-sm">
              Login
            </Link>
            <Link href="/(auth)/signup" className="underline text-sm">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}