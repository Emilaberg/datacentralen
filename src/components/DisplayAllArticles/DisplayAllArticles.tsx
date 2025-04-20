import React, { useState, useEffect } from "react";
import ApiService from "../../Services/ApiService";

export type Article = {
  id: number;
  title: string;
  author: string;
  posted: Date;
  lastEdited: Date;
  likes: number;
  content: string;
  description: string;
  type: string;
  colorCodeOne?: string;
  colorCodeTwo?: string;
};

type DisplayAllArticlesProps = {
  count: number;
  setCount: (newCount: number) => void;
  setRefetchCallback: (callback: () => void) => void; // New prop to set re-fetch callback
};

const DisplayAllArticles: React.FC<DisplayAllArticlesProps> = ({ count, setCount, setRefetchCallback }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(null);
  const api = ApiService();

  const fetchArticles = async () => {
    const data: Article[] = await api.Articles();
    setArticles(data);
    console.log(data, "data from DisplayAllArticles");
  };

  useEffect(() => {
    fetchArticles();

    // Pass the fetchArticles function to the parent via the callback
    setRefetchCallback(fetchArticles);
  }, []);

  const handleSetCount = (id: number) => {
    
    if(id === count){
      setCount(-1)
      return
    }
    setCount(id);
  };

  const toggleContent = (id: number) => {
    setExpandedArticleId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-4">
      {count > 0 && (
        <h3 className="text-lg font-bold mb-4">Selected Article ID: {count}</h3>
      )}
      <div className="space-y-1">
  {articles.map((article, index) => (
    <div
      key={article.id}
      onClick={() => handleSetCount(article.id)}
      className={`flex flex-col p-4 border rounded-md cursor-pointer transition-colors ${
        article.id === count
          ? "bg-green-500 text-white"
          : index % 2 === 0
          ? "bg-gray-100"
          : "bg-gray-200 hover:bg-green-100"
      }`}
    >
      <div
        className="flex items-center justify-between"
        
      >
        <span className="font-medium">{article.title}</span>
        <span className="text-gray-600">Author: {article.author}</span>
        <span className="text-gray-500">
          Posted: {new Date(article.posted).toLocaleDateString()}
        </span>
        <button
          className="ml-4 text-gray-500 hover:text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            toggleContent(article.id);
          }}
        >
          {expandedArticleId === article.id ? "▲" : "▼"}
        </button>
      </div>
      {expandedArticleId === article.id && (
        <div className="mt-2 text-gray-700">{article.content}</div>
      )}
    </div>
  ))}
</div>
{count > 0 && (
        <h3 className="text-lg font-bold mb-4">Selected Article ID: {count}</h3>
      )}
    </div>
  );
};

export default DisplayAllArticles;