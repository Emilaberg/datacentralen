import React, { createContext, useContext, useMemo, useState } from "react";
import {
  AlgorithmContextType,
  AlgorithmProviderProps,
  iterationSpeedTypes,
  selectedAlgorithmTypes,
} from "../Types/types";
import shuffle from "../tools/Fisher-yates-shuffle/shuffle";

const AlgorithmContext = createContext<AlgorithmContextType | undefined>(
  undefined
);

const AlgorithmProvider = ({ children }: AlgorithmProviderProps) => {
  const [timeComplexity, setTimeComplexity] = useState<string | undefined>("");

  const [amountOfIterations, setAmountOfIterations] = useState<number>(0);

  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectedAlgorithm, setSelectedeAlgorithm] = useState(
    selectedAlgorithmTypes.none
  );
  const [iterationSpeed, setIterationSpeed] = useState<iterationSpeedTypes>(
    iterationSpeedTypes.STANDARD
  );

  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const [previewInput, setPreviewInput] = useState<string>("");

  const [array, updateArray] = useState<number[] | []>([]);
  
  const [defaultArray] = useState([
    9, 8, 7, 6, 5, 4, 3, 2, 1, 23, 4, 5, 75, 7, 3, 356, 23, 46, 743, 2,
  ]);

  /**
   * resets
   * tidkomplexitet,all metrics,hastighet
   */
  const resetAlgorithm = (resetSpeed: boolean) => {
    setTimeComplexity("");
    setAmountOfIterations(0);
    setTimeElapsed(0);
    setPreviewInput("");
    if (resetSpeed) setIterationSpeed(iterationSpeedTypes.STANDARD);
  };

  /**
   * starts algorithm and sets locked variables
   * @param arr
   */
  async function start() {
    setIsAlgorithmRunning(true)
    switch (selectedAlgorithm) {
      case selectedAlgorithmTypes.bubble:
        await bubbleSort(array);
        break;
      case selectedAlgorithmTypes.selection:
        await selectionSort(array);
        break;
      case selectedAlgorithmTypes.none:
        throw new Error("no algorithm chosen");
      default:
        alert("run selected algo could find matching name");
        break;
    }
    setIsAlgorithmRunning(false);
  }

  function shuffleArray(): void {
    if(amountOfIterations > 0) setAmountOfIterations(0);
    
    const shuffledArray = shuffle(array);

    updateArray([...shuffledArray]);
  }
  async function bubbleSort(arr: number[]) {
      let iterations: number = 0;
      const len = arr.length;
      const startTime = Date.now();
      for (let i = 0; i < len; i++) {
        await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
  
        for (let j = 0; j < len; j++) {

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
        setAmountOfIterations((amountOfIterations) => amountOfIterations + 1); // addera iterationer för ui
        iterations++;
  
        updateArray([...arr]); //uppdatera arrayen för varje iteration
      }
      const endTime = Date.now();
      const timeDiff = endTime - startTime - iterations * iterationSpeed;
      setTimeElapsed(timeDiff);
      setTimeComplexity("O(n²)");

  }

  async function selectionSort(arr: number[]) {
    let iterations: number = 0;
    const n = arr.length;

    // setIsAlgorithmRunning(true);
    const startTime = Date.now();
    for (let i = 0; i < n - 1; i++) {
      await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
      let minIndex = i;
      // Find the index of the minimum element in the unsorted part
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      // Swap the found minimum element with the first unsorted element
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      iterations++;
      setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
      updateArray([...arr]);
    }
    // setIsAlgorithmRunning(false);
    const endTime = Date.now();

    const timeDiff = endTime - startTime - iterations * iterationSpeed;
    setTimeElapsed(timeDiff);
    setTimeComplexity("O(n²)");
  }

  const ContextValues = useMemo(
    () => ({
      array,
      defaultArray,
      selectedAlgorithm,
      timeComplexity,
      amountOfIterations,
      iterationSpeed,
      timeElapsed,
      previewInput,
      isAlgorithmRunning,
      showModal,
      setShowModal,
      setIsAlgorithmRunning,
      setSelectedeAlgorithm,
      setPreviewInput,
      setTimeElapsed,
      setTimeComplexity,
      setAmountOfIterations,
      setIterationSpeed,
      updateArray,
      bubbleSort,
      selectionSort,
      resetAlgorithm,
      start,
      shuffleArray,
    }),
    [
      array,
      defaultArray,
      selectedAlgorithm,
      timeComplexity,
      amountOfIterations,
      iterationSpeed,
      timeElapsed,
      previewInput,
      isAlgorithmRunning,
      showModal,
      setShowModal,
      setIsAlgorithmRunning,
      setSelectedeAlgorithm,
      setPreviewInput,
      setTimeElapsed,
      setTimeComplexity,
      setAmountOfIterations,
      setIterationSpeed,
      updateArray,
      bubbleSort,
      selectionSort,
      resetAlgorithm,
      start,
      shuffleArray,
    ]
  );

  return (
    <AlgorithmContext.Provider value={ContextValues}>
      {children}
    </AlgorithmContext.Provider>
  );
};

export const useAlgorithm = () => {
  const context = useContext(AlgorithmContext);

  if (!context) {
    throw new Error(
      "useAlgorithm needs to be used within an algorithmProvider"
    );
  }
  return context;
};

export default AlgorithmProvider;
