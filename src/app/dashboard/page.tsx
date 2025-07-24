'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthProvider';
import ArticleForm from '@/components/ArticleForm';
import ArticleList from '@/components/ArticleList';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  const fetchArticles = async () => {
    const res = await fetch(`/api/articles?search=${searchTerm}&tag=${selectedTag}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setArticles(data);
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
    }
  };

  const handleSummarize = async (id: string) => {
    const res = await fetch(`/api/summary/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      alert(data.summary);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Knowledgebase</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <ArticleForm onSubmit={fetchArticles} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mr-2"
        />
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border p-2"
        >
          <option value="">All Tags</option>
          {[...new Set(articles.flatMap((a: any) => a.tags))].map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <button onClick={fetchArticles} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Search
        </button>
      </div>
      <ArticleList articles={articles} onDelete={handleDelete} onSummarize={handleSummarize} />
    </div>
  );
}