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
      <div className="h-[750px] w-[1200px] border border-dashed border-black ">
        <div className="flex justify-center items-center mt-10 ">
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
        <div className="flex items-end justify-center mt-10 gap-2">
          <div className="h-3.5 w-3.5 bg-[#8A8A8A] border border-black rounded-full hover:cursor-pointer hover:border-2"></div>
          <div className="h-3.5 w-3.5 bg-white border border-black rounded-full hover:cursor-pointer hover:border-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LaroContainer;
