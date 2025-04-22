import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import { ARTICLE_AMOUNT, ArticleDTOProps } from "../../Types/types";

interface algorithmProps {
  sortingAlgorithms: Array<ArticleDTOProps>
  dataStructures: Array<ArticleDTOProps>
}


const LaroportalDropdown = () => {
  const { GroupedArticlesDropdown } = ApiService();

  const { data, isLoading } = useQuery({
    queryKey: ["groupedArticles"],
    queryFn: () => GroupedArticlesDropdown(ARTICLE_AMOUNT),
  });

  const algorithms:algorithmProps = data as algorithmProps;

  return (
    <div className="absolute left-0 top-full">
      <div className="mt-2 hidden group-hover:flex bg-white px-6 py-4 border-2 border-[#96C9E3] rounded-2xl w-[600px] z-50 justify-between shadow-lg">
        {isLoading && <div>Laddar artiklar...</div>}

        <div className="w-1/2 pr-4">
          <h3 className="text-lg font-semibold mb-2">Sorteringsalgoritmer</h3>
          <ul className="flex flex-col gap-2">
            {algorithms.sortingAlgorithms.map((article) => (
              <li key={article.id}>
                <Link
                  to={`/laroportal/articles/${article.id}`}
                  className="text-black font-medium hover:underline cursor-pointer"
                >
                  {article.title}
                </Link>
                <p className="text-black/50 text-sm">{article.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 pl-4">
          <h3 className="text-lg font-semibold mb-2">Datastrukturer</h3>
          <ul className="flex flex-col gap-2">
            {algorithms.dataStructures.map((article) => (
              <li key={article.id}>
                <Link
                  to={`/laroportal/articles/${article.id}`}
                  className="text-black font-medium hover:underline cursor-pointer"
                >
                  {article.title}
                </Link>
                <p className="text-black/50 text-sm">{article.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LaroportalDropdown;
