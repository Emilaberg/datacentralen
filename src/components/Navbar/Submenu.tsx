import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../../Services/ApiService"
import { ArticleDTOProps } from "../../Types/types";

const Submenu = () => {
  const {ArticlesDTO} = ApiService();


  const {data, isLoading} = useQuery({
    queryFn: ArticlesDTO,
    queryKey: ["articlesDTO"],
  })


  return (
    <div className="absolute w-full left-0 top-0 hidden group-hover:block">
      <ul className=" w-[200%] mt-10 hidden group-hover:flex flex-col gap-2 bg-white px-6 capitalize rounded-2xl border-2 border-[#96C9E3] py-4">
        {isLoading && <div>Laddar artiklar..</div>}
        {data?.slice(0,4).map((article: ArticleDTOProps, ) => {
          return (<li key={article.id}>
            <Link to="#" className="font-medium text-lg">{article.title}</Link>
            <p className="text-black/50 text-sm font-roboto w- text-ellipsis whitespace-nowrap overflow-hidden">{article.description}</p>
          </li>)
        })}
        
      </ul>
    </div>
  );
};

export default Submenu;
