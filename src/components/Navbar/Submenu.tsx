import React from "react";
import { Link } from "react-router-dom";

const Submenu = () => {
  return (
    <div className="absolute w-full left-0 top-0 hidden group-hover:block">
      <ul className=" w-[200%] mt-10 hidden group-hover:flex flex-col gap-2 bg-white px-6 capitalize rounded-2xl border border-[#96C9E3] py-4">
        <li>
          <Link to="#" className="font-medium text-lg">BubbleSort</Link>
          <p className="text-black/50 text-sm font-roboto">Jämför och byter intilliggande element tills listan är sorterad</p>
        </li>
        <li>
          <Link to="#" className="font-medium text-lg">HeapSort</Link>
          <p className="text-black/50 text-sm font-roboto">Bygger en heap och extraherar det största/minsta elementet för att sortera listan</p>

        </li>
        <li>
          <Link to="#" className="font-medium text-lg">QuickSort</Link>
          <p className="text-black/50 text-sm font-roboto">Dela upp listan vid ett pivot och sortera delarna rekursivt</p>

        </li>
      </ul>
    </div>
  );
};

export default Submenu;
