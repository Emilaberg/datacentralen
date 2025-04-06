import React, { useEffect, useState } from "react";
import { useAlgorithm } from "../../Services/AlgorithmProvider";
import BarChart from "./BarChart";
import shuffle from "../../tools/Fisher-yates-shuffle/shuffle";
import {
  MAXIMUM_GENERATED_ARRAY_LENGTH,
  MINIMUM_ARRAY_VALUE_RANGE,
  MINIMUM_COUNT,
} from "../../Types/types";

const ArrayBuilderModal = () => {
  const [randomValue, setRandomValue] = useState<number>(10);
  const [arraySize, setArraySize] = useState<number>(
    MAXIMUM_GENERATED_ARRAY_LENGTH
  );

  const [previewArray, setPreviewArray] = useState<number[]>([]);

  const [minValue, setMinValue] = useState<number>(MINIMUM_COUNT);
  const [maxValue, setMaxValue] = useState<number>(MINIMUM_ARRAY_VALUE_RANGE);

  const AlgorithmProvider = useAlgorithm();

  //   useEffect(() => {
  //     set
  //   },[]);

  const randomIntArrayInRange = (
    min: number,
    max: number,
    n: number = MINIMUM_ARRAY_VALUE_RANGE
  ) => {
    return Array.from(
      { length: n },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  };

  const shuffleArray = () => {
    if (previewArray.length === 0) return;

    const shuffledArray = shuffle(previewArray);

    setPreviewArray([...shuffledArray]);
  };

  const generateArray = () => {
    const randomArray = randomIntArrayInRange(minValue, maxValue, arraySize);

    setPreviewArray([...randomArray]);
  };

  const useArray = () => {
    AlgorithmProvider.updateArray([...previewArray]);
    AlgorithmProvider.setShowModal(false);
  };

  return (
    <div
      onClick={() => AlgorithmProvider.setShowModal(false)}
      className={`absolute ${
        AlgorithmProvider.showModal ? "fixed" : "hidden"
      } w-full h-full flex justify-center items-center z-10 bg-black/50`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 px-5 py-2 bg-amber-50 border-2 rounded-lg"
      >
        <article>
          <div>
            <label htmlFor="">Allow negative values</label>
            <input type="checkbox" name="" id="" />
          </div>
        </article>

        <article>
          <div>
            <input
              min={0}
              max={20}
              step={5}
              onChange={shuffleArray}
              type="range"
              name=""
              id=""
            />
            <label htmlFor=""> Randomize order</label>
          </div>
          <div>
            <input
              value={arraySize}
              min={MINIMUM_COUNT}
              max={MAXIMUM_GENERATED_ARRAY_LENGTH}
              onChange={(e) => setArraySize(e.target.value)}
              type="range"
              name=""
              id=""
            />
            <label htmlFor=""> {arraySize} numbers</label>
          </div>
          <div>
            <input
              value={MINIMUM_ARRAY_VALUE_RANGE}
              min={MINIMUM_ARRAY_VALUE_RANGE}
              max={1000}
              onChange={(e) => setMaxValue(parseInt(e.target.value))}
              type="range"
              name=""
              id=""
            />
            <label htmlFor=""> {maxValue} max value 0-1000</label>
          </div>
        </article>
        <div className="flex w-full justify-center">
          <button onClick={generateArray}>Generate Random Array</button>
        </div>

        <button onClick={useArray}>use</button>

        <BarChart array={previewArray} />
      </section>
    </div>
  );
};

export default ArrayBuilderModal;
