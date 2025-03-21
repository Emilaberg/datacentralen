import { useState } from "react";
import TeachingCard from "./TeachingCard";
import { useAuth } from "../../Auth/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const TeachingCards = [
  {
    algorithmType: "Sorteringsalgoritm",
    algorithmName: "QuickSort",
    algorithmDescription:
      "Dela upp listan vid en pivot och sortera delarna rekursivt",
    gradientColor1: "#F9B66B",
    gradientColor2: "#F7E6D3",
  },
  {
    algorithmType: "Sorteringsalgoritm",
    algorithmName: "HeapSort",
    algorithmDescription:
      "Använder en heap för att sortera genom att extrahera största/minsta elementet.",
    gradientColor1: "#79ACE4",
    gradientColor2: "#D3E4F7",
  },
  {
    algorithmType: "Sorteringsalgoritm",
    algorithmName: "BubbleSort",
    algorithmDescription:
      "Jämför och byter intilliggande element tills listan är sorterad",
    gradientColor1: "#A6E386",
    gradientColor2: "#E1EEDA",
  },
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

const TeachingMaterialsContainer = () => {
  const auth = useAuth();
  const [sortStatus, setSortStatus] = useState<
    null | "Sorteringsalgoritmer" | "Datastrukturer"
  >(null);

  const handleSort = (type: "Sorteringsalgoritmer" | "Datastrukturer") => {
    setSortStatus((prevStatus) => (prevStatus === type ? null : type));
  };

  const filteredCards = sortStatus
    ? TeachingCards.filter((card) =>
        sortStatus === "Sorteringsalgoritmer"
          ? card.algorithmType === "Sorteringsalgoritm"
          : card.algorithmType === "Datastruktur"
      )
    : TeachingCards;

  return (
    <div className="">
      {auth.token && <span>du är inloggad</span>}
      <div className="flex justify-center mb-15 text-5xl underline">
        <h1>Läromedel</h1>
      </div>
      <div className="flex justify-evenly mb-10 text-4xl text-[#F9B66B]">
        <div
          className={`hover:underline hover:cursor-pointer ${
            sortStatus === "Sorteringsalgoritmer" ? "underline" : ""
          }`}
          onClick={() => handleSort("Sorteringsalgoritmer")}
        >
          Sorteringsalgoritmer
        </div>
        <div
          className={`hover:underline hover:cursor-pointer ${
            sortStatus === "Datastrukturer" ? "underline" : ""
          }`}
          onClick={() => handleSort("Datastrukturer")}
        >
          Datastrukturer
        </div>
      </div>
      <div className="w-[1350px] h-[1400px] border border-dashed border-black flex justify-center pt-15">
        <div className="grid grid-cols-2 h-72 gap-15">
          <AnimatePresence key={sortStatus}>
            {filteredCards.map((card, index) => (
              <motion.div
                key={index}
                className={`${index % 2 === 0 ? "mt-0" : "mt-26"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TeachingCard
                  algorithmType={card.algorithmType}
                  algorithmName={card.algorithmName}
                  algorithmDescription={card.algorithmDescription}
                  gradientColor1={card.gradientColor1}
                  gradientColor2={card.gradientColor2}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TeachingMaterialsContainer;
