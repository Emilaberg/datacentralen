import React from "react";
import HeroBanner from "../../components/Herobanner/HeroBanner";
import TeachingMaterialsContainer from "../../components/Laroportal/TeachingMaterialsContainer";
import ApiService from "../../Services/ApiService";
import { useQuery } from "@tanstack/react-query";
import {ArticleProps} from "../../Types/types"

const Index = () => {  
  return (
    <section>
      <HeroBanner />
      <section className="flex items-center justify-center mb-50">
        <TeachingMaterialsContainer />
      </section>
    </section>
  );
};

export default Index;
