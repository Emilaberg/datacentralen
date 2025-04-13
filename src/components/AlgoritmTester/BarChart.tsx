import React from "react";
import { useAlgorithm } from "../../Services/AlgorithmProvider";

const BarChart = ({array = []}:{array: number[]}) => {
  //dynamic scaling 
  const maxValue = Math.max(...array);

  return (
    <article>
      <div className="flex gap-2 h-96 mt-7 items-end">
        {array.map((item, index) => (
          <div
            key={index}
            className={`relative w-4 bg-black`}
            style={{
              height: `${(item / maxValue) * 100}%`,
            }}
          >
            <span className="absolute top-full mt-2">{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default BarChart;
