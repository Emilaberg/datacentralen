import React from "react";
import LaroContainer from "../../components/Laroportal/LaroContainer";

const sortingAlgorithms = [
  {
    algorithmType: "Sorterings algoritm",
    algorithmName: "QuickSort",
    algorithmDescription:
      "Dela upp listan vid en pivot och sortera delarna rekursivt",
    gradientColor1: "#F9B66B",
    gradientColor2: "#F7E6D3",
  },
  {
    algorithmType: "Sorterings algoritm",
    algorithmName: "HeapSort",
    algorithmDescription:
      "Använder en heap för att sortera genom att extrahera största/minsta elementet.",
    gradientColor1: "#79ACE4",
    gradientColor2: "#D3E4F7",
  },
  {
    algorithmType: "Sorterings algoritm",
    algorithmName: "BubbleSort",
    algorithmDescription:
      "Jämför och byter intilliggande element tills listan är sorterad",
    gradientColor1: "#A6E386",
    gradientColor2: "#E1EEDA",
  },
];

const dataStructures = [
  {
    algorithmType: "Datastruktur",
    algorithmName: "Array",
    algorithmDescription:
      "En samling av element lagrade i en ordnad sekvens, åtkomliga via index.",
    gradientColor1: "#83EDBB",
    gradientColor2: "#D3F7E6",
  },
  {
    algorithmType: "Datastruktur",
    algorithmName: "Stack",
    algorithmDescription:
      "Element läggs till och tas bort i en ordning som följer Last In, First Out",
    gradientColor1: "#DFB0F6",
    gradientColor2: "#E6E0E9",
  },
  {
    algorithmType: "Datastruktur",
    algorithmName: "Hash Table",
    algorithmDescription:
      "Lagrar nyckel-värdepar och använder en hash-funktion för snabb åtkomst.",
    gradientColor1: "#F5F886",
    gradientColor2: "#F6F7D3",
  },
];

const Laroportal = () => {
  return (
    <section className="h-screen mt-40 flex items-center flex-col gap-20">
      <section>
        <LaroContainer
          laroType="Sorterings Algoritmer"
          teachingCards={sortingAlgorithms}
        />
      </section>
      <section>
        <LaroContainer
          laroType="Data strukturer"
          teachingCards={dataStructures}
        />
      </section>
    </section>
  );
};

export default Laroportal;
