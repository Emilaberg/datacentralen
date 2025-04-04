import React, { useEffect, useState } from "react";
import AlgoritmTester from "../../components/AlgoritmTester/AlgoritmTester";
import { div } from "framer-motion/client";
// import bubblesort from "../../Algorithms/Bubblesort/bubblesort";


const TestaAlgoritm = () => {

  const [array,updateArray] = useState([9,8,7,6,5,4,3,2,1,23,4,5,7654,7,3,356,23,46,743,2]);
  
  function sortArray(arrayToSort: Array<number>): void {
    const sortedArray =  bubbleSort(arrayToSort)
    console.log("first")
    // updateArray([...sortedArray]);
  }

  async function bubbleSort(arr: number[]) {
    const len = arr.length;
  
    for (let i = 0; i < len; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
  
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
          }
          console.log(arr)
          updateArray([...arr]);
    }
  
  }

  async function selectionSort(arr: number[]) {
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      let minIndex = i;
      // Find the index of the minimum element in the unsorted part
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      // Swap the found minimum element with the first unsorted element
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      updateArray([...arr])
    }
    // return arr;
  }

  return (
    <>
      <section className="mt-48 flex flex-col items-center">
        <article className="w-2/3 xl:w-1/3">
          <h1 className="text-5xl mb-8">Testa en algoritm</h1>
          <p className="px-4">
            Välkommen till vår interaktiva algoritmverkstad! Här kan du leka med
            olika algoritmer och se hur de fungerar visuellt, samtidigt som du
            lär dig något nytt på ett roligt och engagerande sätt.
          </p>
        </article>

        <article className="w-2/3 xl:w-1/3 px-4 mt-7">
          <h2>klicka på knappen för att testa en algoritm</h2>
          <button className="mt-7 ml-10 py-2 px-3 hover:text-white hover:bg-[#A0DABA] rounded-xl hover:border hover:border-black transition-colors ease-in duration-100">
            Testa en Algoritm
          </button>
        </article>
      </section>

      <section className="mt-72 mb-20 flex justify-center">
        <article className="flex items-center">
          <span className="mr-10 font-semibold text-3xl">Välj</span>
          <select
            name=""
            id=""
            className="bg-white border border-black rounded-lg h-full px-6"
          >
            <option value="">Merge Sort</option>
            <option value="">Merge Sort</option>
            <option value="">Merge Sort</option>
            <option value="">Merge Sort</option>
          </select>
        </article>
      </section>

      <section className="mx-20 mb-40 px-12 py-18 border-dashed border-[#8f8f8f] border-2">
        <AlgoritmTester />
      </section>

      <section className="flex flex-col items-center">
        <div className="flex gap-2 ">
        {array.map((item,index) => (
          <span key={index} className="border-2 border-black px-3 py-2">
            {item}
          </span>
        ) )}
        
        </div>
        <div className="flex gap-2 h-96 mt-2 items-end">
        {array.map((item,index) => (
          <div key={index} className={`relative w-4 bg-black`} style={{height: `${(item/10)*100 > 100 ? 100 :(item/10)*100}%`}}>
            <span className="absolute top-full">{item}</span>
          </div>
        ) )}
        </div>
        {/* <button onClick={() => sortArray(array)} className="border-2 border-black my-6 px-2 py-1 hover:bg-gray-400 cursor-pointer">sort</button> */}
        <button onClick={() => bubbleSort(array)} className="border-2 border-black my-6 px-2 py-1 hover:bg-gray-400 cursor-pointer">sort bubblesort</button>
        <button onClick={() => selectionSort(array)} className="border-2 border-black my-6 px-2 py-1 hover:bg-gray-400 cursor-pointer">sort selectionsort</button>
      </section>
    </>
  );
};

export default TestaAlgoritm;
