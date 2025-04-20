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
  
  /**
 * Updates the content of an article by sending a PUT request with the file content as a string.
 * 
 * @param id - The unique identifier (primary key) of the article to update.
 * @param data - The new content of the article as a string.
 * @param enableLog - (Optional) A boolean flag to enable or disable logging of errors. Defaults to `true`.
 * @returns Promise that resolves to the Response object if successful, or `null` if the request fails.
 * 
 * @throws Will log an error to the console if the PUT request fails and `enableLog` is set to `true`.
 * 
 * @example
 * ```typescript
 * // Update article content with logging enabled
 * const response = await ArticleChangeContent(1, "New article content");
 * 
 * // Update article content with logging disabled
 * const response = await ArticleChangeContent(1, "New article content", false);
 * ```
 */
  const ArticleChangeContent = async (id: number, data: string, enableLog = true) => {
    const response = await fetch(`https://localhost:7033/api/Article/with-file-as-string`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        Id: id,
        FileAsRawString: data 
      })
    });

    if (!response.ok) {
      if (enableLog) console.error("Failed to PUT file as string:", response.status, response.statusText);
      
      return null;
    }

    return response;
  };

  const ArticleContentDelete = async(id:number) =>{
    const response = await fetch(`https://localhost:7033/api/Article/remove-content/${id}`, {
      method: 'PUT'
    });
    if (!response.ok) {
      console.error("Failed to remove content from article:", response.status, response.statusText);
      return null;
    }
    return response;
  }
  //bygg på med Fetch anrop

  return {
    Articles,
    ArticlesDTO,
    ArticleCardDTO,
    ArticleChangeContent,
    ArticleContentDelete
  };
};

export default ApiService;
