import {jwtDecode} from "jwt-decode";
/**
   * Interface representing properties required for making an authorized HTTP request.
   * 
   * @interface RequestProps
   * @property {string} url - The URL endpoint to which the request will be sent to. Already includes the base URL .
   * Example: "Auth/login"
   * @property {Map<string, string> | null} headers - A Map of headers to be included in the request. Can be omitted (left null). No need to add 'Content-Type': 'application/json' as it is already added.
   * @property {HttpMethodType} method - The HTTP method to be used for the request (e.g., GET, POST, PUT, DELETE).
   * @property {object} body - The request payload to be sent in the request body. Will get a JSON.Stringify() before sending.
   */
type RequestProps = {
  url: string,
  headers?: Map<string, string> | null,
  method: HttpMethodType,
  body: object,
  enableLog? : boolean 
}
 /**
   * Enum representing the HTTP method types.
   * 
   * @enum {string}
   * @property {string} Get - Represents the GET HTTP method.
   * @property {string} Post - Represents the POST HTTP method.
   * @property {string} Put - Represents the PUT HTTP method.
   * @property {string} Delete - Represents the DELETE HTTP method.
   */
 enum HttpMethodType{
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",

}


class AuthorizedApiService {
  private static instance: AuthorizedApiService | null = null;
  private BaseAPIUrl = "https://localhost:7033/api/";
  private UserName: string | null = null;
  private PassWord: string | null = null;

  private constructor() {}

  /**
   * Gets the singleton instance of AuthorizedApiService.
   * Throws an error if the service has not been initialized.
   * @returns The singleton instance of AuthorizedApiService.
   */
  public static GetAuthdService(): AuthorizedApiService {
    if (!AuthorizedApiService.instance) {
      throw new Error("AuthorizedApiService has not been initialized. Call initialize() first.");
    }
    return AuthorizedApiService.instance;
  }


  /**
   * Initializes the singleton instance with username and password.
   * This must be called once before using the service.
   * @param userName - The username for authentication.
   * @param password - The password for authentication.
   */
  public static init(userName: string, password: string): void {
    if (!AuthorizedApiService.instance) {
      AuthorizedApiService.instance = new AuthorizedApiService();
    }
    AuthorizedApiService.instance.UserName = userName;
    AuthorizedApiService.instance.PassWord = password;
  }


  /**
   * DO NOT CALL THIS DIRECTLY. USE THE SendAuthorizedRequest() INSTEAD.!! 
   * 
   * This function simply send a request to api, but does not handle authentication/reAuthentication when tokens are invalid.
   * 
   * @param requestProps - The properties for the API request
   * 
   * @returns Promise that resolves to the Response object if successful, or null if the request fails
   * 
   */
  public async SendRequestToAPi(requestProps: RequestProps) {
    let returnValue: Response | null = null; // I dont know how to make it so that js/ts knows that return type is Response , this does that
    const enableLog = requestProps.enableLog ?? true;
    if (!requestProps.url) {
      if (enableLog) console.error("Request failed: URL is required");
      return returnValue;
    }

    if (!requestProps.method) {
      if (enableLog) console.error("Request failed: HTTP method is required");
      return returnValue;
    }
    if (!requestProps.headers || requestProps.headers.size === 0) {
      if (enableLog) console.error("Request failed: Headers are null or empty. Even the Auth token header is not given.");
      return returnValue;
    }

    let url = this.BaseAPIUrl + requestProps.url;
    url = url.replace(/([^:]\/)\/+/g, "$1") //remove double slashes if they happen when giving API endpoint 
    const method = requestProps.method;
    const headers = Object.fromEntries(requestProps.headers);
    const body = JSON.stringify(requestProps.body);

    if (enableLog) {
      console.log("RequestProps:", {
        url: requestProps.url,
        method: requestProps.method,
        headers: requestProps.headers ? Object.fromEntries(requestProps.headers) : null,
        body: requestProps.body,
        enableLog: requestProps.enableLog,
      });

    }
    try {
      //send requst to api
      returnValue = await fetch(url, {
        method: method,
        headers: headers,
        body: body
      });

      // Check if the response is ok (status in the range 200-299)
      if (!returnValue.ok) {
        if (enableLog) console.error("Request failed:", returnValue.status, returnValue.statusText); //log what went wrong
        return returnValue;
      }

      // If the response is ok, return the response object
      return returnValue;
    } catch (error) {
      if (enableLog) console.error("Error sending request:", error); //log what went wrong
      return returnValue;
    }

  }

