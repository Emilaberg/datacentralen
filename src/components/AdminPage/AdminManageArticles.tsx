import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useGetAllArticles } from "../../components/Hooks/useGetAllArticles";
import ArticlesTable from "./Table/ArticlesTable";
import { ClipLoader } from "react-spinners";
import { ArticleProps } from "../../Types/types";
import { useNavigate } from "react-router-dom";
import AuthorizedApiService from "../../Services/AuthorizedApiService";
import ConfirmModal from "./Modals/ConfirmModal";

export default function AdminManageArticles() {
  const { data: articles = [], isLoading, refetch } = useGetAllArticles();
  const navigate = useNavigate();
  const api = AuthorizedApiService();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] =
    React.useState<HandleDeleteArticle | null>(null);

  const handleEdit = (article: ArticleProps) => {
    navigate("/admin-dashboard/create", { state: { article } });
  };

  interface HandleDeleteArticle {
    id: number;
    title: string;
  }

  const handleDelete = (article: HandleDeleteArticle) => {
    setArticleToDelete(article);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    const response = await api.DELETEArticle(articleToDelete.id, true);
    setModalOpen(false);
    setArticleToDelete(null);
    if (response && response.ok) {
      if (refetch) refetch();
    } else {
      setErrorModalOpen(true);
    }
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
            <ConfirmModal
              open={modalOpen}
              message={`Är du säker på att du vill ta bort "${articleToDelete?.title}"?`}
              onConfirm={confirmDelete}
              onCancel={() => {
                setModalOpen(false);
                setArticleToDelete(null);
              }}
            />
            <ConfirmModal
              open={errorModalOpen}
              title="Fel"
              message="Kunde inte ta bort artikeln."
              buttons={[
                {
                  label: "Stäng",
                  onClick: () => setErrorModalOpen(false),
                  className: "px-4 py-2 rounded bg-gray-200 hover:bg-gray-300",
                },
              ]}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
