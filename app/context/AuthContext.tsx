// File: app/context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
// Define the shape of AuthContext
interface AuthContextType {
user: User | null;
loading: boolean;
}
// Create context with default empty values
const AuthContext = createContext({
user: null,
loading: true,
});
// AuthProvider component to wrap the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
setUser(firebaseUser);
setLoading(false);
});
return () => unsubscribe();
}, []);
return (
<AuthContext.Provider value={{ user, loading }}>
{children}
</AuthContext.Provider>
);
};
// Hook to access AuthContext from other components
export const useAuth = () => useContext(AuthContext);
