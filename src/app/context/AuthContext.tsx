// src/app/context/AuthContext.tsx
"use client";
import { createContext, useState, useEffect, useContext, ReactNode, JSX } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

// Define the type for the context value
interface AuthContextType {
  user: User | null;
  loading: boolean;
  googleSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

// Create context with proper type and default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  googleSignIn: async () => {},
  logOut: async () => {}
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const googleSignIn = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // After successful sign-in, redirect to chat page
      router.push("/chat");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      // After logout, redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): AuthContextType => {
  return useContext(AuthContext);
};