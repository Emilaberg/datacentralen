import { ReactNode } from "react";

export const MINIMUM_COUNT = 4;

export const MAXIMUM_GENERATED_ARRAY_LENGTH = 20;
export const MINIMUM_ARRAY_VALUE_RANGE = 10;
export const MAXIMUM_ARRAY_VALUE_RANGE = 1000;
export type LoginType = {
  email: string;
  password: string;
  remember_me?: boolean | undefined;
};

export interface ProviderProps {
  user: string | null;
  token: string;
  login(data: LoginType): void;
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
  bubble = "bubble",
  selection = "selection",
  none = "none",
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

  bubbleSort(arr: number[]): Promise<void>;
  selectionSort(arr: number[]): Promise<void>;

  resetAlgorithm(resetSpeed?: boolean): void;
  start(): void;
  shuffleArray(): void;
}

export interface AlgorithmProviderProps {
  children: ReactNode;
}
