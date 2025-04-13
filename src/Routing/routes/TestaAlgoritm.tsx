import React, { useEffect, useState } from "react";
import AlgoritmTester from "../../components/AlgoritmTester/AlgoritmTester";
import AlgorithmProvider, {
  useAlgorithm,
} from "../../Services/AlgorithmProvider";
import { selectedAlgorithmTypes } from "../../Types/types";
import TableHistory from "../../components/AlgoritmTester/TableHistory";
// import bubblesort from "../../Algorithms/Bubblesort/bubblesort";
import refreshIcon from "../../assets/icons/arrows-clockwise.svg"
import { useLocalStorageProvider } from "../../Services/SaveToLocalStorageProvider";
const TestaAlgoritm = () => {
  const AlgorithmProvider = useAlgorithm();

  const useLocalstorage = useLocalStorageProvider();

  const changeSelectedAlgorithm = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value as selectedAlgorithmTypes;
    AlgorithmProvider.setSelectedeAlgorithm(value);
    AlgorithmProvider.resetAlgorithm();
    AlgorithmProvider.shuffleArray();
  };
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
            <option value={selectedAlgorithmTypes.none}>
              - Välj en algoritm -
            </option>
            <option value={selectedAlgorithmTypes.bubble}>bubble Sort</option>
            <option value={selectedAlgorithmTypes.selection}>
              Selection Sort
            </option>
          </select>
        </article>
      </section>

      <section className="mx-20 mb-40 px-12 py-18 border-dashed border-[#8f8f8f] border-2">
        <AlgoritmTester />
      </section>
      <section className="flex flex-col mx-20 mb-40 py-18">
        <h1 className="text-3xl font-semibold my-8">Tidigare körningar</h1>
        <button onClick={() => useLocalstorage.setSavedRuns(useLocalstorage.getItem("runs"))} className="flex items-center gap-2 ml-auto my-3 hover:underline cursor-pointer"><img className="w-6 hover:animate-spin" src={refreshIcon} alt="" /> uppdatera </button>

        <section className="px-12 border-dashed border-[#8f8f8f] border-2">
          <TableHistory array={useLocalstorage.savedRuns}/>
        </section>
        <button className="bg-[#62A958] disabled:opacity-25 text-white px-6 py-2 rounded-xl my-5 ml-auto">Kör igen</button>
      </section>
    </>
  );
};

export default TestaAlgoritm;
