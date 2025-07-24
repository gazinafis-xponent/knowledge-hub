
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'react-toastify';
import { FaHeading, FaParagraph, FaTags, FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function ArticleForm({ onSubmit }: { onSubmit: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        setIsLoading(false);
        return;
      }

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          body,
          tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
        }),
      });

      if (res.ok) {
        toast.success('Article created successfully!');
        setTitle('');
        setBody('');
        setTags('');
        onSubmit();
        Swal.fire({
          title: 'Success!',
          text: 'Article created successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to create article');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Article creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <FaHeading className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder:text-gray-600"
          required
        />
      </div>
      <div className="relative">
        <FaParagraph className="absolute top-3 left-3 text-gray-400" />
        <textarea
          placeholder="Article Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder:text-gray-600"
          rows={5}
          required
        />
      </div>
      <div className="relative">
        <FaTags className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Tags (comma-separated, e.g., tech, ai, learning)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder:text-gray-600"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white transition-colors duration-200 ${
          isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'
        }`}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <FaPaperPlane />
        )}
        {isLoading ? 'Creating...' : 'Create Article'}
      </button>
    </form>
  );
}