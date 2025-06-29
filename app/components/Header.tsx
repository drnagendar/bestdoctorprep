"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed");
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow">
      <Link href="/" className="text-xl font-bold text-blue-600">
        BestDoctorPrep
      </Link>
      <div>
        {user ? (
          <>
            <span className="mr-4 text-sm text-gray-700">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 underline"
            >
              🔓 Logout
            </button>
          </>
        ) : (
          <Link
            href="/(auth)/login"
            className="text-sm text-blue-600 underline"
          >
            🔐 Login
          </Link>
        )}
      </div>
    </header>
  );
}