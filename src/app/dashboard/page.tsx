'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthProvider';
import ArticleForm from '@/components/ArticleForm';
import ArticleList from '@/components/ArticleList';
import Navbar from '@/components/Navbar';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user, searchTerm, selectedTag]); // Added dependencies for real-time updates

  const fetchArticles = async () => {
    const res = await fetch(`/api/articles?search=${searchTerm}&tag=${selectedTag}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setArticles(data);
    } else {
      console.error('Failed to fetch articles:', res.status);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.ok) {
      setArticles(articles.filter((article: any) => article.id !== id));
      toast.success('Article deleted successfully!');
    } else {
      console.error('Failed to delete article:', res.status);
    }
  };

  const handleSummarize = async (id: string) => {
    setSummaryLoading(true);
    const res = await fetch(`/api/summary/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      toast.success('Summary created successfully!'); // Consider replacing with a modal for better UX
      Swal.fire({
        title: 'Summary',
        text: data.summary,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      console.error('Failed to summarize article:', res.status);
      toast.error('Failed to create summary');
    }
    setSummaryLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center sm:text-left">
            Welcome to Your KnowledgeHub
          </h1>
          <p className="mt-2 text-gray-600 text-center sm:text-left">
            Manage your articles, search by content or tags, and generate AI-powered summaries.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Article</h2>
          <ArticleForm onSubmit={fetchArticles} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Articles</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder:text-gray-600"
            />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder:text-gray-600"
            >
              <option value="">All Tags</option>
              {[...new Set(articles.flatMap((a: any) => a.tags))].map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <button
              onClick={fetchArticles}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Search
            </button>
          </div>
          <ArticleList articles={articles} onDelete={handleDelete} onSummarize={handleSummarize} loading={summaryLoading}/>
        </div>
      </div>
    </div>
  );
}
