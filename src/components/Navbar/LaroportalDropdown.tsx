import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import { ArticleDTOProps } from "../../Types/types";

const LaroportalDropdown = () => {
  const { ArticlesDTO } = ApiService();

  const { data, isLoading } = useQuery({
    queryKey: ["articlesDTO"],
    queryFn: ArticlesDTO,
  });

  return (
    <div className="absolute w-full left-0 top-0 hidden group-hover:block z-20">
      <ul className="w-[200%] mt-10 hidden group-hover:flex flex-col gap-2 bg-white px-6 capitalize rounded-2xl border-2 border-[#96C9E3] py-4 shadow-md">
        {isLoading && <li>Laddar artiklar...</li>}

        {data?.map((article: ArticleDTOProps) => (
          <li key={article.id}>
            <Link
              to={`/reading?id=${article.id}`}
              className="text-black font-medium text-lg hover:underline"
            >
              {article.title}
            </Link>
            <p className="text-black/50 text-sm font-roboto text-ellipsis whitespace-nowrap overflow-hidden">
              {article.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaroportalDropdown;
