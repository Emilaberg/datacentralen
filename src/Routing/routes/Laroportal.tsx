import { useState, useEffect } from "react";
import LaroContainer from "../../components/Laroportal/LaroContainer";
import ApiService from "../../Services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { ArticleCardDTOProps } from "../../Types/types";

const Laroportal = () => {
  const { ArticleCardDTO } = ApiService();
  const [sortingAlgorithms, setSortingAlgorithms] = useState([]);
  const [dataStructures, setDataStructures] = useState([]);

  const { data: articlesCardData, isLoading: isLoadingArticlesCard } = useQuery(
    {
      queryFn: ArticleCardDTO,
      queryKey: ["articlesCard"],
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (articlesCardData) {
      const sortingAlgorithmsData = articlesCardData.filter(
        (item: ArticleCardDTOProps) => item.type === "Sorteringsalgoritm"
      );
      const dataStructuresData = articlesCardData.filter(
        (item: ArticleCardDTOProps) => item.type === "Datastruktur"
      );

      setSortingAlgorithms(sortingAlgorithmsData);
      setDataStructures(dataStructuresData);
    }
  }, [articlesCardData]);

  return (
    <section className="h-full mt-40 flex items-center flex-col gap-20 mb-50">
      <section>
        <LaroContainer
          laroType="Sorterings Algoritmer"
          teachingCards={sortingAlgorithms}
          isLoading={isLoadingArticlesCard}
        />
      </section>
      <section>
        <LaroContainer
          laroType="Data strukturer"
          teachingCards={dataStructures}
          isLoading={isLoadingArticlesCard}
        />
      </section>
    </section>
  );
};

export default Laroportal;
