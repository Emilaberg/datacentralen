import React from "react";
import { useQuery } from "@tanstack/react-query";
import ApiService from "../../Services/ApiService";
import { ArticleProps } from "../../Types/types";

const ReadingPage = () => {
  const { Articles } = ApiService();

  const { data, isLoading, isError } = useQuery({
    queryFn: Articles,
    queryKey: ["articles"],
  });

  if (isLoading) return <div>Laddar artiklar...</div>;
  if (isError) return <div>Något gick fel vid hämtning av artiklar.</div>;

  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold mb-6">Alla Artiklar</h1>
      {data?.map((article: ArticleProps) => (
        <article key={article.id} className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold">{article.title}</h2>
          <p className="text-sm text-gray-600">Författare: {article.author}</p>
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      ))}
    </section>
  );
};

export default ReadingPage;
