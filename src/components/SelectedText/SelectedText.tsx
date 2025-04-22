import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Avatar from "../Avatar";
import { useQuery } from "@tanstack/react-query";
import ApiService from "../../Services/ApiService";
import avatarIcon from "../../assets/icons/Avatar.jpg";
import MarkdownFormatter from "../../Services/MarkdownFormatter";
import { ArticleProps } from "../../Types/types";

export default function SelectedText() {
  const { id } = useParams<{ id: string }>();
  const Article = ApiService();

  const { data: selectedArticle, isLoading } = useQuery<ArticleProps>({
    queryFn: () => Article.SingleArticle(Number(id)),
    queryKey: ["singleArticle", id],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex flex-col w-full h-full p-5 gap-5 items-center justify-center">
      {isLoading && (
        <div className="flex justify-center items-center">
          <p className="text-5xl opacity-50 font-bold text-black">Loading...</p>
        </div>
      )}
      {!isLoading && selectedArticle && (
        <>
          <div className="flex flex-col justify-start min-w-2/4 h-[275px] pl-15 pt-15   ">
            <p className="text-[18px] text-[#777777]">{selectedArticle.type}</p>
            <h1 className="text-black text-[57px]">{selectedArticle.title}</h1>
            <Avatar
              img={avatarIcon}
              name={selectedArticle.author}
              date={selectedArticle.posted}
            />
          </div>
          <hr className="w-2/4" />
          <article className="w-2/4 flex flex-col justify-center mt-2">
            <MarkdownFormatter articleContent={selectedArticle.content} />
          </article>
        </>
      )}
      {!isLoading && !selectedArticle && (
        <div className="flex justify-center items-center">
          <p className="text-2xl text-red-500">Kunde ej hitta din artikel</p>
        </div>
      )}
    </section>
  );
}
