// src/app/components/ProtectedRoute.tsx
"use client";
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/app/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Return an empty fragment instead of null when user is not authenticated
  return user ? <>{children}</> : <></>;
};

export default ProtectedRoute;