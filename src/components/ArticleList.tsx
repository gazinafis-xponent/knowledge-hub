
'use client';

import Link from 'next/link';
import { FaRobot, FaTrash } from 'react-icons/fa';

interface Article {
  id: string;
  title: string;
  body: string;
  tags: string[];
}

interface ArticleListProps {
  articles: Article[];
  onDelete: (id: string) => void;
  onSummarize: (id: string) => void;
  loading?: boolean;
}

export default function ArticleList({ articles, onDelete, onSummarize, loading }: ArticleListProps) {
  return (
    <div className="space-y-4">
      {articles.length === 0 ? (
        <p className="text-gray-500 text-center">No articles found. Create one to get started!</p>
      ) : (
        articles.map((article) => (
          <div
            key={article.id}
            className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-3">{article.body}</p>
            <p className="text-sm text-gray-500 mt-2">
              Tags: {article.tags.join(', ') || 'None'}
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <Link
                href={`/articles/${article.id}`}
                className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                View Details
              </Link>
              <button
                onClick={() => onSummarize(article.id)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                {
                  loading ? (
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.343A8.003 8.003 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.595z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <FaRobot />
                      Summarize
                    </>
                  )
                }
              </button>
              <button
                onClick={() => onDelete(article.id)}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
