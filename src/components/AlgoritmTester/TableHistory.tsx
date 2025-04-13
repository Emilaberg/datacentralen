import React, { useEffect } from "react";
import { AlgoToLocalStorageType } from "../../Types/types";

const TableHistory = ({array}: {array: Array<AlgoToLocalStorageType>}) => {


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
          <tbody>
            {array?.map((e,i) => (
                <tr key={i} className="even:bg-[#FFD670]/10">
                <td className="py-2">
                  <input
                    onClick={(e) => console.log(e.target)}
                    type="checkbox"
                    name=""
                    id="1"
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.length}</td>
                <td>{e.iterations}</td>
                <td>{e.timeElapsed}</td>
                <td>{e.iterationSpeed}</td>
                <td>{e.timeComplexity}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default TableHistory;
