import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

// Todos
// 1. Gör dynamisk, ta emot typ av algoritms-typ, algoritms-namn, algoritms-beskrivning och länk till mer information
// 2. Dynamisk styling, ta emot färgkod för bakgrund, 2 färger för gradient.

type CardComponentProps = {
  id: number;
  algorithmType: string;
  algorithmName: string;
  algorithmDescription: string;
  link?: string;
  gradientColor1: string;
  gradientColor2: string;
  alternatingBorderRadius?: React.CSSProperties;
};

const TeachingCard: React.FC<CardComponentProps> = ({
  id,
  algorithmType,
  algorithmName,
  algorithmDescription,
  gradientColor1,
  gradientColor2,
  alternatingBorderRadius,
}) => {
  const navigate = useNavigate();

  const RouteToText = () => {
    if (!id) {
      return;
    }
    navigate(`/laroportal/article/${id}`);
  };

  return (
    <div
      className={
        "w-[530px] h-72 rounded-3xl rounded-tr-none p-5 flex flex-col justify-between"
      }
      style={{
        background: `linear-gradient(343deg, ${gradientColor1} 20%, ${gradientColor2} 92%)`,
        ...alternatingBorderRadius,
      }}
    >
      <div>
        <div className="w-fit px-3 py-1 bg-white rounded-xl flex items-center justify-center">
          <p className="text-sm font-medium text-black/50">{algorithmType}</p>
        </div>
        <div className="mt-3.5">
          <h1
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="text-6xl text-black/80 font-mono"
          >
            {algorithmName}
          </h1>
        </div>
        <div className="mt-5 w-full">
          <p
            className="font-sans font-medium text-black/50 text-lg tracking-tight"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {algorithmDescription}
          </p>
        </div>
      </div>
      <div
        className="items-center gap-8 mt-10 hover:underline hover:cursor-pointer inline-flex"
        onClick={() => RouteToText()}
      >
        <h1 className=" text-xl">Läs Mer</h1>
        <ArrowRight size={20} color="#000000" weight="bold" />
      </div>
    </div>
  );
};

export default TeachingCard;
