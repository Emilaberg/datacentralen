import React from "react";
import { useAlgorithm } from "../../Services/AlgorithmProvider";
import shuffle from "../../tools/Fisher-yates-shuffle/shuffle";
import { MINIMUM_COUNT, selectedAlgorithmTypes } from "../../Types/types";

const Numpad = () => {
  const AlgorithmProvider = useAlgorithm();

  function trigger(arg0: string | number): void {}

  const setPreviewInput = (arg: string) => {
    AlgorithmProvider.setPreviewInput((e) => e + arg);
  };

  const popLastNumber = () => {
    const input = AlgorithmProvider.previewInput;

    //remove added number
    if (input === "") {
        const arrayInput = AlgorithmProvider.array;
        arrayInput.pop();

      AlgorithmProvider.updateArray([...arrayInput])
      return;
    }
    const x = input.split("");
    x.pop();

    const joined = x.join("");

    AlgorithmProvider.setPreviewInput(joined);
  };

  const invertNumber = () => {
    const input = AlgorithmProvider.previewInput;
    if(input === "") return
    const x = parseInt(input);
    const opposite = x - x * 2;

    AlgorithmProvider.setPreviewInput(opposite.toString());
  };

  const saveNumberToArray = () => {
    const inputToSave = AlgorithmProvider.previewInput;
    if(inputToSave === "") return;

    const array = AlgorithmProvider.array;
    const parsedInput = parseInt(inputToSave);
    array.push(parsedInput);

    AlgorithmProvider.updateArray([...array]);
    AlgorithmProvider.setPreviewInput("");
  }

  const runSelectedAlgorithm = () => {
    AlgorithmProvider.resetAlgorithm(false);

    AlgorithmProvider.start();
  }

  const reset = () => {
    AlgorithmProvider.updateArray([...AlgorithmProvider.defaultArray])
    AlgorithmProvider.resetAlgorithm(false);
  }
  
  const clear = () => {
    AlgorithmProvider.updateArray([]);
    AlgorithmProvider.resetAlgorithm(false);
  }

  function shuffleArray(): void {
    const shuffledArray = shuffle(AlgorithmProvider.array);

    AlgorithmProvider.updateArray([...shuffledArray]);
  }

  return (
    <>
      <article>
        <div className="mb-2 w-72 flex justify-between text-[#777777]">
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={clear}
            className="hover:underline cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          >
            rensa
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={reset}
            className="hover:underline cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          >
            reset
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={shuffleArray}
            className="hover:underline cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          >
            slumpa
          </button>
        </div>
        <div className="w-72 grid grid-cols-3 grid-rows-4 gap-3 justify-items-center">
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("7")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            7
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("8")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            8
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("9")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            9
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("4")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            4
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("5")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            5
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("6")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            6
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("1")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            1
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("2")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            2
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("3")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            3
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={invertNumber}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            +/-
          </button>
          <button
            type="button"
            disabled={AlgorithmProvider.isAlgorithmRunning}
            onClick={() => setPreviewInput("0")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            0
          </button>
          <button
            type="button"
            disabled={true} // not implemented
            onClick={() => trigger("comma")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg disabled:opacity-20 disabled:cursor-not-allowed"
          >
            ,
          </button>
        </div>
      </article>
      <article className="w-72 grid grid-cols-3 gap-3 mt-3 justify-items-center">
        <button
          type="button"
          onClick={saveNumberToArray}
          disabled={AlgorithmProvider.previewInput === "" || AlgorithmProvider.isAlgorithmRunning ? true : false}
          className="cursor-pointer hover:bg-[#f6aa54] w-18 h-16 rounded-lg text-lg text-white  bg-[#F9B66B] disabled:bg-[#f6aa54]/20 disabled:cursor-not-allowed"
        >
          spara
        </button>
        <button
          type="button"
          disabled={AlgorithmProvider.array.length < MINIMUM_COUNT || AlgorithmProvider.isAlgorithmRunning ? true : false}
          onClick={runSelectedAlgorithm}
          className="cursor-pointer hover:bg-[#50a045] w-18 h-16 rounded-lg text-2xl text-white font-semibold bg-[#62A958] disabled:bg-[#50a045]/20 disabled:cursor-not-allowed"
        >
          GO
        </button>
        <button
          type="button"
          disabled={AlgorithmProvider.array.length === 0 || AlgorithmProvider.isAlgorithmRunning ? true : false}
          onClick={popLastNumber}
          className="cursor-pointer hover:bg-[#da4f47] w-18 h-16 rounded-lg text-lg bg-[#e0655e] text-white disabled:bg-[#da4f47]/20 disabled:cursor-not-allowed"
        >
          radera
        </button>
      </article>
    </>
  );
};

export default Numpad;
