import React from "react";

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

  const ArticleCardDTO = async () => {
    const data = await ApiCaller(
      "https://localhost:7033/api/Article/CardDisplay"
    );

    return data;
  };

  const GroupedArticlesDropdown = async (amount: number) => {
    const data = await ApiCaller(
      `https://localhost:7033/api/Article/GroupedDropdown/${amount}`
    );
    return data;
  };

  const GetArticleById = async (id: number) => {
    const data = await ApiCaller(`https://localhost:7033/api/Article/${id}`);
    return data;
  };

  const UpdateArticle = async (id: number, updatedArticle: any) => {
    try {
      const response = await fetch(`https://localhost:7033/api/Article/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArticle),
      });

      if (!response.ok) {
        throw new Error(`Failed to update article: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  };

  const UpdateLikes = async (id: number, increment: boolean) => {
    try {
      const response = await fetch(
        `https://localhost:7033/api/Article/${id}/likes?increment=${increment}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update likes: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error("Error updating likes:", error);
      throw error;
    }
  };

  return {
    Articles,
    ArticlesDTO,
    ArticleCardDTO,
    GroupedArticlesDropdown,
    GetArticleById,
    UpdateArticle,
    UpdateLikes,
  };
};

export default ApiService;
