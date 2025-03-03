import React from "react";
import TeachingCard from "../Teachingmaterials/TeachingCard";

type TeachingCardType = {
  algorithmType: string;
  algorithmName: string;
  algorithmDescription: string;
  gradientColor1: string;
  gradientColor2: string;
};

type LaroContainerProps = {
  laroType: string;
  teachingCards: TeachingCardType[];
};

const LaroContainer: React.FC<LaroContainerProps> = ({
  laroType,
  teachingCards,
}) => {
  return (
    <div>
      <h1 className="text-5xl mb-10">{laroType}</h1>
      <div className="h-[750px] w-[1200px] border border-dashed border-black flex justify-center items-center pb-10">
        <div className="grid grid-cols-2  gap-10">
          {teachingCards.map((card, index) => (
            <div key={index} className="">
              <TeachingCard
                algorithmType={card.algorithmType}
                algorithmName={card.algorithmName}
                algorithmDescription={card.algorithmDescription}
                gradientColor1={card.gradientColor1}
                gradientColor2={card.gradientColor2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaroContainer;
