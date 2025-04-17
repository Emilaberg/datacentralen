import React, { useEffect, useState } from "react";
import AlgoritmTester from "../../components/AlgoritmTester/AlgoritmTester";
import AlgorithmProvider, {
  useAlgorithm,
} from "../../Services/AlgorithmProvider";
import { AlgoToLocalStorageType, selectedAlgorithmTypes } from "../../Types/types";
import TableHistory from "../../components/AlgoritmTester/TableHistory";
// import bubblesort from "../../Algorithms/Bubblesort/bubblesort";
import refreshIcon from "../../assets/icons/arrows-clockwise.svg"
import { useLocalStorageProvider } from "../../Services/SaveToLocalStorageProvider";
const TestaAlgoritm = () => {
  const [history,setHistory] = useState<AlgoToLocalStorageType | null>(null);

  const AlgorithmProvider = useAlgorithm();

  const useLocalstorage = useLocalStorageProvider();

  const changeSelectedAlgorithm = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value as selectedAlgorithmTypes;
    AlgorithmProvider.setSelectedeAlgorithm(value);
    AlgorithmProvider.resetAlgorithm();
    AlgorithmProvider.shuffleArray();
  };


  const handleSelect = (e: React.MouseEvent, i:number) => {
    

    const item:unknown = useLocalstorage.getItem("runs",i);

    const selected = item as AlgoToLocalStorageType;

    setHistory(selected);

  }

  const load = () => {
    if(history === null) return;

    AlgorithmProvider.setSelectedeAlgorithm(history.name);
    AlgorithmProvider.updateArray(history.array);
  }
  function clearItem(): void {
    setHistory(null);
    useLocalstorage.clearItem("runs")
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
        <div className="ml-auto flex gap-2">
        <button disabled={useLocalstorage.savedRuns.length === 0} onClick={clearItem} className="disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 my-3 hover:underline cursor-pointer active:text-gray-600">X rensa lista </button>
        <button onClick={() => useLocalstorage.setSavedRuns(useLocalstorage.getItem("runs"))} className="flex items-center gap-2 my-3 hover:underline cursor-pointer active:text-gray-600"><img className="w-6 hover:animate-spin" src={refreshIcon} alt="" /> uppdatera </button>

        </div>
        <section className="px-12 border-dashed border-[#8f8f8f] border-2">
          <TableHistory handleSelect={handleSelect} array={useLocalstorage.savedRuns}/>
        </section>
        <button disabled={!!!history} onClick={load} className="disabled:cursor-not-allowed cursor-pointer bg-[#62A958] active:bg-[#5b9e52] disabled:opacity-20 text-white px-6 py-2 rounded-xl my-5 ml-auto">Ladda körning</button>
      </section>
    </>
  );
};

export default TestaAlgoritm;
