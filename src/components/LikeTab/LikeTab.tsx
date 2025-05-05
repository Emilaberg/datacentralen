import { Heart, DownloadSimple } from "@phosphor-icons/react";
import ApiService from "../../Services/ApiService";
import { useState, useEffect } from "react";

export interface LikeTabProps {
  likes: number;
  articleId: number | undefined;
}

export default function LikeTab({
  likes: initialLikes,
  articleId,
}: LikeTabProps) {
  const { UpdateLikes } = ApiService();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    if (articleId !== undefined) {
      const likedArticles = JSON.parse(
        localStorage.getItem("likedArticles") || "[]"
      );
      if (likedArticles.includes(articleId)) {
        setIsLiked(true);
      }
    }
  }, [articleId]);

  const handleUpdateArticle = async () => {
    try {
      if (articleId === undefined) {
        throw new Error("Article ID is undefined");
      }

      const likedArticles = JSON.parse(
        localStorage.getItem("likedArticles") || "[]"
      );

      if (isLiked) {
        await UpdateLikes(articleId, false);
        setLikes((prevLikes) => prevLikes - 1);
        setIsLiked(false);
        const updatedLikedArticles = likedArticles.filter(
          (id: number) => id !== articleId
        );
        localStorage.setItem(
          "likedArticles",
          JSON.stringify(updatedLikedArticles)
        );

        setIsLiked(false);
      } else {
        await UpdateLikes(articleId, true);
        setLikes((prevLikes) => prevLikes + 1);
        setIsLiked(true);
        likedArticles.push(articleId);
        localStorage.setItem("likedArticles", JSON.stringify(likedArticles));

        setIsLiked(true);
      }
    } catch (error) {
      console.error("Failed to toggle article like", error);
    }
  };

  return (
    <div className="h-[200px] min-w-2/4">
      <div className="h-[85px] flex items-center justify-center gap-2 mt-10 border-t-1 border-b-1  border-black ">
        <Heart size={20} color="#F9B66B" />
        <div className="flex gap-2 ">
          <p>{likes}</p>
          <p>Likes</p>
        </div>
      </div>
      <div className="flex justify-between h-26 items-center w-full pr-5 pl-5">
        <button
          onClick={handleUpdateArticle}
          className={`w-16 h-8 rounded-lg border-1 flex items-center justify-center hover:cursor-pointer ${
            isLiked
              ? "bg-[#F9B66B]/50 text-white"
              : "border-black hover:bg-[#F9B66B]/20"
          }`}
        >
          <Heart size={20} color={isLiked ? "#1a1a1a" : "#000000"} />
        </button>
        <DownloadSimple
          size={30}
          className="hover:text-red-500 hover:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