  public async AuthMe() {
    let responseFromApi: Response | null;
    try {

      const headers = new Map<string, string>();
      headers.set("Content-Type", "application/json"); //add the content type to the headers

      responseFromApi = await this.SendRequestToAPi({
        url: "Auth/login",
        method: HttpMethodType.Post,
        headers: headers,
        body: {
          userName: this.UserName,
          password: this.PassWord,
        },
      });


    } catch (error) {
      console.log(error, "ERROR: Unable to authenticate credentials");
      return null;
    }

    if (!responseFromApi || !responseFromApi.ok) {
      console.error("Failed to authenticate:", responseFromApi?.status, responseFromApi?.statusText);
      return null;
    }

    const token = await responseFromApi.text(); // return from api is a pure string, not json format

    localStorage.setItem("AuthToken", token); //adds token to localstorage
    return responseFromApi;
  }


  /**
   * Checks the validity of the authentication token stored in localStorage.
   * 
   * This function retrieves the token from localStorage, decodes it to extract
   * the expiration time, and determines whether the token is still valid. If the
   * token is about to expire (less than 10 minutes remaining) or has already expired,
   * it removes the token from localStorage. If decoding the token fails, the token
   * is also removed.
   * 
   * @remarks
   * - The expiration time (`exp`) in the token is expected to be in UNIX timestamp format (seconds).
   * - The current time is compared against the expiration time to calculate the remaining validity.
   * 
   * @throws {Error} If decoding the token fails, the error is returned after removing the token.
   * 
   * @example
   * // Ensure the token is valid before making an API call
   * CheckTokenValidity();
   */
  public CheckTokenValidity() {

    const authToken = localStorage.getItem("AuthToken");

    if (!authToken) {
      return;
    }

    try {
      // Decode the token to extract the expiration time
      const decodedToken: { exp: number } = jwtDecode(authToken); // `exp` is in seconds (UNIX timestamp)
      const currentTime = Date.now() / 1000; // Current time in seconds

      const timeLeft = decodedToken.exp - currentTime; // Time left in seconds

      if (timeLeft < 600) {
        console.warn(`Token is about to expire or has expired. Time left: ${Math.max(0, Math.floor(timeLeft))} seconds. Removing it from localStorage.`);
        localStorage.removeItem("AuthToken"); // Remove the token
      } else {
        console.log(`Token is valid. Time left: ${Math.floor(timeLeft)} seconds.`);
      }
    } catch (error) {
      localStorage.removeItem("AuthToken"); // Remove the token if decoding fails
      return error
    }
  }

