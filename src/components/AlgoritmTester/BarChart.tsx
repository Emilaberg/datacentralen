import React from "react";

const BarChart = ({ array = [] }: { array: number[] }) => {
  const maxValue = Math.max(...array);

  return (
    <article className="pb-12">
      <div className="flex gap-2 h-96 mt-7 items-end">
        {array.map((item, index) => (
          <div
            key={index}
            className="relative w-4 bg-black"
            style={{
              height: `${(item / maxValue) * 100}%`,
            }}
          >
            <span className="absolute top-full mt-2 text-[10px] w-6 text-center block">
              {item}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default BarChart;
