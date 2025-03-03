import React from "react";
import TeachingCard from "./TeachingCard";

const TeachingCards = [
  {
    algorihmType: "Sorterings algoritm",
    algorithmName: "QuickSort",
    algorithmDescription:
      "Dela upp listan vid en pivot och sortera delarna rekursivt",
    gradientColor1: "#F9B66B",
    gradientColor2: "#F7E6D3",
  },
  {
    algorihmType: "Sorterings algoritm",
    algorithmName: "HeapSort",
    algorithmDescription:
      "Använder en heap för att sortera genom att extrahera största/minsta elementet.",
    gradientColor1: "#79ACE4",
    gradientColor2: "#D3E4F7",
  },
  {
    algorihmType: "Sorterings algoritm",
    algorithmName: "BubbleSort",
    algorithmDescription:
      "Jämför och byter intilliggande element tills listan är sorterad",
    gradientColor1: "#A6E386",
    gradientColor2: "#E1EEDA",
  },
  {
    algorihmType: "Datastruktur",
    algorithmName: "Array",
    algorithmDescription:
      "En samling av element lagrade i en ordnad sekvens, åtkomliga via index.",
    gradientColor1: "#83EDBB",
    gradientColor2: "#D3F7E6",
  },
  {
    algorihmType: "Datastruktur",
    algorithmName: "Stack",
    algorithmDescription:
      "Element läggs till och tas bort i en ordning som följer Last In, First Out",
    gradientColor1: "#DFB0F6",
    gradientColor2: "#E6E0E9",
  },
  {
    algorihmType: "Datastruktur",
    algorithmName: "Hash Table",
    algorithmDescription:
      "Lagrar nyckel-värdepar och använder en hash-funktion för snabb åtkomst.",
    gradientColor1: "#F5F886",
    gradientColor2: "#F6F7D3",
  },
];

const Teachingmaterialscontainer = () => {
  return (
    <div className="">
      <div className="flex justify-center mb-15 text-5xl underline">
        <h1>Läromedel</h1>
      </div>
      <div className="flex justify-evenly mb-10 text-4xl text-[#F9B66B]">
        <div className="hover:underline hover:cursor-pointer">
          Sorteringsalgoritmer
        </div>
        <div className="hover:underline hover:cursor-pointer">
          Datastrukturer
        </div>
      </div>
      <div className="w-[1350px] h-[1400px] border border-dashed border-black flex justify-center pt-15">
        <div className="grid grid-cols-2 h-72 gap-15">
          {TeachingCards.map((card, index) => (
            <div
              key={index}
              className={`${index % 2 === 0 ? "mt-0" : "mt-26"}`}
            >
              <TeachingCard
                algorithmType={card.algorihmType}
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

export default Teachingmaterialscontainer;
