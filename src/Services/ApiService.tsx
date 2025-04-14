import React from "react";

type MessageProps = {
  message: string;
  content: object;
};

const ApiService = () => {
  const ApiCaller = async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error("Bad response:", response.statusText);
        return [];
      }

      const data = await response.json();

      // Optional structure
      // const messageObject: MessageProps = {
      //   content: data,
      //   message: response.statusText,
      // };

      return data;
    } catch (error) {
      console.error("API fetch error:", error);
      return []; // ✅ Prevents React Query from crashing
    }
  };

  const Articles = async () => {
    const data = await ApiCaller("https://localhost:7033/api/Article");
    return data;
  };

  const ArticlesDTO = async () => {
    const data = await ApiCaller(
      "https://localhost:7033/api/Article/TitleDescription"
    );
    return data;
  };
  const GroupedArticlesDropdown = async () => {
    const data = await ApiCaller(
      "https://localhost:7033/api/Article/GroupedDropdown"
    );
    return data;
  };

  const GetArticleById = async (id: number) => {
    const data = await ApiCaller(`https://localhost:7033/api/Article/${id}`);
    return data;
  };

  return {
    Articles,
    ArticlesDTO,
    GroupedArticlesDropdown,
    GetArticleById,
  };
};

export default ApiService;
