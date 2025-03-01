import React from "react";
import HeroBanner from "../../components/Herobanner/HeroBanner";
import TeachingCard from "../../components/Teachingmaterials/TeachingCard";
import Teachingmaterialscontainer from "../../components/Teachingmaterials/TeachingmMterialsContainer";

const Index = () => {
  return (
    <section className="bg-blanchOrange">
      <HeroBanner />
      <section className="flex items-center justify-center mb-50">
        <Teachingmaterialscontainer />
      </section>
    </section>
  );
};

export default Index;
