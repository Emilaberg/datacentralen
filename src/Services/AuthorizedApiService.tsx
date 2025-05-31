import { jwtDecode } from "jwt-decode";

const AuthorizedApiService = () => {
  const BaseAPIUrl = "https://localhost:7033/api/";
  const LogUserNameAndPasswordInAuthMe = false;
  const defaultLogRequest = false; // the default flag for logging

  /**
   * Interface representing properties required for making an authorized HTTP request.
   *
   * @interface RequestProps
   * @property {string} url - The URL endpoint to which the request will be sent to. Already includes the base URL .
   * Example: "Auth/login"
   * @property {Map<string, string> | null} headers - A Map of headers to be included in the request.
   * @property {HttpMethodType} method - The HTTP method to be used for the request (e.g., GET, POST, PUT, DELETE).
   * @property {object} body - The request payload to be sent in the request body. Will get a JSON.Stringify() before sending.
   * @property {boolean} enableLog  (Optional) A flag to enable or disable logging for the request.
   * - If `true`, logs detailed information about the request and response to the console.
   * - If `false`, suppresses logging.
   * - Defaults to `true` if not provided.
   */
  type RequestProps = {
    url: string;
    headers?: Map<string, string> | null;
    method: HttpMethodType;
    body: object;
    enableLog?: boolean;
  };

  /**
   * Enum representing the HTTP method types.
   *
   * @enum {string}
   * @property {string} Get - Represents the GET HTTP method.
   * @property {string} Post - Represents the POST HTTP method.
   * @property {string} Put - Represents the PUT HTTP method.
   * @property {string} Delete - Represents the DELETE HTTP method.
   */
  enum HttpMethodType {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE",
  }

  /**
   * Sends a request to the API with the provided request properties.
   *
   * This function is a low-level utility for making HTTP requests to the API.
   *
   * @async
   * @function
   * @param {RequestProps} requestProps - The properties for the API request.
   * @param {string} requestProps.url - The endpoint URL (relative to the base API URL).
   * @param {HttpMethodType} requestProps.method - The HTTP method to use (e.g., GET, POST, PUT, DELETE).
   * @param {Map<string, string>} [requestProps.headers] - Optional headers to include in the request.
   * - If no headers are provided, the function will throw an error.
   * @param {object} requestProps.body - The request payload to send in the body of the request.
   * - The body will be serialized to JSON using `JSON.stringify()`.
   * @param {boolean} [requestProps.enableLog=false] - (Optional) A flag to enable or disable logging for the request.
   * - If `true`, logs information about the request and response to the console.
   * - If `false`, suppresses all logging.
   *
   * @returns {Promise<Response | null>} A promise that resolves to the `Response` object if the request is successful,
   * or `null` if the request fails or is invalid.
   *
   * @throws Will throw an error if required properties (`url`, `method`, or `headers`) are missing or invalid.
   *
   */
  const SendRequestToAPi = async (requestProps: RequestProps) => {
    let returnValue: Response | null = null; // I dont know how to make it so that js/ts knows that return type is Response , this does that

    const enableLog = requestProps.enableLog ?? defaultLogRequest;
    if (!requestProps.url) {
      if (enableLog) console.error("Request failed: URL is required");
      return returnValue;
    }

    if (!requestProps.method) {
      if (enableLog) console.error("Request failed: HTTP method is required");
      return returnValue;
    }
    if (!requestProps.headers || requestProps.headers.size === 0) {
      if (enableLog)
        console.error(
          "Request failed: Headers are null or empty. Even the Auth token header is not given."
        );
      return returnValue;
    }

    let url = BaseAPIUrl + requestProps.url;
    url = url.replace(/([^:]\/)\/+/g, "$1");
    const method = requestProps.method;
    const headers = Object.fromEntries(requestProps.headers);
    const body = JSON.stringify(requestProps.body);

    if (enableLog) {
      console.log("RequestProps:", {
        url: requestProps.url,
        method: requestProps.method,
        headers: requestProps.headers
          ? Object.fromEntries(requestProps.headers)
          : null,
        body: requestProps.body,
        enableLog: enableLog,
      });
    }
    try {
      //send requst to api, if request fails it will log to console, which is default browser behavior that I cannot change
      returnValue = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });

      // Check if the response is ok (status in the range 200-299)
      if (!returnValue.ok) {
        if (enableLog)
          console.error(
            "Request failed:",
            returnValue.status,
            returnValue.statusText
          ); //log what went wrong
        return returnValue;
      }

      // If the response is ok, return the response object
      return returnValue;
    } catch (error) {
      if (enableLog) console.error("Error sending request:", error); //log what went wrong
      return returnValue;
    }
  };

  /**
   * Checks if the current token is authorized.
   *
   * This function sends a POST request to the `Auth/is-admin` endpoint to validate
   * the token stored in `localStorage`. The endpoint uses middleware in the API
   * to perform the validation.
   *
   * @async
   * @function
   * @param {boolean} [enableLog=false] - (Optional) A flag to enable or disable logging for the request.
   * - If `true`, logs information about the request and any errors to the console.
   * - If `false`, suppresses all logging.
   *
   * @returns {Promise<boolean>} A promise that resolves to:
   * - `true` if the token is valid and authorized.
   * - `false` if the token is invalid, expired, or the request fails.
   *
   * @throws Will log an error to the console if the request fails and `enableLog` is set to `true`.
   */
  const TokenIsAuthorized = async (enableLog = defaultLogRequest) => {
    const token = localStorage.getItem("AuthToken");
    let responseFromApi: Response | null | undefined;

    try {
      //this endpoint is [Authorized] so the middleware built in ASP.Net does the validation
      responseFromApi = await SendAuthorizedRequest({
        body: {},
        method: HttpMethodType.Post,
        url: "Auth/is-admin",
        headers: new Map<string, string>([
          ["Authorization", token ? `${token}` : ""],
        ]),
      });

      if (responseFromApi === undefined) return false;
      if (!responseFromApi || responseFromApi) return false;
      return true;
    } catch (ex) {
      if (enableLog) console.log(ex);
      return false;
    }
  };

  /**
   * Authenticates a user by sending their credentials to the API.
   *
   * This function sends a POST request to the "Auth/login" endpoint with the provided
   * username and password. If the authentication is successful, the returned token
   * is stored in `localStorage` for future use.
   *
   * @async
   * @function
   * @param {string} username - The username of the user attempting to authenticate.
   * @param {string} password - The password of the user attempting to authenticate.
   * @param {boolean} [enableLog=false] - (Optional) A flag to enable or disable logging for the request.
   * - If `true`, logs detailed information about the request and any errors to the console.
   * - If `false`, suppresses all logging.
   *
   * @returns {Promise<Response | null>} A promise that resolves to the `Response` object if authentication is successful,
   * or `null` if it fails.
   *
   * @throws Will log an error to the console if the authentication request fails and `enableLog` is set to `true`.
   */
  const AuthMe = async (
    username: string,
    password: string,
    enableLog = LogUserNameAndPasswordInAuthMe
  ) => {
    let responseFromApi: Response | null;
    try {
      const headers = new Map<string, string>();
      headers.set("Content-Type", "application/json"); //add the content type to the headers

      responseFromApi = await SendRequestToAPi({
        url: "Auth/login",
        method: HttpMethodType.Post,
        headers: headers,
        body: {
          userName: username,
          password: password,
        },
        enableLog: enableLog,
      });
    } catch (error) {
      if (enableLog)
        console.log(error, "ERROR: Unable to authenticate credentials");
      return null;
    }

    if (!responseFromApi || !responseFromApi.ok) {
      if (enableLog)
        console.error(
          "Failed to authenticate:",
          responseFromApi?.status,
          responseFromApi?.statusText
        );
      return null;
    }

    const token = await responseFromApi.text();
    const cleanToken = token.replace(/^Bearer\s+/i, "");
    localStorage.setItem("AuthToken", cleanToken);
    return responseFromApi;
  };

  /**
   * Sends an authorized API request with the provided request properties.
   *
   * This function automatically includes the `Authorization` header with the token
   * stored in `localStorage`. It is used for making authenticated requests to the API.
   *
   * @async
   * @function
   * @param {RequestProps} requestProps - The properties for the API request.
   * @param {string} requestProps.url - The endpoint URL (relative to the base API URL).
   * @param {HttpMethodType} requestProps.method - The HTTP method to use (e.g., GET, POST, PUT, DELETE).
   * @param {Map<string, string>} [requestProps.headers] - Optional headers to include in the request.
   * - If no headers are provided, default headers will be added, including the `Authorization` header.
   * @param {object} requestProps.body - The request payload to send in the body of the request.
   * - The body will be serialized to JSON using `JSON.stringify()`.
   * @param {boolean} [requestProps.enableLog=true] - (Optional) A flag to enable or disable logging for the request.
   * - If `true`, logs detailed information about the request and any errors to the console.
   * - If `false`, suppresses all logging.
   *
   * @returns {Promise<Response | null>} A promise that resolves to the `Response` object if the request is successful,
   * or `null` if the request fails.
   *
   * @throws Will log an error to the console if the request fails and `enableLog` is set to `true`.
   *
   * @example
   * ```typescript
   * // Example: Sending a GET request
   * const response = await SendAuthorizedRequest({
   *   url: "Article",
   *   method: HttpMethodType.Get,
   *   body: {},
   *   enableLog: true,
   * });
   * if (response && response.ok) {
   *   const data = await response.json();
   *   console.log(data);
   * }
   * ```
   */
  const SendAuthorizedRequest = async (requestProps: RequestProps) => {
    let responseFromApi: Response | null;

    const authToken = localStorage.getItem("AuthToken"); // refetch token now that it is new

    if (!authToken) {
      if (requestProps.enableLog)
        console.error(
          "ERROR: Could not find auth token, and could not make a new one. Is the API running?"
        );
      return null;
    }
    const url = requestProps.url;
    const method = requestProps.method;
    const body = requestProps.body;
    const headers = requestProps.headers
      ? requestProps.headers
      : new Map<string, string>();
    headers.set("Authorization", `Bearer ${authToken}`); //add the auth token to the headers
    headers.set("Content-Type", "application/json"); //add the content type to the headers

    try {
      const request: RequestProps = {
        url: url,
        method: method,
        body: body,
        headers: headers,
        enableLog: requestProps.enableLog,
      };

      responseFromApi = await SendRequestToAPi(request);
      if (!responseFromApi) {
        if (requestProps.enableLog)
          console.error(
            "ERROR: Could not send request to API. Check console for details."
          );
        return null;
      }
      return responseFromApi;
    } catch (error) {
      if (requestProps.enableLog)
        console.error(
          "ERROR: Could not send request to API. Check console for details.",
          error
        );
    }
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
   */
  const PUTArticleChangeContent = async (
    id: number,
    data: string,
    enableLog = defaultLogRequest
  ) => {
    try {
      const response = await SendAuthorizedRequest({
        url: `/Article/with-file-as-string`,
        method: HttpMethodType.Put,
        body: {
          Id: id,
          FileAsRawString: data,
        },
        enableLog: enableLog,
      });

      if (!response) {
        if (enableLog)
          console.error("Failed to PUT file as string: No response from API");
        return null;
      }

      if (!response.ok) {
        if (enableLog)
          console.error(
            "Failed to PUT file as string:",
            response.status,
            response.statusText
          );
        return null;
      }

      return response;
    } catch (error) {
      if (enableLog)
        console.error("Error occurred while sending PUT request:", error);
      return null;
    }
  };

  /**
   * DOES NOT DELETE THE ENTIRE ARTICLE, ONLY THE CONTENT.
   *
   * Removes the content from an article by its ID.
   *
   * @param id - The unique identifier of the article to remove content from.
   * @returns A Promise that resolves to the Response object if successful, or null if the request fails.
   * @remarks This function uses a PUT request despite the DELETE prefix in the function name.
   */
  const DELETEArticleContent = async (
    id: number,
    enableLog = defaultLogRequest
  ) => {
    const response = await SendAuthorizedRequest({
      url: `Article/remove-content/${id}`,
      method: HttpMethodType.Put,
      body: {},
      enableLog: enableLog,
    });
    if (!response || !response.ok) {
      if (enableLog)
        console.error(
          "Failed to remove content from article:",
          response?.status,
          response?.statusText
        );
      return null;
    }
    return response;
  };

  /**
   * THIS DELETE THE WHOLE ARTICLE.
   *
   * Removes an article by its ID.
   *
   * @param id - The unique identifier of the article to remove content from.
   * @returns A Promise that resolves to the Response object if successful, or null if the request fails.
   */
  const DELETEArticle = async (id: number, enableLog = defaultLogRequest) => {
    const response = await SendAuthorizedRequest({
      url: `Article/${id}`,
      method: HttpMethodType.Delete,
      body: {},
      enableLog: enableLog,
    });
    if (!response || !response.ok) {
      if (enableLog)
        console.error(
          "Failed to delete article:",
          response?.status,
          response?.statusText
        );
      return null;
    }
    return response;
  };

  /**
   * Fetches all articles from the API.
   *
   * This function sends an authorized GET request to the "Article" endpoint
   * and retrieves the response containing the list of articles.
   *
   * @async
   * @function
   * @returns {Promise<any>} A promise that resolves to the response from the API.
   */
  const GETAllArticles = async (enableLog = defaultLogRequest) => {
    const response = await SendAuthorizedRequest({
      url: "Article",
      body: {},
      method: HttpMethodType.Get,
      enableLog: enableLog,
    });
    if (!response || !response.ok) {
      if (enableLog)
        console.error(
          "Failed to fetch all articles:",
          response?.status,
          response?.statusText
        );
      return null;
    }
    return response;
  };

  /**
   * Fetches an article by its ID using an authorized API request.
   *
   * @param idOfArticle - The unique identifier of the article to retrieve.
   * @returns A promise that resolves to the response of the API call.
   */
  const GETArticleById = async (
    idOfArticle: number,
    enableLog = defaultLogRequest
  ) => {
    const response = await SendAuthorizedRequest({
      url: `api/Article/${idOfArticle}`,
      method: HttpMethodType.Get,
      body: {},
      enableLog: enableLog,
    });
    if (!response || !response.ok) {
      if (enableLog)
        console.error(
          `Failed to fetch article by ID (${idOfArticle}):`,
          response?.status,
          response?.statusText
        );
      return null;
    }
    return response;
  };

  /**
   * Fetches all articles with their titles and descriptions.
   *
   * This function sends an authorized GET request to the `Article/TitleDescription` endpoint
   * to retrieve a list of articles, including their titles and descriptions.
   *
   * @async
   * @function
   * @returns {Promise<any>} A promise that resolves to the response containing the articles' data.
   */
  const GETAllArticlesWithTitleAndDescription = async (
    enableLog = defaultLogRequest
  ) => {
    const response = await SendAuthorizedRequest({
      url: `Article/TitleDescription`,
      body: {},
      method: HttpMethodType.Get,
      enableLog: enableLog,
    });
    if (!response || !response.ok) {
      if (enableLog)
        console.error(
          "Failed to fetch all articles with titles and descriptions:",
          response?.status,
          response?.statusText
        );
      return null;
    }
    return response;
  };

  /**
   * Fetches all articles as CardDTO objects from the API.
   *
   * This function sends an authorized GET request to the `Article/CardDisplay` endpoint
   * and retrieves the response containing the articles formatted as CardDTOs.
   *
   * @async
   * @function
   * @returns {Promise<any>} A promise that resolves to the response containing the articles.
   */
  const GETAllArticlesAsCardDTO = async (enableLog = defaultLogRequest) => {
    const response = await SendAuthorizedRequest({
      url: `Article/CardDisplay`,
      body: {},
      method: HttpMethodType.Get,
      enableLog: enableLog,
    });
    if (!response || !response.ok) {
      if (enableLog)
        console.error(
          "Failed to fetch all articles as CardDTO:",
          response?.status,
          response?.statusText
        );
      return null;
    }
    return response;
  };

  const POSTArticle = async (articleData: any, enableLog = false) => {
    const response = await SendAuthorizedRequest({
      url: "Article",
      method: HttpMethodType.Post,
      body: articleData,
      enableLog,
    });
    return response;
  };

  return {
    SendAuthorizedRequest,
    PUTArticleChangeContent,
    DELETEArticleContent,
    DELETEArticle,
    GETAllArticles,
    GETArticleById,
    GETAllArticlesWithTitleAndDescription,
    GETAllArticlesAsCardDTO,
    AuthMe,
    TokenIsAuthorized,
    POSTArticle,
  };
};

export default AuthorizedApiService;
