import React, { useState } from "react";
import { useAlgorithm } from "../../Services/AlgorithmProvider";
import { iterationSpeedTypes } from "../../Types/types";
import Numpad from "./Numpad";
import CalculatorScreen from "./CalculatorScreen";

const Calculator = () => {
  const AlgorithmProvider = useAlgorithm();

  const [activeSpeed, setActiveSpeed] = useState<iterationSpeedTypes>(
    iterationSpeedTypes.STANDARD
  );

  const changeSpeed = (speed: iterationSpeedTypes) => {
    setActiveSpeed(speed);
    AlgorithmProvider.setIterationSpeed(speed);
  };
  return (
    <section className="flex flex-col items-center my-2 gap-5">
      <section className="w-full xl:w-[500px] px-10">
        <div className="bg-gray-200 flex flex-wrap justify-between">
          <button
            onClick={() => AlgorithmProvider.setShowModal(true)}
            className="border-2 px-2 rounded-lg cursor-pointer hover:bg-gray-100 active:bg-gray-300"
          >
            Array builder
          </button>
          <div className="flex justify-end gap-2 ">
            <h2 className="text-[#777777]">hastighet:</h2>
            <button
              type="button"
              disabled={AlgorithmProvider.isAlgorithmRunning}
              onClick={() => changeSpeed(iterationSpeedTypes.SlOWEST)}
              className={`hover:underline active:text-black cursor-pointer ${
                AlgorithmProvider.iterationSpeed === iterationSpeedTypes.SlOWEST
                  ? "text-black font-medium"
                  : "text-[#777777] font-thin"
              } text-lg disabled:opacity-20 disabled:cursor-not-allowed`}
            >
              1x
            </button>
            <button
              disabled={AlgorithmProvider.isAlgorithmRunning}
              onClick={() => changeSpeed(iterationSpeedTypes.SLOWER)}
              type="button"
              className={`hover:underline active:text-black cursor-pointer ${
                AlgorithmProvider.iterationSpeed === iterationSpeedTypes.SLOWER
                  ? "text-black font-medium"
                  : "text-[#777777] font-thin"
              } text-lg disabled:opacity-20 disabled:cursor-not-allowed`}
            >
              2x
            </button>
            <button
              type="button"
              disabled={AlgorithmProvider.isAlgorithmRunning}
              onClick={() => changeSpeed(iterationSpeedTypes.STANDARD)}
              className={`hover:underline active:text-black cursor-pointer ${
                AlgorithmProvider.iterationSpeed ===
                iterationSpeedTypes.STANDARD
                  ? "text-black font-medium"
                  : "text-[#777777] font-thin"
              } text-lg disabled:opacity-20 disabled:cursor-not-allowed`}
            >
              3x
            </button>
            <button
              type="button"
              disabled={AlgorithmProvider.isAlgorithmRunning}
              onClick={() => changeSpeed(iterationSpeedTypes.FASTER)}
              className={`hover:underline active:text-black cursor-pointer ${
                AlgorithmProvider.iterationSpeed === iterationSpeedTypes.FASTER
                  ? "text-black font-medium"
                  : "text-[#777777] font-thin"
              } text-lg disabled:opacity-20 disabled:cursor-not-allowed`}
            >
              4x
            </button>
          </div>
        </div>
        {/* screen */}
        <CalculatorScreen />
      </section>
      {/* numpad */}
      <Numpad />
    </section>
  );
};

export default Calculator;
