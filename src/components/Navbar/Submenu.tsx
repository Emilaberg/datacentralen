import { useQuery } from "@tanstack/react-query";
import ApiService from "../../Services/ApiService";
import { Link } from "react-router-dom";
import { AlgoritmSubMenyProps } from "../../Types/types";
import { selectedAlgorithmTypes } from "../../Types/types";

const Submenu = () => {
  const { Articles } = ApiService();

  const { data: articlesData, isLoading: isLoadingArticles } = useQuery({
    queryFn: Articles,
    queryKey: ["articles"],
  });

  const submenuData: AlgoritmSubMenyProps[] = (
    Object.values(selectedAlgorithmTypes) as selectedAlgorithmTypes[]
  )
    .slice(0, -1) // Excluderar alltid "none" sålänge den ligger sist i enum
    .map((algorithm) => {
      const article = articlesData?.find(
        (item: any) => item.title === algorithm
      );
      return {
        algorithms: [algorithm],
        description: article?.description || "Ingen beskrivning tillgänglig",
      };
    });

  return (
    <div className="absolute w-full left-0 top-0 hidden group-hover:block">
      <ul className="w-[200%] mt-10 hidden group-hover:flex flex-col gap-2 bg-white px-6 capitalize rounded-2xl border-2 border-[#96C9E3] py-4">
        {isLoadingArticles && <div>Laddar artiklar..</div>}
        {!isLoadingArticles &&
          submenuData.map((algorithm, index) => (
            <li key={index}>
              <Link
                to={`/testa-algoritm/${algorithm.algorithms[0]}`}
                className="font-medium text-lg"
              >
                {algorithm.algorithms[0]}
              </Link>
              <p className="text-black/50 text-sm font-roboto w- text-ellipsis whitespace-nowrap overflow-hidden">
                {algorithm.description}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Submenu;
