import { useContext, useState } from "react";
import SlateEditor from "../../components/SlateEditor/SlateEditor";
import { Editable } from "slate-react";

const Editpage = () => {
  return (
    <section className="h-screen flex flex-col items-center">
      <article className="w-1/2 my-10">
        <span className="text-[#777777] text-lg font-light">
          datastrukturer
        </span>
        <h1 className="text-5xl">HASH TABLE</h1>
        <p className="text-[#777777] text-lg font-light">
          hur fungerar hash tables
        </p>
        <div className="flex items-center gap-2 my-5">
          <img
            src="sds"
            alt="profil "
          />
          <div>
            <h1 className="font-semibold text-lg">Admin</h1>
            <span className="text-[#777777] font-light">FEB 26, 2025</span>
          </div>
        </div>
      </article>

      <hr className="border-2 w-1/2 border-[#777777] my-10" />

      <article className="w-1/2 h-fit mx-auto border-dashed border-1 border-black">
        <SlateEditor />
      </article>
    </section>
  );
};

export default Editpage;