  public async SendAuthorizedRequest(requestProps: RequestProps) {

    let responseFromApi: Response | null;

    this.CheckTokenValidity()
    let authToken = localStorage.getItem("AuthToken");

    if (!authToken) await this.AuthMe(); //token does not exist? get a new one

    authToken = localStorage.getItem("AuthToken"); // refetch token now that it is new

    if (!authToken) {
      console.error("ERROR: Could not find auth token, and could not make a new one. Is the API running?");
      return null;
    }
    const url = requestProps.url;
    const method = requestProps.method;
    const body = requestProps.body;
    const headers = requestProps.headers ? requestProps.headers : new Map<string, string>();
    headers.set("Authorization", authToken); //add the auth token to the headers
    headers.set("Content-Type", "application/json"); //add the content type to the headers

    try {
      const request: RequestProps = {
        url: url,
        method: method,
        body: body,
        headers: headers,
        enableLog: true
      }

      responseFromApi = await this.SendRequestToAPi(request)
      if (!responseFromApi) {
        console.error("ERROR: Could not send request to API. Check console for details.");
        return null;
      }
      return responseFromApi;


    } catch (error) {
      console.error("ERROR: Could not send request to API. Check console for details.", error);
    }

  }

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
  public async PUTArticleChangeContent(id: number, data: string, enableLog = true) {
    try {
      const response = await this.SendAuthorizedRequest({
        url: `/Article/with-file-as-string`,
        method: HttpMethodType.Put,
        body: {
          Id: id,
          FileAsRawString: data,
        },
      });

      if (!response) {
        if (enableLog) console.error("Failed to PUT file as string: No response from API");
        return null;
      }

      if (!response.ok) {
        if (enableLog) console.error("Failed to PUT file as string:", response.status, response.statusText);
        return null;
      }

      return response;
    } catch (error) {
      if (enableLog) console.error("Error occurred while sending PUT request:", error);
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
  public async DELETEArticleContent(id: number) {
    const response = await this.SendAuthorizedRequest(
      {
        url: `Article/remove-content/${id}`,
        method: HttpMethodType.Put,
        body: {}
      }
    )
    if (!response || !response.ok) {
      console.error("Failed to remove content from article:", response?.status, response?.statusText);
      return null;
    }
    return response;
  }

  /**
   * THIS DELETE THE WHOLE ARTICLE.
   * 
   * Removes an article by its ID. 
   * 
   * @param id - The unique identifier of the article to remove content from.
   * @returns A Promise that resolves to the Response object if successful, or null if the request fails.
   */
  public async DELETEArticle(id: number) {
    const response = await this.SendAuthorizedRequest(
      {
        url: `Article/${id}`,
        method: HttpMethodType.Delete,
        body: {}
      }
    )
    if (!response || !response.ok) {
      console.error("Failed to delete article:", response?.status, response?.statusText);
      return null;
    }
    return response;
  }


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
  public async GETAllArticles() {
    const response = await this.SendAuthorizedRequest(
      {
        url: "Article",
        body: {},
        method: HttpMethodType.Get
      }
    );
    if (!response || !response.ok) {
      console.error("Failed to fetch all articles:", response?.status, response?.statusText);
      return null;
    }
    return response
  }


  /**
   * Fetches an article by its ID using an authorized API request.
   *
   * @param idOfArticle - The unique identifier of the article to retrieve.
   * @returns A promise that resolves to the response of the API call.
   */
  public async GETArticleById(idOfArticle: number) {
    const response = await this.SendAuthorizedRequest(
      {
        url: `api/Article/${idOfArticle}`,
        method: HttpMethodType.Get,
        body: {}
      }
    );
    if (!response || !response.ok) {
      console.error(`Failed to fetch article by ID (${idOfArticle}):`, response?.status, response?.statusText);
      return null;
    }
    return response
  }


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
  public async GETAllArticlesWithTitleAndDescription() {
    const response = await this.SendAuthorizedRequest(
      {
        url: `Article/TitleDescription`,
        body: {},
        method: HttpMethodType.Get
      }
    )
    if (!response || !response.ok) {
      console.error("Failed to fetch all articles with titles and descriptions:", response?.status, response?.statusText);
      return null;
    }
    return response
  }


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
  public async GETAllArticlesAsCardDTO() {
    const response = await this.SendAuthorizedRequest(
      {
        url: `Article/CardDisplay`,
        body: {},
        method: HttpMethodType.Get
      }
    )
    if (!response || !response.ok) {
      console.error("Failed to fetch all articles as CardDTO:", response?.status, response?.statusText);
      return null;
    }
    return response
  }

};

export default AuthorizedApiService;
