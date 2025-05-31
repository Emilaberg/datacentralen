import Avatar from "../../Avatar";
import MarkdownFormatter from "../../../Services/MarkdownFormatter";
import LikeTab from "../../LikeTab/LikeTab";
import avatarIcon from "../../../assets/icons/Avatar.jpg";
import { ArticleProps } from "../../../Types/types";

export default function ArticleView({ article }: { article: ArticleProps }) {
  return (
    <section className="flex flex-col w-full h-full p-5 gap-5 items-center justify-center">
      <div className="flex flex-col justify-start min-w-2/4 h-[275px] pl-15 pt-15">
        <p className="text-[18px] text-[#777777]">{article.type}</p>
        <h1 className="text-black text-[57px]">{article.title}</h1>
        <Avatar img={avatarIcon} name={article.author} date={article.posted} />
      </div>
      <hr className="w-2/4" />
      <article className="w-2/4 flex flex-col justify-center mt-2">
        <MarkdownFormatter articleContent={article.content} />
      </article>
      <LikeTab likes={article.likes ?? 0} articleId={article.id} />
    </section>
  );
}
