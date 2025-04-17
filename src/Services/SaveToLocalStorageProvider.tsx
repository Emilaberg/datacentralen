import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AlgostorageType, AlgoToLocalStorageType, LocalStorageContextType } from "../Types/types";
import { useAlgorithm } from "./AlgorithmProvider";
import { QueryClient, useQuery } from "@tanstack/react-query";

const localStorageContext = createContext<LocalStorageContextType | undefined>(
  undefined
);

const SaveToLocalStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [resultSaved, setResultSaved] = useState<boolean>(false);

  
  const [test, setTest] = useState("");

  const [savedRuns, setSavedRuns] = useState<Array<AlgoToLocalStorageType> | []>(() => getItem("runs"));

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
 
  function getItem(key: string, index?: number): Array<AlgoToLocalStorageType> | [] {
    const item = localStorage.getItem(key);

    if(!item) return []

    const parsedItem = JSON.parse(item);

    if(index !== undefined) {
      const item = parsedItem[index];

      console.log(item)
      return item;
    }
    
    return parsedItem;
  }

  function clearItem(key:string, value?:any): void {
    localStorage.removeItem(key);
    if(key === "runs") {
      setSavedRuns([]);
    }
  }

  const contextValues = useMemo(() => ({ test, setTest,saveItem, getItem,clearItem, savedRuns,setSavedRuns,resultSaved,setResultSaved }), [test, setTest,saveItem,getItem,clearItem,savedRuns,setSavedRuns,resultSaved,setResultSaved]);

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
