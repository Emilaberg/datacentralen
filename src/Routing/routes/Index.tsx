import React from "react";
import HeroBanner from "../../components/Herobanner/HeroBanner";
import TeachingMaterialsContainer from "../../components/Laroportal/TeachingMaterialsContainer";
import ApiService from "../../Services/ApiService";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { ArticleCardDTO } = ApiService();

  const { data: articlesCardData, isLoading: isLoadingArticlesCard } = useQuery(
    {
      queryFn: ArticleCardDTO,
      queryKey: ["articlesCard"],
    }
  );

  return (
    <section>
      <HeroBanner />
      <section className="flex items-center justify-center mb-50">
        <TeachingMaterialsContainer
          articlesCardData={articlesCardData}
          isLoading={isLoadingArticlesCard}
        />
      </section>
    </section>
  );
};

export default Index;