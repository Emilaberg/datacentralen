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
        result = await insertionSort(array);
        break;
      case selectedAlgorithmTypes.heap:
        result = await heapSort(array);
        break;

      case selectedAlgorithmTypes.quick:
        result = await quickSort(array, 0, array.length - 1);
        break;

      case selectedAlgorithmTypes.merge:
        result = await mergeSort(array, 0, array.length - 1);
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

  async function insertionSort(array: number[]) {
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
    return { iterations, timeElapsed: timeDiff };
  }

  async function heapSort(array: number[]) {
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
    return { iterations, timeElapsed: timeDiff };
  }

  async function quickSort(
    arr: number[],
    low: number,
    high: number
  ): Promise<{ iterations: number, timeElapsed: number }> {
    let iterations: number = 0;
    const startTime = Date.now();

    const partition = async (
      array: number[],
      low: number,
      high: number
    ): Promise<number> => {
      const pivot = array[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
          iterations++;
          setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
          updateArray([...array]);
        }
      }

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
      iterations++;
      setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
      updateArray([...array]);

      return i + 1;
    };

    const quickSortRecursive = async (
      array: number[],
      low: number,
      high: number
    ): Promise<void> => {
      if (low < high) {
        const pi = await partition(array, low, high);

        await quickSortRecursive(array, low, pi - 1);
        await quickSortRecursive(array, pi + 1, high);
      }
    };

    await quickSortRecursive(arr, low, high);

    const endTime = Date.now();
    const timeDiff = endTime - startTime - iterations * iterationSpeed;
    setTimeElapsed(timeDiff);
    setTimeComplexity("O(n log n)");
    return { iterations, timeElapsed: timeDiff };
  }

  async function mergeSort(
    arr: number[],
    left: number,
    right: number
  ): Promise<{ iterations: number, timeElapsed: number }> {
    let iterations: number = 0;
    const startTime = Date.now();

    const merge = async (
      array: number[],
      left: number,
      mid: number,
      right: number
    ) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;

      const leftArray = array.slice(left, mid + 1);
      const rightArray = array.slice(mid + 1, right + 1);

      let i = 0,
        j = 0,
        k = left;

      while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
          array[k] = leftArray[i];
          i++;
        } else {
          array[k] = rightArray[j];
          j++;
        }
        k++;
        await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
        iterations++;
        setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
        updateArray([...array]);
      }

      while (i < n1) {
        array[k] = leftArray[i];
        i++;
        k++;
        await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
        iterations++;
        setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
        updateArray([...array]);
      }

      while (j < n2) {
        array[k] = rightArray[j];
        j++;
        k++;
        await new Promise((resolve) => setTimeout(resolve, iterationSpeed));
        iterations++;
        setAmountOfIterations((amountOfIterations) => amountOfIterations + 1);
        updateArray([...array]);
      }
    };

    const mergeSortRecursive = async (
      array: number[],
      left: number,
      right: number
    ): Promise<void> => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);

        await mergeSortRecursive(array, left, mid);
        await mergeSortRecursive(array, mid + 1, right);

        await merge(array, left, mid, right);
      }
    };

    await mergeSortRecursive(arr, left, right);

    const endTime = Date.now();
    const timeDiff = endTime - startTime - iterations * iterationSpeed;
    setTimeElapsed(timeDiff);
    setTimeComplexity("O(n log n)");
    return { iterations, timeElapsed: timeDiff };
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
      quickSort,
      mergeSort,
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
      quickSort,
      mergeSort,
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
