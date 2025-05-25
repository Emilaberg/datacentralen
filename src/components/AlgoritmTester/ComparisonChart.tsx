import React from "react";
import BarChart from "./BarChart";

interface ComparisonChartProps {
  original: number[];
  sorted: number[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  original,
  sorted,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-100 mt-6 justify-evenly items-center">
      <div className="flex-1 max-w-[400px]">
        <h3 className="text-center font-semibold mb-2">Ursprung</h3>
        <BarChart array={original} />
      </div>
      <div className="flex-1 max-w-[400px]">
        <h3 className="text-center font-semibold mb-2">Sorterad</h3>
        <BarChart array={sorted} />
      </div>
    </div>
  );
};

export default ComparisonChart;
