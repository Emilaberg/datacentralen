import React, { useState } from "react";
import { ArticleProps } from "../../../Types/types";
import { DotsThreeVertical } from "@phosphor-icons/react";
import ActionsDropdown from "../components/ActionsDropdown";

interface ArticlesTableProps {
  articles: ArticleProps[];
  mode?: "overview" | "edit";
  onEdit?: (article: ArticleProps) => void;
  onDelete?: (article: ArticleProps) => void;
}

export default function ArticlesTable({
  articles,
  mode = "overview",
  onEdit,
  onDelete,
}: ArticlesTableProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-300">
          <th className="p-2 border-b">ID</th>
          <th className="p-2 border-b">Titel</th>
          <th className="p-2 border-b">Författare</th>
          <th className="p-2 border-b">Typ</th>
          <th className="p-2 border-b">Publicerad</th>
          <th className="p-2 border-b">Senast ändrad</th>
          <th className="p-2 border-b">Likes</th>
          {mode === "edit" && (
            <>
              <th className="p-2 border-b ">Åtgärder</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {articles.map((article, idx) => (
          <tr
            key={article.id}
            className={`text-center cursor-pointer transition text-sm ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-100"
            } hover:bg-gray-200`}
          >
            <td className="p-2 border-b">{article.id}</td>
            <td className="p-2 border-b">{article.title}</td>
            <td className="p-2 border-b">{article.author}</td>
            <td className="p-2 border-b">{article.type}</td>
            <td className="p-2 border-b">
              {article.posted
                ? new Date(article.posted).toLocaleDateString("sv-SE")
                : "-"}
            </td>
            <td className="p-2 border-b">
              {article.lastEdited
                ? new Date(article.lastEdited).toLocaleDateString("sv-SE")
                : "-"}
            </td>
            <td className="p-2 border-b">{article.likes}</td>
            {mode === "edit" && (
              <td className="p-2 border-b relative">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === article.id ? null : article.id
                    )
                  }
                  title="Åtgärder"
                  className="p-1 hover:cursor-pointer"
                >
                  <DotsThreeVertical size={22} />
                </button>
                {openDropdown === article.id && (
                  <ActionsDropdown
                    onEdit={onEdit}
                    onDelete={onDelete}
                    article={article}
                  />
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
