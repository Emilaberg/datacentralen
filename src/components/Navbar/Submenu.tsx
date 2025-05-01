import { useQuery } from "@tanstack/react-query";
import ApiService from "../../Services/ApiService";
import { Link } from "react-router-dom";
import { selectedAlgorithmTypes } from "../../Types/types";

const { Articles } = ApiService();

const { data: articlesData, isLoading: isLoadingArticles } = useQuery({
  queryFn: Articles,
  queryKey: ["articles"],
});

const Submenu = () => {
  const algorithms = Object.values(selectedAlgorithmTypes).slice(0, 4);
  const algorithmDescriptions = algorithms.map((algorithm) => {
    const article = articlesData?.find((item: any) => item.title === algorithm);
    return {
      title: algorithm,
      description: article?.description || "No description available",
    };
  });

  return (
    <div className="absolute w-full left-0 top-0 hidden group-hover:block">
      <ul className="w-[200%] mt-10 hidden group-hover:flex flex-col gap-2 bg-white px-6 capitalize rounded-2xl border-2 border-[#96C9E3] py-4">
        {algorithms.map((algorithm, index) => (
          <li key={index}>
            <Link
              to={`/testa-algoritm/${algorithm}`}
              className="font-medium text-lg"
            >
              {algorithm}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Submenu;
