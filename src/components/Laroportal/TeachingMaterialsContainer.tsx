import { useState } from "react";
import TeachingCard from "./TeachingCard";
import { useAuth } from "../../Auth/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleCardDTOProps } from "../../Types/types";

interface TeachingMaterialsContainerProps {
  articlesCardData: ArticleCardDTOProps[] | undefined;
  isLoading: boolean;
}

const TeachingMaterialsContainer = ({
  articlesCardData,
  isLoading,
}: TeachingMaterialsContainerProps) => {
  const auth = useAuth();
  const [sortStatus, setSortStatus] = useState<
    null | "Sorteringsalgoritmer" | "Datastrukturer"
  >(null);

  const handleSort = (type: "Sorteringsalgoritmer" | "Datastrukturer") => {
    setSortStatus((prevStatus) => (prevStatus === type ? null : type));
  };

  const filteredCards = sortStatus
    ? articlesCardData?.filter((card) =>
        sortStatus === "Sorteringsalgoritmer"
          ? card.type === "Sorteringsalgoritm"
          : card.type === "Datastruktur"
      )
    : articlesCardData;

  return (
    <div className="">
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
      <div className="max-w-[1350px] h-[1400px] px-4 border border-dashed border-black flex justify-center pt-15">
        <div className="grid grid-cols-2 h-72 gap-15">
          <AnimatePresence key={sortStatus}>
            {isLoading && (
              <div className="flex w-full h-full justify-center items-center">
                Loading...
              </div>
            )}
            {filteredCards?.slice(0, 6).map((card, index) => (
              <motion.div
                key={index}
                className={`${index % 2 === 0 ? "mt-0" : "mt-26"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TeachingCard
                  id={card.id}
                  algorithmType={card.type}
                  algorithmName={card.title}
                  algorithmDescription={card.description}
                  gradientColor1={card.colorCodeOne || "#FFFFFF"}
                  gradientColor2={card.colorCodeTwo || "#FFFFFF"}
                  alternatingBorderRadius={
                    index % 2 === 0
                      ? {
                          borderTopRightRadius: "0px",
                          borderTopLeftRadius: "15px",
                        }
                      : {
                          borderTopLeftRadius: "0px",
                          borderTopRightRadius: "15px",
                        }
                  }
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
