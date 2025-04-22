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
  const GroupedArticlesDropdown = async (amount: number = 4) => {
    const data = await ApiCaller(
      `https://localhost:7033/api/Article/GroupedDropdown?amount=${amount}`
    );
    return data;
  };

  const GetArticleById = async (id: number) => {
    const data = await ApiCaller(`https://localhost:7033/api/Article/${id}`);
    return data;
  };
  const Login = async (email: string, password: string) => {
    const response = await fetch("https://localhost:7033/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    return await response.text();
  };

  return {
    Articles,
    ArticlesDTO,
    GroupedArticlesDropdown,
    GetArticleById,
    Login,
  };
};

export default ApiService;
