import React, { useContext } from "react";
import Calculator from "../Calculator/Calculator";
import { useAlgorithm } from "../../Services/AlgorithmProvider";
import { selectedAlgorithmTypes } from "../../Types/types";
import BarChart from "./BarChart";

const AlgoritmTester = () => {
  const AlgorithmProvider = useAlgorithm();

  return AlgorithmProvider.selectedAlgorithm !== selectedAlgorithmTypes.none ? (
    <>
      <article className="">
        <h2 className="text-lg text-[#777777] font-light">vald algoritm</h2>
        <h1 className="text-5xl mt-4 mb-3">
          {AlgorithmProvider.selectedAlgorithm}
        </h1>
        <h2 className="text-lg text-[#777777] font-light ">
          tidskomplexitet: {AlgorithmProvider.timeComplexity}
        </h2>
      </article>
{"algoritm körs " + AlgorithmProvider.isAlgorithmRunning}
      <section className="flex justify-between xl:justify-center">
        <section className="w-1/2 xl:w-1/3">
          <article className="flex flex-col bg-[#e1e1e1]/50 px-8 py-2 mt-14 w-5/6 rounded-xl">
            <h2 className="text-2xl">metrics:</h2>
            <hr className="my-2 border-gray-800" />

            <h3 className="flex text-lg font-light">
              antal <br /> förflyttnigar:{" "}
              <span className="ml-auto mt-auto">
                {" "}
                {AlgorithmProvider.amountOfIterations === 0
                  ? "-"
                  : AlgorithmProvider.amountOfIterations}{" "}
                steg
              </span>
            </h3>
            <hr className="my-2" />

            <h3 className="flex text-lg font-light">
              tid:{" "}
              <span className="ml-auto mt-auto">
                {AlgorithmProvider.timeElapsed} ms
              </span>
            </h3>
          </article>

          <BarChart/>    
        </section>

        <section className="w-1/2 xl:w-1/3">
          <Calculator />
        </section>
      </section>

    </>
  ) : (
    "välj en algoritm"
  );
};

export default AlgoritmTester;
