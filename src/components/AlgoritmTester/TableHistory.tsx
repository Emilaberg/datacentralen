import React, { TdHTMLAttributes, useEffect } from "react";
import { AlgoToLocalStorageType } from "../../Types/types";
import { useLocalStorageProvider } from "../../Services/SaveToLocalStorageProvider";
import { useAlgorithm } from "../../Services/AlgorithmProvider";

const TableHistory = ({handleSelect,array}: {handleSelect: (e: React.MouseEvent, i: number) => void; array: Array<AlgoToLocalStorageType>}) => {
  return (
    <section className="w-full flex flex-col items-center">
      <article className="w-full">
        <table className="w-full text-center">
          <thead className="">
            <tr>
              <th className="py-3">d</th>
              <th>Algoritm Namn</th>
              <th>antal (st)</th>
              <th>Förflyttningar(steg)</th>
              <th>Tid(ms)</th>
              <th>Hastighet</th>
              <th>Tidskomplexitet</th>
            </tr>
          </thead>
          <tbody id="historyTable">
            {array?.map((e,i) => (
                <tr id={"tabledata-" + i.toString()} key={i} className="even:bg-[#FFD670]/10">
                <td className="py-2">
                  <input
                    onClick={(e) => handleSelect(e,i)}
                    type="radio"
                    name="algo"
                    id="1"
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.length}</td>
                <td>{e.iterations}</td>
                <td>{e.timeElapsed}</td>
                <td>{e.iterationSpeed}</td>
                <td>{e.timeComplexity}</td>
                <td hidden>{e.array}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default TableHistory;
