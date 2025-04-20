import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import { ArticleProps } from "../../Types/types";

const ReadingPage = () => {
  const { id } = useParams();
  const { GetArticleById } = ApiService();

  const articleId = id ? parseInt(id) : null;

  const { data, isLoading, isError } = useQuery<ArticleProps>({
    queryKey: ["article", articleId],
    queryFn: () => GetArticleById(articleId!),
    enabled: !!articleId,
  });

  if (!articleId) return <div>Ingen artikel ID angiven.</div>;
  if (isLoading) return <div>Laddar artikel...</div>;
  if (isError || !data)
    return <div>Något gick fel vid hämtning av artikeln.</div>;

  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
      <p className="text-sm text-gray-600 mb-2">Författare: {data.author}</p>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </section>
  );
};

export default ReadingPage;
