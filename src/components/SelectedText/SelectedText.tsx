import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Avatar from "../Avatar";
import { useQuery } from "@tanstack/react-query";
import ApiService from "../../Services/ApiService";
import ReactMarkdown from "react-markdown";
import avatarIcon from "../../assets/icons/Avatar.jpg";
import remarkBreaks from "remark-breaks";

export default function SelectedText() {
  const { id } = useParams<{ id: string }>();
  const Article = ApiService();

  const { data: selectedArticle, isLoading } = useQuery({
    queryFn: () => Article.SingleArticle(Number(id)),
    queryKey: ["singleArticle", id],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex flex-col w-full h-full p-5 gap-5 items-center justify-center">
      {isLoading && (
        <div className="flex justify-center items-center">
          <p className="text-5xl opacity-50 font-bold text-black">Loading...</p>
        </div>
      )}
      {!isLoading && selectedArticle && (
        <>
          <div className="flex flex-col justify-start min-w-2/4 h-[275px] pl-15 pt-15   ">
            <p className="text-[18px] text-[#777777]">{selectedArticle.type}</p>
            <h1 className="text-black text-[57px]">{selectedArticle.title}</h1>
            <Avatar
              img={avatarIcon}
              name={selectedArticle.author}
              date={selectedArticle.posted}
            />
          </div>
          <hr className="w-2/4" />
          <article className="w-2/4 flex flex-col justify-center mt-15">
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    {...props}
                  >
                    {children}
                  </a>
                ),
                h1: ({ node, ...props }) => (
                  <h1
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      marginBottom: "2rem",
                    }}
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    style={{
                      fontSize: "3rem",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    style={{ marginBottom: "1rem", lineHeight: "2" }}
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    style={{
                      marginBottom: "1.5rem",
                      paddingLeft: "1.5rem",
                      listStyleType: "disc",
                      gap: "0.5rem",
                    }}
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    style={{
                      marginBottom: "0.5rem",
                      lineHeight: "1.8",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {selectedArticle.content}
            </ReactMarkdown>
          </article>
        </>
      )}
      {!isLoading && !selectedArticle && (
        <div className="flex justify-center items-center">
          <p className="text-2xl text-red-500">Kunde ej hitta din artikel</p>
        </div>
      )}
    </section>
  );
}
