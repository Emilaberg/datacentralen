import React, { useState, useEffect } from "react";
import TeachingCard from "./TeachingCard";
import "./animations.css";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [animationDirection, setAnimationDirection] =
    useState("slide-out-left");
  const cardsPerPage = 4;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = teachingCards.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(() => {
    if (nextPage !== null) {
      setIsAnimating(true);
      setIsFadingOut(true);

      const fadeOutTimeout = setTimeout(() => {
        setCurrentPage(nextPage);
        setIsFadingOut(false);
      }, 400);

      const animationTimeout = setTimeout(() => {
        setIsAnimating(false);
        setNextPage(null);
      }, 800);

      return () => {
        clearTimeout(fadeOutTimeout);
        clearTimeout(animationTimeout);
      };
    }
  }, [nextPage]);

  const pageChangeAnimation = (page: number) => {
    if (isAnimating || page === currentPage) return;
    setAnimationDirection(
      page > currentPage ? "slide-out-left" : "slide-out-right"
    );
    setNextPage(page);
  };

  return (
    <div className="overflow-x-hidden">
      <h1 className="text-5xl mb-10">{laroType}</h1>
      <div className="h-[750px] w-[1200px] border border-dashed border-black flex flex-col justify-between">
        <div className="flex justify-center items-center mt-10 ">
          <div
            className={`grid grid-cols-2 gap-10 transition-transform duration-500 ease-in-out ${
              isFadingOut
                ? animationDirection
                : animationDirection === "slide-out-left"
                ? "slide-in-right"
                : "slide-in-left"
            }`}
          >
            {currentCards.map((card, index) => (
              <div key={index} className="flex justify-center items-center">
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
          <div className="flex items-center justify-center gap-2 mb-5">
            {Array.from({
              length: Math.ceil(teachingCards.length / cardsPerPage),
            }).map((_, index) => (
              <div
                key={index}
                onClick={() => pageChangeAnimation(index + 1)}
                className={`h-3.5 w-3.5 border border-black rounded-full hover:cursor-pointer hover:border-2 transition-all ${
                  currentPage === index + 1 ? "bg-[#8A8A8A]" : "bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaroContainer;
