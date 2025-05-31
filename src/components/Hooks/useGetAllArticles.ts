import { useQuery } from "@tanstack/react-query";
import ApiService from "../../Services/ApiService";
import { ArticleProps } from "../../Types/types";

const apiService = ApiService();

export function useGetAllArticles() {
  return useQuery<ArticleProps[]>({
    queryKey: ["articles"],
    queryFn: apiService.Articles,
  });
}
