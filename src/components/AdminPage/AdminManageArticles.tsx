import React from "react";
import AdminLayout from "./AdminLayout";
import { useGetAllArticles } from "../../components/Hooks/useGetAllArticles";
import ArticlesTable from "./Table/ArticlesTable";
import { ClipLoader } from "react-spinners";
import { ArticleProps } from "../../Types/types";
import { useNavigate } from "react-router-dom";

export default function AdminManageArticles() {
  const { data: articles = [], isLoading } = useGetAllArticles();
  const navigate = useNavigate();

  const handleEdit = (article: ArticleProps) => {
    navigate("/admin-dashboard/create", { state: { article } });
  };

  const handleDelete = (article: ArticleProps) => {
    alert(`Ta bort artikel: ${article.title}`);
  };

  return (
    <AdminLayout>
      <div className="w-full min-h-screen mt-20 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-2">Hantera artiklar</h2>
        <p className=" mb-3 text-gray-600 text-center max-w-xl">
          Här kan du redigera eller ta bort artiklar.
        </p>
        <p className="mb-6 text-gray-600/75 text-center max-w-xl">
          * Observera att redigera tar dig till skapande av artikel med all info
          ifylld.
        </p>
        {isLoading ? (
          <ClipLoader loading={true} color="#777777" size={36} />
        ) : (
          <div className="w-full max-w-5xl">
            <ArticlesTable
              articles={articles}
              mode="edit"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
