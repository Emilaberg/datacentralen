import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

export default function MarkdownFormatter({
  articleContent,
}: {
  articleContent: string;
}) {
  return (
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
          <p style={{ marginBottom: "1rem", lineHeight: "2" }} {...props} />
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
      {articleContent}
    </ReactMarkdown>
  );
}
