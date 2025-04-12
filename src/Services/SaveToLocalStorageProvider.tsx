import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AlgostorageType, AlgoToLocalStorageType, LocalStorageContextType } from "../Types/types";
import { useAlgorithm } from "./AlgorithmProvider";

const localStorageContext = createContext<LocalStorageContextType | undefined>(
  undefined
);

const SaveToLocalStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [test, setTest] = useState("");

  const AlgorithmProvider = useAlgorithm();

  //sets run if no runs object in storage
  useEffect(() => {
    const runs = getItem("runs")

    if(runs) return;

    saveItem("runs",[{}]);
  },[]);
  
  function saveItem(key:string, item: AlgoToLocalStorageType | Array<object>) {
    if(key=== "runs") {
        const runs = getItem(key) as AlgostorageType;
        if(!runs) {
            localStorage.setItem(key,JSON.stringify([item]));
            return;
        }
        runs.push(item as AlgoToLocalStorageType);

        localStorage.setItem(key,JSON.stringify(runs));
        return;
    }
    localStorage.setItem(key,JSON.stringify(item));
  }


  function saveToLocal() {
    console.log(AlgorithmProvider);
    // const entityToSave: AlgoToLocalStorageType = {
    //     name: AlgorithmProvider.selectedAlgorithm,
    //     iterations: AlgorithmProvider.amountOfIterations,
    //     timeElapsed: AlgorithmProvider.timeElapsed,
    //     iterationSpeed: AlgorithmProvider.iterationSpeed,
    //     timeComplexity: AlgorithmProvider.timeComplexity
    //   };
  
    //   saveItem("runs",entityToSave);
  }

 
  function getItem(key: string): unknown {
    const item = localStorage.getItem(key);

    if(!item) return null

    const parsedItem = JSON.parse(item);

    return parsedItem;
  }

  const contextValues = useMemo(() => ({ test, setTest,saveItem, getItem,saveToLocal }), [test, setTest,saveItem,getItem,saveToLocal]);

  return (
    <localStorageContext.Provider value={contextValues}>
      {children}
    </localStorageContext.Provider>
  );
};

export const useLocalStorageProvider = () => {
  const context = useContext(localStorageContext);

  if (!context) {
    throw new Error(
      "useLocalStorage needs to be used within an localStorageProvider"
    );
  }
  return context;
};

export default SaveToLocalStorageProvider;
