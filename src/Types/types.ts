import { ReactNode } from "react";

export type LoginType = {
    email: string;
    password: string;
    remember_me?: boolean | undefined;
}



export interface ProviderProps {
    user:  string | null,
    token:  string,
    login (data: LoginType ): void,
    logout() :void,
}

export interface ArticleProps {
    id: number,
    title: string,
    author: string,
    posted: Date,
    lastEdited: Date,
    likes: number,
    content: string
}

export interface ArticleDTOProps {
    id: number,
    title: string,
    description: string,
}
export type iterationSpeedTypes = 1000 | 500 | 250 | 100;

export type selectedAlgorithmTypes = "bubble" | "insertion" | "none";

export interface AlgorithmContextType {
    array: number[],
    defaultArray: number[],
    selectedAlgorithm: selectedAlgorithmTypes,
    timeComplexity: string | undefined,
    amountOfIterations: number ,
    iterationSpeed: number | null,
    timeElapsed: number,
    previewInput: string,
    setPreviewInput: React.Dispatch<React.SetStateAction<string>>,
    setTimeElapsed: React.Dispatch<React.SetStateAction<number>>,
    setTimeComplexity: React.Dispatch<React.SetStateAction<string | undefined>>,
    setAmountOfIterations: React.Dispatch<React.SetStateAction<number>>,
    setIterationSpeed: React.Dispatch<React.SetStateAction<iterationSpeedTypes>>,
    updateArray: React.Dispatch<React.SetStateAction<number[]>>,
    
    bubbleSort(arr:number[]): Promise<void>,
    selectionSort(arr:number[]): Promise<void>,
}

export interface AlgorithmProviderProps {
    children: ReactNode,
    selectedAlgorithm: "bubble" | "insertion" | "none";
}