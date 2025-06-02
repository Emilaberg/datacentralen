import React from "react";
import { ArticleProps } from "../../../Types/types";
import { Trash, NotePencil } from "@phosphor-icons/react";

export default function ActionsDropdown({
  onEdit,
  onDelete,
  article,
}: {
  onEdit?: (article: ArticleProps) => void;
  onDelete?: (article: ArticleProps) => void;
  article: ArticleProps;
}) {
  return (
    <div className="absolute right-0 left-10 mt-2 w-32 h-20 bg-white border border-gray-200 rounded shadow-lg z-10 text-sm">
      <button
        className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-left "
        onClick={() => onEdit && onEdit(article)}
      >
        <NotePencil size={18} className="mr-2" /> Redigera
      </button>
      <button
        className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-left text-red-600 text-sm"
        onClick={() => onDelete && onDelete(article)}
      >
        <Trash size={18} className="mr-2" /> Ta bort
      </button>
    </div>
  );
}
