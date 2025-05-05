import React, { createContext, useContext, useMemo, useState } from "react";
import {
  AlgorithmContextType,
  AlgorithmProviderProps,
  iterationSpeedTypes,
  selectedAlgorithmTypes,
} from "../Types/types";
import shuffle from "../tools/Fisher-yates-shuffle/shuffle";
import { SavedRun } from "../Types/types";

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

  const [savedRuns, setSavedRuns] = useState<SavedRun[]>(() => {
    const saved = localStorage.getItem("savedRuns");
    if (saved) {
      return JSON.parse(saved) as SavedRun[];
    }
    return [];
  });

  //Laddar från localstorage vid uppstart
  React.useEffect(() => {
    const saved = localStorage.getItem("savedRuns");
    if (saved) {
      setSavedRuns(JSON.parse(saved));
    }
  }, []);

  //Sparar till localstorage när savedRuns ändras
  React.useEffect(() => {
    localStorage.setItem("savedRuns", JSON.stringify(savedRuns));
  }, [savedRuns]);

  function saveCurrentRun(
    originalArray: number[],
    sortedArray: number[],
    iterations: number,
    elapsedTime: number
  ) {
    const newRun: SavedRun = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      originalArray: [...originalArray],
      sortedArray: [...sortedArray],
      selectedAlgorithm,
      timeElapsed: elapsedTime,
      amountOfIterations: iterations,
      timeComplexity,
    };
    setSavedRuns((prev) => [...prev, newRun]);
  }
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
  async function countingSort(arr: number[]) {
    let iterations: number = 0;
    if (arr.length === 0) return { iterations, timeElapsed: 0 };

    const startTime = Date.now();

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;

    const count = Array(range).fill(0);

    for (let i = 0; i < arr.length; i++) {
      count[arr[i] - min]++;
    }

    let index = 0;
    for (let i = 0; i < range; i++) {
      while (count[i] > 0) {
        arr[index++] = i + min;
        await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
        setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
        updateArray([...arr]);
        count[i]--;
        iterations++;
      }
    }

    const endTime = Date.now();
    const timeDiff = endTime - startTime - iterations * iterationSpeed;
    setTimeElapsed(timeDiff);
    setTimeComplexity("O(n + k)");
    return { iterations, timeElapsed: timeDiff };
  }
  async function shellSort(arr: number[]) {
    let iterations: number = 0;
    const n = arr.length;
    const startTime = Date.now();

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j;
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          arr[j] = arr[j - gap];
        }
        arr[j] = temp;
        await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
        iterations++;
        setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
        updateArray([...arr]);
      }
    }

    const endTime = Date.now();
    const timeDiff = endTime - startTime - iterations * iterationSpeed;
    setTimeElapsed(timeDiff);
    setTimeComplexity("Varierar mellan O(n log n) och O(n²)");
    return { iterations, timeElapsed: timeDiff };
  }

  /**
   * starts algorithm and sets locked variables
   * @param arr
   */
  async function start() {
    setIsAlgorithmRunning(true);
    const originalArrayCopy = [...array];
    let result: { iterations: number; timeElapsed: number } = {
      iterations: 0,
      timeElapsed: 0,
    };
    switch (selectedAlgorithm) {

      case selectedAlgorithmTypes.bubble:
        result = await bubbleSort(array);
        break;

      case selectedAlgorithmTypes.selection:
        result = await selectionSort(array);
        break;
      case selectedAlgorithmTypes.counting:
        result = await countingSort(array);
        break;
      case selectedAlgorithmTypes.shell:
        result = await shellSort(array);
        break;

      case selectedAlgorithmTypes.insertion:
        await insertionSort(array);
        break;
      case selectedAlgorithmTypes.heap:
        await heapSort(array);
        break;

      case selectedAlgorithmTypes.none:
        throw new Error("no algorithm chosen");

      default:
        alert("run selected algo could find matching name");
        break;
    }
    setIsAlgorithmRunning(false);

    saveCurrentRun(
      originalArrayCopy,
      [...array],
      result.iterations,
      result.timeElapsed
    );
  }

  /**
   *  shuffles @param array with fisher-yates-shuffle and updates the current array
   */
  function shuffleArray(): void {
    if (amountOfIterations > 0) setAmountOfIterations(0);

    const shuffledArray = shuffle(array);

    updateArray([...shuffledArray]);
  }
  /**
   * sorts the given array by bubble sort, and updates the variable array:s state for every iteration
   * logs the time before and after the forloop and calculates the difference, and subtracts the result by the iterationspeed times iterations
   * @param arr array som ska sorteras
   */
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
    return { iterations, timeElapsed: timeDiff };
  }
  /**
   * sorts the given array by selection sort, and updates the variable array:s state for every iteration
   * logs the time before and after the forloop and calculates the difference, and subtracts the result by the iterationspeed times iterations
   * @param arr array som ska sorteras
   */
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
    return { iterations, timeElapsed: timeDiff };
  }
  function clearHistory() {
    setSavedRuns([]);
    localStorage.removeItem("savedRuns");
  }


  async function insertionSort(array: number[]){

    let iterations: number = 0;
    const len = array.length;
    const startTime = Date.now();

    for (let i = 1; i < len; i++) {
      await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
      let key = array[i];
      let j = i - 1;

      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = key;

      iterations++;
      setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
      updateArray([...array]);
    }

    const endTime = Date.now();
    const timeDiff = endTime - startTime - iterations * iterationSpeed;
    setTimeElapsed(timeDiff);
    setTimeComplexity("O(n²)");
  }

  async function heapSort(array : number[]){
    let iterations: number = 0;
    const len = array.length;
    const startTime = Date.now();

    const heapify = async (arr: number[], n: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) {
      largest = left;
      }

      if (right < n && arr[right] > arr[largest]) {
      largest = right;
      }

      if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      await heapify(arr, n, largest);
      }
    };

    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
      await heapify(array, len, i);
      iterations++;
      setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
      updateArray([...array]);
    }

    for (let i = len - 1; i > 0; i--) {
      await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
      [array[0], array[i]] = [array[i], array[0]];
      await heapify(array, i, 0);
      iterations++;
      setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
      updateArray([...array]);
    }

    const endTime = Date.now();
    const timeDiff = endTime - startTime - iterations * iterationSpeed;
    setTimeElapsed(timeDiff);
    setTimeComplexity("O(n log n)");
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
      savedRuns,
      setSavedRuns,
      saveCurrentRun,
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
      insertionSort,
      selectionSort,
      resetAlgorithm,
      heapSort,
      start,
      shuffleArray,
      clearHistory,
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
      savedRuns,
      setSavedRuns,
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
      insertionSort,
      resetAlgorithm,
      heapSort,
      start,
      shuffleArray,
      clearHistory,
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
