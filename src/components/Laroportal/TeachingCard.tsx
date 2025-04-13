import React from "react";
import { useNavigate } from "react-router-dom";

// Todos
// 1. Gör dynamisk, ta emot typ av algoritms-typ, algoritms-namn, algoritms-beskrivning och länk till mer information
// 2. Dynamisk styling, ta emot färgkod för bakgrund, 2 färger för gradient.

type CardComponentProps = {
  algorithmType: string;
  algorithmName: string;
  algorithmDescription: string;
  link?: string;
  gradientColor1: string;
  gradientColor2: string;
  alternatingBorderRadius?: React.CSSProperties;
};

const TeachingCard: React.FC<CardComponentProps> = ({
  algorithmType,
  algorithmName,
  algorithmDescription,
  link,
  gradientColor1,
  gradientColor2,
  alternatingBorderRadius,
}) => {
  const navigate = useNavigate();
  const RouteToText = (link: string | undefined) => {
    console.log(link);
    if (link === undefined) {
      return;
    }
    navigate(link);
  };

  return (
    <div
      className={"w-[530px] h-72 rounded-3xl rounded-tr-none p-5"}
      style={{
        background: `linear-gradient(343deg, ${gradientColor1} 20%, ${gradientColor2} 92%)`,
        ...alternatingBorderRadius,
      }}
    >
      <div className="w-fit px-3 py-1 bg-white rounded-xl flex items-center justify-center">
        <p className="text-sm font-medium text-black/50">{algorithmType}</p>
      </div>
      <div className="mt-3.5">
        <h1 className="text-6xl text-black/80 font-mono">{algorithmName}</h1>
      </div>
      <div className="mt-5 w-full">
        <p className="font-sans font-medium text-black/50 text-lg tracking-tight">
          {algorithmDescription}
        </p>
      </div>
      <div
        className="items-center gap-8 mt-10 hover:underline hover:cursor-pointer inline-flex"
        onClick={() => RouteToText(link)}
      >
        <h1 className=" text-xl">Läs Mer</h1>
        <img
          src="src\assets\icons\arrow-right.svg"
          alt="arrow-right"
          className="w-8"
        />
      </div>
    </div>
  );
};

export default TeachingCard;
