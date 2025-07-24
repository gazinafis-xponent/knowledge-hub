'use client';

export default function ArticleList({
  articles,
  onDelete,
  onSummarize,
}: {
  articles: any[];
  onDelete: (id: string) => void;
  onSummarize: (id: string) => void;
}) {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} className="border p-4 mb-4 rounded">
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p>{article.body.substring(0, 200)}...</p>
          <p className="text-sm text-gray-500">Tags: {article.tags.join(', ')}</p>
          <div className="mt-2">
            <button
              onClick={() => onSummarize(article.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Summarize
            </button>
            <button
              onClick={() => onDelete(article.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}