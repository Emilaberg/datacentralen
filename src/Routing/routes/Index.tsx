import React from "react";
import HeroBanner from "../../components/Herobanner/HeroBanner";
import TeachingMaterialsContainer from "../../components/Teachingmaterials/TeachingMaterialsContainer";

const Index = () => {
  return (
    <section className="bg-blanchOrange">
      <HeroBanner />
      <section className="flex items-center justify-center mb-50">
        <TeachingMaterialsContainer />
      </section>
    </section>
  );
};

export default Index;
