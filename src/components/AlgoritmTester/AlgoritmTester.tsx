import React, { useContext } from "react";
import Calculator from "../Calculator/Calculator";
import { useAlgorithm } from "../../Services/AlgorithmProvider";

const AlgoritmTester = () => {
  const AlgorithmProvider = useAlgorithm();

  
  return AlgorithmProvider.selectedAlgorithm !== "" ? (
    <>
      <article className="">
        <h2 className="text-lg text-[#777777] font-light">vald algoritm</h2>
        <h1 className="text-5xl mt-4 mb-3">{AlgorithmProvider.selectedAlgorithm}</h1>
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
              <span className="ml-auto mt-auto"> {AlgorithmProvider.amountOfIterations === 0 ? "-" : AlgorithmProvider.amountOfIterations} steg</span>
            </h3>
            <hr className="my-2" />

            <h3 className="flex text-lg font-light">
              tid: <span className="ml-auto mt-auto">{AlgorithmProvider.timeElapsed} ms</span>
            </h3>
          </article>
        </section>

        <section className="w-1/2 xl:w-1/3">
          <Calculator />
        </section>
      </section>

      <section className="flex flex-col items-center">
        <div className="flex gap-2 ">
        {AlgorithmProvider.array.map((item,index) => (
          <span key={index} className="border-2 border-black px-3 py-2">
            {item}
          </span>
        ) )}
        
        </div>
        <div className="flex gap-2 h-96 mt-2 items-end">
        {AlgorithmProvider.array.map((item,index) => (
          <div key={index} className={`relative w-4 bg-black`} style={{height: `${(item/10)*100 > 100 ? 100 :(item/10)*100}%`}}>
            <span className="absolute top-full">{item}</span>
          </div>
        ) )}
        </div>
        {/* <button onClick={() => sortArray(array)} className="border-2 border-black my-6 px-2 py-1 hover:bg-gray-400 cursor-pointer">sort</button> */}
        <button onClick={() => AlgorithmProvider.bubbleSort(AlgorithmProvider.array)} className="border-2 border-black my-6 px-2 py-1 hover:bg-gray-400 cursor-pointer">sort bubblesort</button>
        <button onClick={() => AlgorithmProvider.selectionSort(AlgorithmProvider.array)} className="border-2 border-black my-6 px-2 py-1 hover:bg-gray-400 cursor-pointer">sort selectionsort</button>
      </section>
    </>
  ) : (
    "välj en algoritm"
  );
};

export default AlgoritmTester;
