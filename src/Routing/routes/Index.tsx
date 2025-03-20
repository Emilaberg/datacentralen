import React from "react";
import HeroBanner from "../../components/Herobanner/HeroBanner";
import TeachingMaterialsContainer from "../../components/Laroportal/TeachingMaterialsContainer";
import ApiService from "../../Services/ApiService";
import { useQuery } from "@tanstack/react-query";
import {ArticleProps} from "../../Types/types"

const Index = () => {

  //exempel på hur man kan hämta och använda useQuery
  const { Articles } = ApiService();

  const {data, isLoading, } = useQuery({
    queryFn: Articles,
    queryKey: ["articles"],
  });
  
  return (
    <section className="bg-blanchOrange">
      <HeroBanner />
      <section className="flex items-center justify-center mb-50">
        <TeachingMaterialsContainer />
      </section>

      {isLoading && (<div>loading articles...</div>)}
      {data?.map((article : ArticleProps) => (<div key={article.id}>{article.title}</div>))}
    </section>
  );
};

export default Index;
