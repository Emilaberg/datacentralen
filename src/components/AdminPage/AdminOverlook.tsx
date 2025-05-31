import React from "react";
import AdminLayout from "./AdminLayout";
import { useGetAllArticles } from "../../components/Hooks/useGetAllArticles";
import { ClipLoader } from "react-spinners";
import ArticlesTable from "./Table/ArticlesTable";

export default function AdminOverlook() {
  const { data: articles = [], isLoading } = useGetAllArticles();

  return (
    <AdminLayout>
      <div className="w-full min-h-screen mt-20 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-2">Admin översyn</h2>
        <p className="mb-6 text-gray-600 text-center max-w-xl">
          Här har du en överblick över alla artiklar i systemet.
        </p>
        {isLoading ? (
          <ClipLoader loading={true} color="#777777" size={36} />
        ) : (
          <div className="w-full max-w-5xl">
            <div className="mb-2 text-gray-700 text-left">
              <span className="font-bold">{articles.length}</span> artiklar i
              databasen just nu.
            </div>
            <ArticlesTable articles={articles} mode="overview" />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
