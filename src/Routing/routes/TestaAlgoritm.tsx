import React, { useEffect, useState } from "react";
import AlgoritmTester from "../../components/AlgoritmTester/AlgoritmTester";
import AlgorithmProvider, { useAlgorithm } from "../../Services/AlgorithmProvider";
import { selectedAlgorithmTypes } from "../../Types/types";
// import bubblesort from "../../Algorithms/Bubblesort/bubblesort";


const TestaAlgoritm = () => {
  const AlgorithmProvider = useAlgorithm();

  const changeSelectedAlgorithm = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value as selectedAlgorithmTypes
    AlgorithmProvider.setSelectedeAlgorithm(value)
    AlgorithmProvider.resetAlgorithm();
    AlgorithmProvider.shuffleArray();
  }
  return (
    <>
      <section className="mt-48 flex flex-col items-center">
        <article className="w-2/3 xl:w-1/3">
          <h1 className="text-5xl mb-8">Testa en algoritm</h1>
          <p className="px-4">
            Välkommen till vår interaktiva algoritmverkstad! Här kan du leka med
            olika algoritmer och se hur de fungerar visuellt, samtidigt som du
            lär dig något nytt på ett roligt och engagerande sätt.
          </p>
        </article>

        <article className="w-2/3 xl:w-1/3 px-4 mt-7">
          <h2>klicka på knappen för att testa en algoritm</h2>
          <button className="mt-7 ml-10 py-2 px-3 hover:text-white hover:bg-[#A0DABA] rounded-xl hover:border hover:border-black transition-colors ease-in duration-100">
            Testa en Algoritm
          </button>
        </article>
      </section>

      <section className="mt-72 mb-20 flex justify-center">
        <article className="flex items-center">
          <span className="mr-10 font-semibold text-3xl">Välj</span>
          <select
            onChange={(e) => changeSelectedAlgorithm(e)}
            disabled={AlgorithmProvider.isAlgorithmRunning}
            name=""
            id=""
            className="bg-white border border-black rounded-lg h-full px-6 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <option value={selectedAlgorithmTypes.none}>- Välj en algoritm -</option>
            <option value={selectedAlgorithmTypes.bubble}>bubble Sort</option>
            <option value={selectedAlgorithmTypes.selection}>Selection Sort</option>
          </select>
        </article>
      </section>


      <section className="mx-20 mb-40 px-12 py-18 border-dashed border-[#8f8f8f] border-2">
        <AlgoritmTester />

      </section>
      
    </>
  );
};

export default TestaAlgoritm;
