import { useAlgorithm } from "../../Services/AlgorithmProvider";
import ComparisonChart from "../AlgoritmTester/ComparisonChart";
import { useState } from "react";

const HistoryTable = () => {
  const { savedRuns, clearHistory } = useAlgorithm();

  const [compareRun, setCompareRun] = useState<null | (typeof savedRuns)[0]>(
    null
  );

  if (savedRuns.length === 0) {
    return <p>Ingen sparad historik än.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Historik av Körningar</h2>

      <button
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => {
          if (confirm("Är du säker på att du vill rensa historiken?")) {
            clearHistory();
            setCompareRun(null);
          }
        }}
      >
        Rensa Historik
      </button>

      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Tidpunkt</th>
            <th className="border border-gray-400 px-4 py-2">Algoritm</th>
            <th className="border border-gray-400 px-4 py-2">
              Tidsåtgång (ms)
            </th>
            <th className="border border-gray-400 px-4 py-2">
              Antal Iterationer
            </th>
            <th className="border border-gray-400 px-4 py-2">Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {savedRuns.map((run) => (
            <tr key={run.id}>
              <td className="border border-gray-400 px-4 py-2">
                {new Date(run.timestamp).toLocaleString()}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {run.selectedAlgorithm}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {run.timeElapsed}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {run.amountOfIterations}
              </td>
              <td className="border border-gray-400 px-4 py-2 flex flex-wrap gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => setCompareRun(run)}
                >
                  Visa Jämförelse
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                  onClick={() => setCompareRun(null)}
                >
                  Dölj
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {compareRun && (
        <ComparisonChart
          original={compareRun.originalArray}
          sorted={compareRun.sortedArray}
        />
      )}
    </div>
  );
};

export default HistoryTable;
