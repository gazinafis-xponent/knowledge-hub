
import Navbar from '@/components/Nabar';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to KnowledgeHub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create, manage, and search your articles with AI-powered summarization. Join now to organize your knowledge effortlessly.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signup"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
