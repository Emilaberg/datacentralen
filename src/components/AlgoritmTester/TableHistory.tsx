import React, { useEffect } from "react";
import { useLocalStorageProvider } from "../../Services/SaveToLocalStorageProvider";

const TableHistory = () => {
  const useLocalStorage = useLocalStorageProvider();


  return (
    <section className="w-full flex flex-col items-center">
      <article className="w-full">
        <table className="w-full text-center">
          <thead className="">
            <tr>
              <th className="py-3">d</th>
              <th>Algoritm Namn</th>
              <th>Förflyttningar(steg)</th>
              <th>Tid(ms)</th>
              <th>Hastighet</th>
              <th>Tidskomplexitet</th>
            </tr>
          </thead>
          <tbody>
            {useLocalStorage.savedRuns?.map(e => (
                <tr className="even:bg-[#FFD670]/10">
                <td className="py-2">
                  <input
                    onClick={(e) => console.log(e.target)}
                    type="checkbox"
                    name=""
                    id="1"
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.iterations}</td>
                <td>{e.timeElapsed}</td>
                <td>{e.iterationSpeed}</td>
                <td>{e.timeComplexity}</td>
              </tr>
            ))}
            <tr className="even:bg-[#FFD670]/10">
              <td className="py-2">
                <input
                  onClick={(e) => console.log(e.target)}
                  type="checkbox"
                  name=""
                  id="1"
                />
              </td>
              <td>Merge sort</td>
              <td>10</td>
              <td>256</td>
              <td>1x</td>
              <td>O(1)</td>
            </tr>
            <tr className="even:bg-[#FFD670]/10">
              <td className="py-2">
                <input
                  onClick={(e) => console.log(e.target)}
                  type="checkbox"
                  name=""
                  id="1"
                />
              </td>
              <td>Merge sort</td>
              <td>10</td>
              <td>256</td>
              <td>1x</td>
              <td>O(1)</td>
            </tr>
            <tr className="even:bg-[#FFD670]/10">
              <td className="py-2">
                <input
                  onClick={(e) => console.log(e.target)}
                  type="checkbox"
                  name=""
                  id="1"
                />
              </td>
              <td>Merge sort</td>
              <td>10</td>
              <td>256</td>
              <td>1x</td>
              <td>O(1)</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default TableHistory;
