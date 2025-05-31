import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useLocation } from "react-router-dom";
import { ArticleProps } from "../../Types/types";
import "./admin.css";

const typeOptions = [
  { label: "Sorteringsalgoritm", value: "Sorteringsalgoritm" },
  { label: "Datastruktur", value: "Datastruktur" },
];

export default function AdminCreateArticle() {
  const location = useLocation();
  const article = (location.state as { article?: ArticleProps })?.article;

  const [title, setTitle] = useState(article?.title || "");
  const [author, setAuthor] = useState(article?.author || "");
  const [description, setDescription] = useState(article?.description || "");
  const [content, setContent] = useState(article?.content || "");
  const [type, setType] = useState(article?.type || typeOptions[0].value);
  const [colorCodeOne, setColorCodeOne] = useState(
    article?.colorCodeOne || "#000000"
  );
  const [colorCodeTwo, setColorCodeTwo] = useState(
    article?.colorCodeTwo || "#ffffff"
  );

  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize both textareas
  React.useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height =
        descriptionRef.current.scrollHeight + "px";
    }
  }, [description]);
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  return (
    <AdminLayout>
      <div className="w-full mt-20 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          {article ? "Redigera artikel" : "Skapa ny artikel"}
        </h2>
        <form className="w-full max-w-lg flex flex-col gap-4">
          <label>
            Titel:
            <input
              className="border rounded px-2 py-1 w-full overflow-x-auto"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Beskrivning:
            <textarea
              ref={descriptionRef}
              className="border rounded px-2 py-1 w-full resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={1}
              style={{ minHeight: "60px", overflow: "hidden" }}
            />
          </label>
          <label>
            Författare:
            <input
              className="border rounded px-2 py-1 w-full overflow-x-auto"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
          <label>
            Innehåll:
            <textarea
              ref={textareaRef}
              className="border rounded px-2 py-1 w-full resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={1}
              style={{ minHeight: "100px", overflow: "hidden" }}
            />
          </label>
          <label>
            Typ:
            <select
              className="border rounded px-2 py-1 w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-4">
            <label className="flex flex-col items-start">
              Färgkod 1:
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colorCodeOne}
                  onChange={(e) => setColorCodeOne(e.target.value)}
                  className="w-12 h-12 rounded-full appearance-none cursor-pointer"
                  style={{ border: "none", padding: 0 }}
                />
                <input
                  className="border rounded px-2 py-1 w-28"
                  value={colorCodeOne}
                  onChange={(e) => setColorCodeOne(e.target.value)}
                />
              </div>
            </label>
            <label className="flex flex-col items-start">
              Färgkod 2:
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colorCodeOne}
                  onChange={(e) => setColorCodeOne(e.target.value)}
                  className="w-12 h-12 rounded-full appearance-none outline-none border-none border-transparent cursor-pointer"
                  style={{
                    padding: 0,
                    background: "none",
                    boxShadow: "none",
                  }}
                />
                <input
                  className="border rounded px-2 py-1 w-28"
                  value={colorCodeTwo}
                  onChange={(e) => setColorCodeTwo(e.target.value)}
                />
              </div>
            </label>
          </div>
          {/* Add your submit button and logic here */}
        </form>
      </div>
    </AdminLayout>
  );
}
