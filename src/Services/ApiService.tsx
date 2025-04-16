import React from "react";

type MessageProps = {
  message: string;
  content: object;
};

const ApiService = () => {
  const ApiCaller = async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let response: Response;

    try {
      response = await fetch(url);

      const data = await response.json();
      //används ej
      let messageObject: MessageProps = {
        content: data,
        message: response.statusText,
      };

      //   return messageObject;
      return data;
    } catch (error) {
      console.log(error, "error message: check Api");
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

  const SingleArticle = async (id: number) => {
    const data = await ApiCaller(`https://localhost:7033/api/Article/${id}`);

    return data;
  };

  //bygg på med Fetch anrop

  return {
    Articles,
    ArticlesDTO,
    ArticleCardDTO,
    SingleArticle,
  };
};

export default ApiService;
