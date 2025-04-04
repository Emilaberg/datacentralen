import React from "react";
import { useAlgorithm } from "../../Services/AlgorithmProvider";

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
    }
    const x = input.split("");
    x.pop();

    const joined = x.join("");

    AlgorithmProvider.setPreviewInput(joined);
  };

  const invertNumber = () => {
    const input = AlgorithmProvider.previewInput;
    const x = parseInt(input);
    const opposite = x - x * 2;

    AlgorithmProvider.setPreviewInput(opposite.toString());
  };

  const saveNumberToArray = () => {
    const array = AlgorithmProvider.array;
    const inputToSave = AlgorithmProvider.previewInput;
    const parsedInput = parseInt(inputToSave);
    array.push(parsedInput);

    AlgorithmProvider.updateArray([...array]);
  }

  const runSelectedAlgorithm = () => {
    switch (AlgorithmProvider.selectedAlgorithm) {
        case "bubble":
            AlgorithmProvider.bubbleSort(AlgorithmProvider.array);
            break;  
        case "insertion":
            AlgorithmProvider.bubbleSort(AlgorithmProvider.array);
            break;  
        case "none":
            throw new Error("no algorithm chosen");
        default:
            alert("run selected algo could find matching name")
            break;
    }
  }

  const reset = () => {
    AlgorithmProvider.updateArray([...AlgorithmProvider.defaultArray])
  }
  
  return (
    <>
      <article>
        <div className="mb-2 w-72 flex justify-between text-[#777777]">
          <button
            type="button"
            onClick={() => AlgorithmProvider.updateArray([])}
            className="hover:underline cursor-pointer"
          >
            rensa
          </button>
          <button
            type="button"
            onClick={reset}
            className="hover:underline cursor-pointer"
          >
            reset / slumpa
          </button>
        </div>
        <div className="w-72 grid grid-cols-3 grid-rows-4 gap-3 justify-items-center">
          <button
            type="button"
            onClick={() => setPreviewInput("7")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("8")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("9")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("4")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("5")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("6")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("1")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("2")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("3")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            3
          </button>
          <button
            type="button"
            onClick={invertNumber}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            +/-
          </button>
          <button
            type="button"
            onClick={() => setPreviewInput("0")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => trigger("comma")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            ,
          </button>
        </div>
      </article>
      <article className="w-72 grid grid-cols-3 gap-3 mt-3 justify-items-center">
        <button
          type="button"
          onClick={saveNumberToArray}
          className="cursor-pointer hover:bg-[#f6aa54] w-18 h-16 rounded-lg text-lg text-white  bg-[#F9B66B]"
        >
          spara
        </button>
        <button
          type="button"
          onClick={runSelectedAlgorithm}
          className="cursor-pointer hover:bg-[#50a045] w-18 h-16 rounded-lg text-2xl text-white font-semibold bg-[#62A958]"
        >
          GO
        </button>
        <button
          type="button"
          onClick={popLastNumber}
          className="cursor-pointer hover:bg-[#da4f47] w-18 h-16 rounded-lg text-lg bg-[#e0655e] text-white"
        >
          radera
        </button>
      </article>
    </>
  );
};

export default Numpad;
