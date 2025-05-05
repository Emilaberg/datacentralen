import { ReactNode } from "react";

export const MINIMUM_COUNT = 4;

export const MAXIMUM_GENERATED_ARRAY_LENGTH = 20;
export const MINIMUM_ARRAY_VALUE_RANGE = 10;
export const MAXIMUM_ARRAY_VALUE_RANGE = 1000;

export const ARTICLE_AMOUNT = 4;
export type LoginType = {
  username: string;
  password: string;
  remember_me?: boolean;
  token: string;
};

export interface ProviderProps {
  token: string;
  authenticate(username: string, password: string): void;
  logout(): void;
}

export interface ArticleProps {
  id: number;
  title: string;
  author: string;
  posted: Date;
  lastEdited: Date;
  likes: number;
  content: string;
  type: string;
  colorCodeOne?: string;
  colorCodeTwo?: string;
}

export interface ArticleDTOProps {
  id: number;
  title: string;
  description: string;
  type: "Sorteringsalgoritm" | "Datastruktur";
}

export interface ArticleCardDTOProps {
  id: number;
  title: string;
  description: string;
  type: string;
  colorCodeOne?: string;
  colorCodeTwo?: string;
}
export enum iterationSpeedTypes {
  FASTER = 100,
  STANDARD = 250,
  SLOWER = 500,
  SlOWEST = 1000,
}

export enum selectedAlgorithmTypes {
  bubble = "Bubble Sort",
  selection = "Selection Sort",
  counting = "counting",
  shell = "shell",
  none = "none",
}

export interface AlgoritmSubMenyProps {
  algorithms: selectedAlgorithmTypes[];
  description: string;
}

export interface AlgorithmContextType {
  array: number[];
  defaultArray: number[];
  selectedAlgorithm: selectedAlgorithmTypes;
  timeComplexity: string | undefined;
  amountOfIterations: number;
  iterationSpeed: number | null;
  timeElapsed: number;
  previewInput: string;
  isAlgorithmRunning: boolean;

  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAlgorithmRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedeAlgorithm: React.Dispatch<
    React.SetStateAction<selectedAlgorithmTypes>
  >;
  setPreviewInput: React.Dispatch<React.SetStateAction<string>>;
  setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
  setTimeComplexity: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAmountOfIterations: React.Dispatch<React.SetStateAction<number>>;
  setIterationSpeed: React.Dispatch<React.SetStateAction<iterationSpeedTypes>>;
  updateArray: React.Dispatch<React.SetStateAction<number[]>>;
  setSavedRuns: React.Dispatch<React.SetStateAction<SavedRun[]>>;

  bubbleSort(
    arr: number[]
  ): Promise<{ iterations: number; timeElapsed: number }>;
  selectionSort(
    arr: number[]
  ): Promise<{ iterations: number; timeElapsed: number }>;

  resetAlgorithm(resetSpeed?: boolean): void;
  start(): void;
  shuffleArray(): void;
  savedRuns: SavedRun[];
  saveCurrentRun: (
    originalArray: number[],
    sortedArray: number[],
    iterations: number,
    elapsedTime: number
  ) => void;
  clearHistory: () => void;
}
export interface SavedRun {
  id: string;
  timestamp: number;
  originalArray: number[];
  sortedArray: number[];
  selectedAlgorithm: selectedAlgorithmTypes;
  timeElapsed: number;
  amountOfIterations: number;
  timeComplexity: string | undefined;
}

export interface AlgorithmProviderProps {
  children: ReactNode;
}
