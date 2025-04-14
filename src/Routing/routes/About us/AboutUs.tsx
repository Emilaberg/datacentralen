import React, { useState, useEffect } from "react";
import ApiService from "../../../Services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { ArticleProps } from "../../Types/types";

const AboutUs = () => {
  const { Articles } = ApiService();
  const [sortingArticles, setSortingArticles] = useState([]);
  const [dataStructureArticles, setDataStructureArticles] = useState([]);

  useEffect(() => {
    if (data) {
      const filteredSortingArticles = data.filter(
        (articles: ArticleProps) => articles.type === "Sorteringsalgoritm"
      );
      const filteredDataStructureArticles = data.filter(
        (articles: ArticleProps) => articles.type === "Datastruktur"
      );
      setSortingArticles(filteredSortingArticles);
      setDataStructureArticles(filteredDataStructureArticles);
    }
  });

  const { data, isLoading } = useQuery({
    queryFn: Articles,
    queryKey: ["articles"],
  });

  console.log("data", data);
  return (
    <section className=" overflow-hidden bg-blanchOrange h-full w-full  flex flex-col justify-center items-center mt-20">
      <article className="mr-15 ml-15 w-5/6 h-[650px] flex bg-[#CF6227]/10 p-10 radious-xl rounded-4xl">
        <div className="flex gap-20 items-center">
          <div className="relative h-4/6 w-3/6">
            <img
              src="src\assets\icons\dataStructure.jpg"
              alt="dataStructure"
              className="h-full w-full object-cover rounded-2xl"
            />
            <div className="absolute top-0 left-0 h-full w-full bg-white/20 rounded-lg"></div>
          </div>
          <div className="flex flex-col w-2/4 pb-15 gap-5">
            <h1 className="text-[50px]">Om Projektet</h1>
            <p className="text-[17px]">
              Vår portal gör det enkelt att förstå och visualisera
              sorteringsalgoritmer och datastrukturer. Här kan du utforska och
              lära dig på ett interaktivt sätt, vilket gör komplexa koncept både
              tydliga och engagerande.
            </p>
          </div>
        </div>
      </article>
      <article className="mr-15 ml-15 mt-10 w-5/6 h-[650px] flex bg-[#D7875D]/15 p-10 radious-xl rounded-4xl">
        <div className="flex gap-20 items-center">
          <div className="flex flex-col w-2/4 pb-15 gap-5">
            <h1 className="text-[50px]">
              Vår vision av en interaktiv läroplatform
            </h1>
            <p className="text-[17px]">
              Att skapa en interaktiv lärplattform där användare på ett enkelt
              och engagerande sätt kan utforska och förstå sorteringsalgoritmer
              och datastrukturer, genom visuella verktyg och praktiska exempel.
            </p>
          </div>
          <div className="relative h-4/6 w-3/6">
            <img
              src="src\assets\icons\code.jpg"
              alt="code"
              className="h-full w-full object-cover rounded-2xl"
            />
            <div className="absolute top-0 left-0 h-full w-full bg-white/40 rounded-lg"></div>
          </div>
        </div>
      </article>
      <article className="mr-15 ml-15 mt-10 w-5/6 h-[650px] flex bg-[#D7875D]/15 p-10 radious-xl rounded-4xl">
        <div className="flex justify-evenly items-center h-full w-full">
          <div className="flex p-10 flex-col justify-center items-center gap-2 rounded-full bg-[#D7875D]/10 h-[350px] w-[350px]">
            <h1 className="text-[50px] font-bold">{sortingArticles.length}</h1>
            <p className="text-[17px] italic text-center">
              Interaktiva sorteringsalgoritmer
            </p>
          </div>
          <div className="p-10 flex flex-col justify-center items-center gap-2 rounded-full bg-[#D7875D]/10 h-[350px] w-[350px]">
            <h1 className="text-[50px] font-bold">
              {dataStructureArticles.length}
            </h1>
            <p className="text-[17px] italic text-center">
              Spännande datastrukturer att läsa om
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AboutUs;
