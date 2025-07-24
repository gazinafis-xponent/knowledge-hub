'use client';

import { useAuth } from '@/context/AuthProvider';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          KnowledgeHub
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-600 hover:text-blue-600">
                Log In
              </Link>
              <Link href="/auth/signup" className="text-gray-600 hover:text-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
