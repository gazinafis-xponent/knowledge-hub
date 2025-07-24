"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "react-toastify";
import { FaTrash, FaArrowLeft, FaRobot } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Swal from "sweetalert2";

interface Article {
  id: string;
  title: string;
  body: string;
  tags: string[];
}

export default function ArticleDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (user && id) {
      fetchArticle();
    }
  }, [user, id]);

  const fetchArticle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setArticle(data);
      } else {
        toast.error("Article not found");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to fetch article");
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        toast.success("Article deleted successfully");
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to delete article");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSummarize = async () => {
    setSummaryLoading(true);
    try {
      const res = await fetch(`/api/summary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        toast.info("Summary created successfully!");
        Swal.fire({
          title: "Summary",
          text: data.summary,
          icon: "info",
          confirmButtonText: "Close",
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to summarize article");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setSummaryLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
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
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-lg">Article not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {article.title}
          </h1>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap">
            {article.body}
          </p>
          <div className="mb-6">
            <span className="text-sm font-semibold text-gray-700">Tags: </span>
            {article.tags.length > 0 ? (
              article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500">None</span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSummarize}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            >
              {summaryLoading ? (
                <svg
                  className="animate-spin h-8 w-8 text-gray-200"
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
                <>
                  <FaRobot />
                  Summarize
                </>
              )}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white transition-colors duration-200 ${
                isDeleting
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 cursor-pointer"
              }`}
            >
              {isDeleting ? (
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
                <FaTrash />
              )}
              {isDeleting ? "Deleting..." : "Delete Article"}
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <FaArrowLeft />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
