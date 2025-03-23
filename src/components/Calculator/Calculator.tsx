import React from "react";

const Calculator = () => {
  const trigger = (value: string | number) => {
    console.log(value);
  };

  return (
    <section className="flex flex-col items-center my-2 gap-5">
      <section className="w-full xl:w-[500px] px-10">
        <div className="flex justify-end gap-2 ">
          <h2 className="text-[#777777]">hastighet:</h2>
          <button
            onClick={() => trigger("1x")}
            type="button"
            className="hover:underline cursor-pointer text-lg  font-light"
          >
            1x
          </button>
          <button
            onClick={() => trigger("2x")}
            type="button"
            className="hover:underline cursor-pointer text-[#777777] text-lg  font-thin"
          >
            2x
          </button>
          <button
            onClick={() => trigger("3x")}
            type="button"
            className="hover:underline cursor-pointer text-[#777777] text-lg  font-thin"
          >
            3x
          </button>
        </div>
        {/* screen */}
        <article className="mt-3 px-8 py-7 border border-solid border-[#CECECE] rounded-xl flex gap-4 items-center">
          {/* generera span */}
          <span className="rounded-md px-4 py-3 bg-[#F3F3F3] border border-solid border-[#CECECE]">
            12
          </span>
          <span className="rounded-md px-4 py-3 bg-[#F3F3F3] border border-solid border-amber-400">
            1
          </span>
        </article>
      </section>
      {/* numpad */}
      <article>
        <div className="mb-2 w-72 flex justify-between text-[#777777]">
          <button
            type="button"
            onClick={() => trigger("rensa")}
            className="hover:underline cursor-pointer"
          >
            rensa
          </button>
          <button
            type="button"
            onClick={() => trigger("slumpa")}
            className="hover:underline cursor-pointer"
          >
            slumpa
          </button>
        </div>
        <div className="w-72 grid grid-cols-3 grid-rows-4 gap-3 justify-items-center">
          <button
            type="button"
            onClick={() => trigger(7)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => trigger(8)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => trigger(9)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => trigger(4)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => trigger(5)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => trigger(6)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => trigger(1)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => trigger(2)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => trigger(3)}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => trigger("switch")}
            className="hover:bg-[#CECECE] cursor-pointer text-3xl w-18 h-18 bg-[#F3F3F3] border border-solid border-[#CECECE] rounded-lg"
          >
            +/-
          </button>
          <button
            type="button"
            onClick={() => trigger(0)}
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
          onClick={() => trigger("spara")}
          className="cursor-pointer hover:bg-[#f6aa54] w-18 h-16 rounded-lg text-lg text-white  bg-[#F9B66B]"
        >
          spara
        </button>
        <button
          type="button"
          onClick={() => trigger("GO")}
          className="cursor-pointer hover:bg-[#50a045] w-18 h-16 rounded-lg text-2xl text-white font-semibold bg-[#62A958]"
        >
          GO
        </button>
        <button
          type="button"
          onClick={() => trigger("radera")}
          className="cursor-pointer hover:bg-[#da4f47] w-18 h-16 rounded-lg text-lg bg-[#e0655e] text-white"
        >
          radera
        </button>
      </article>
    </section>
  );
};

export default Calculator;
