import React, { useContext } from "react";
import Calculator from "../Calculator/Calculator";
import { useAlgorithm } from "../../Services/AlgorithmProvider";
import { AlgoToLocalStorageType, selectedAlgorithmTypes } from "../../Types/types";
import BarChart from "./BarChart";
import { useLocalStorageProvider } from "../../Services/SaveToLocalStorageProvider";

const AlgoritmTester = () => {
  const AlgorithmProvider = useAlgorithm();
  const useLocalstorage = useLocalStorageProvider();
  const saveResult = () => {

    const entityToSave: AlgoToLocalStorageType = {
        name: AlgorithmProvider.selectedAlgorithm,
        iterations: AlgorithmProvider.amountOfIterations,
        timeElapsed: AlgorithmProvider.timeElapsed,
        iterationSpeed: AlgorithmProvider.iterationSpeed,
        timeComplexity: AlgorithmProvider.timeComplexity
      };
  
      const saved = useLocalstorage.savedRuns;
      saved?.push(entityToSave);
      useLocalstorage.setSavedRuns(...[saved]);

      useLocalstorage.saveItem("runs",entityToSave);
  }
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
              <button className="border-2 rounded-lg hover:bg-gray-200 cursor-pointer" onClick={saveResult}>save result</button>
          </article>

          <BarChart array={AlgorithmProvider.array}/>    
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
