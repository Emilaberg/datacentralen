import React from "react";
import { useAlgorithm } from "../../Services/AlgorithmProvider";

const CalculatorScreen = () => {
  const AlgorithmProvider = useAlgorithm();
  return (
    <article className="mt-3 px-3 py-7 border border-solid border-[#CECECE] rounded-xl flex flex-wrap gap-2 items-center">
      {AlgorithmProvider.array.map((item, index) => (
        <span
          key={index}
          className="rounded-md px-4 py-3 bg-[#F3F3F3] border border-solid border-[#CECECE]"
        >
          {item}
        </span>
      ))}
      {}
      {/* generera span */}

      <span className="rounded-md  px-4 py-3 bg-[#F3F3F3] border border-solid border-amber-400">
          {AlgorithmProvider.previewInput ?? "-"}
      </span>
    </article>
  );
};

export default CalculatorScreen;
