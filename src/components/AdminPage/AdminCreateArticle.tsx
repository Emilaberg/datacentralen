import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { useLocation } from "react-router-dom";
import { ArticleProps } from "../../Types/types";
import ArticleView from "./components/ArticleView";
import FileUpload from "./components/FileUpload";
import ColorPreview from "./components/ColorPreview";
import ApiService from "../../Services/ApiService";
import AuthorizedApiService from "../../Services/AuthorizedApiService";
import "./admin.css";

const typeOptions = [
  { label: "Sorteringsalgoritm", value: "Sorteringsalgoritm" },
  { label: "Datastruktur", value: "Datastruktur" },
];

export default function AdminCreateArticle() {
  const location = useLocation();
  const article = (location.state as { article?: ArticleProps })?.article;
  const api = AuthorizedApiService();
  const [title, setTitle] = useState(article?.title || "");
  const [author, setAuthor] = useState(article?.author || "");
  const [description, setDescription] = useState(article?.description || "");
  const [content, setContent] = useState(article?.content || "");
  const [type, setType] = useState(article?.type || typeOptions[0].value);
  const [colorCodeOne, setColorCodeOne] = useState(
    article?.colorCodeOne || "#000000"
  );
  const [colorCodeTwo, setColorCodeTwo] = useState(
    article?.colorCodeTwo || "#70dbb2"
  );
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const prevScrollY = window.scrollY;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      window.scrollTo({ top: prevScrollY });
    }
  }, [content, showPreview]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await api.POSTArticle(
        {
          title,
          author,
          description,
          content,
          type,
          colorCodeOne,
          colorCodeTwo,
          posted: new Date(),
          lastEdited: new Date(),
          likes: 0,
        },
        true
      );

      if (response && response.ok) {
        setSuccess(true);
      } else {
        setError("Något gick fel vid skapandet.");
      }
    } catch (err: any) {
      setError(err.message || "Något gick fel vid skapandet.");
    } finally {
      setIsLoading(false);
    }
  };

  const mockArticle: ArticleProps = {
    id: 0,
    title,
    author,
    description,
    content,
    type,
    colorCodeOne,
    colorCodeTwo,
    posted: new Date(),
    lastEdited: new Date(),
    likes: 0,
  };

  return (
    <AdminLayout>
      <div className="w-full mt-20 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          {article ? "Redigera artikel" : "Skapa ny artikel"}
        </h2>
        <div className="flex justify-end w-2/4 mb-2">
          <button
            type="button"
            className="px-3 py-1 border rounded text-sm"
            onClick={() => setShowPreview((v) => !v)}
          >
            {showPreview ? "Redigera" : "Förhandsgranska"}
          </button>
        </div>
        {showPreview ? (
          <ArticleView article={mockArticle} />
        ) : (
          <form className="w-2/4 flex flex-col gap-4" onSubmit={handleCreate}>
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
            <div className="flex gap-4 mb-5 mt-5">
              <div className="flex gap-15 justify-between items-center w-full">
                <div className="flex gap-15 justify-between items-center">
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
                        value={colorCodeTwo}
                        onChange={(e) => setColorCodeTwo(e.target.value)}
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

                <ColorPreview
                  gradientColor1={colorCodeOne}
                  gradientColor2={colorCodeTwo}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <FileUpload
                onUpload={(uploadedContent: string) =>
                  setContent(uploadedContent)
                }
              />
              <div className="flex gap-x-4 mt-2">
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition self-end"
                  onClick={() => setContent("")}
                >
                  Töm
                </button>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition self-end"
                  disabled={isLoading}
                >
                  {isLoading ? "Skapar..." : "Skapa"}
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-600">Artikeln skapades!</p>}
            </div>

            <label>
              Innehåll:
              <textarea
                ref={textareaRef}
                className="border rounded px-5 py-2 w-full resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={1}
                style={{ minHeight: "100px", overflow: "hidden" }}
              />
            </label>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
