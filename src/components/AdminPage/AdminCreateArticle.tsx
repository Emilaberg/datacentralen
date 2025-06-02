import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { useLocation } from "react-router-dom";
import { ArticleProps } from "../../Types/types";
import ArticleView from "./components/ArticleView";
import FileUpload from "./components/FileUpload";
import ColorPreview from "./components/ColorPreview";
import AuthorizedApiService from "../../Services/AuthorizedApiService";
import ConfirmModal from "./Modals/ConfirmModal";
import { RgbaColorPicker } from "react-colorful";
import "./admin.css";

const typeOptions = [
  { label: "Sorteringsalgoritm", value: "Sorteringsalgoritm" },
  { label: "Datastruktur", value: "Datastruktur" },
];

// Helper to convert RGBA to CSS rgba() string
function rgbaToString({
  r,
  g,
  b,
  a,
}: {
  r: number;
  g: number;
  b: number;
  a: number;
}) {
  return `rgba(${r},${g},${b},${a})`;
}

export default function AdminCreateArticle() {
  const location = useLocation();
  const article = (location.state as { article?: ArticleProps })?.article;
  const api = AuthorizedApiService();

  const [isEditMode, setIsEditMode] = useState(!!article);

  const [originalArticle, setOriginalArticle] = useState<ArticleProps | null>(
    article || null
  );
  const [title, setTitle] = useState(article?.title || "");
  const [author, setAuthor] = useState(article?.author || "");
  const [description, setDescription] = useState(article?.description || "");
  const [content, setContent] = useState(article?.content || "");
  const [type, setType] = useState(article?.type || typeOptions[0].value);
  const [colorOne, setColorOne] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [colorTwo, setColorTwo] = useState({ r: 112, g: 219, b: 178, a: 1 });
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [showColorOnePicker, setShowColorOnePicker] = useState(false);
  const [showColorTwoPicker, setShowColorTwoPicker] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const colorOneRef = useRef<HTMLDivElement>(null);
  const colorTwoRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setContent("");
    setType(typeOptions[0].value);
    setColorOne({ r: 0, g: 0, b: 0, a: 1 });
    setColorTwo({ r: 112, g: 219, b: 178, a: 1 });
  };

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorOneRef.current &&
        !colorOneRef.current.contains(event.target as Node)
      ) {
        setShowColorOnePicker(false);
      }
      if (
        colorTwoRef.current &&
        !colorTwoRef.current.contains(event.target as Node)
      ) {
        setShowColorTwoPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (isEditMode && originalArticle) {
        // EDIT MODE
        response = await api.PUTFullArticleUpdate(originalArticle.id, {
          id: originalArticle.id,
          title,
          author,
          description,
          type,
          colorCodeOne: rgbaToString(colorOne),
          colorCodeTwo: rgbaToString(colorTwo),
          content,
        });
      } else {
        // CREATE MODE
        response = await api.POSTArticle(
          {
            title,
            author,
            description,
            content,
            type,
            colorCodeOne: rgbaToString(colorOne),
            colorCodeTwo: rgbaToString(colorTwo),
            posted: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            likes: 0,
          },
          true
        );
      }

      if (response && response.ok) {
        setSuccessModalOpen(true);

        if (isEditMode && originalArticle) {
          setOriginalArticle({
            ...originalArticle,
            title,
            author,
            description,
            content,
            type,
            colorCodeOne: rgbaToString(colorOne),
            colorCodeTwo: rgbaToString(colorTwo),
          });
        }
      } else {
        setError("Något gick fel vid sparandet.");
      }
    } catch (err: any) {
      setError(err.message || "Något gick fel vid sparandet.");
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
    colorCodeOne: rgbaToString(colorOne),
    colorCodeTwo: rgbaToString(colorTwo),
    posted: new Date(),
    lastEdited: new Date(),
    likes: 0,
    articleContentId: 0,
    articleContent: {
      id: 0,
      content,
      articleId: 0,
    },
  };

  // Helper to check if any changes were made (only in edit mode)
  const isArticleChanged = () => {
    if (!originalArticle) return true; // Always enabled in create mode
    return (
      title !== originalArticle.title ||
      author !== originalArticle.author ||
      description !== originalArticle.description ||
      content !== (originalArticle as any).content ||
      type !== originalArticle.type ||
      rgbaToString(colorOne) !==
        rgbaToString(originalArticle.colorCodeOne as any) ||
      rgbaToString(colorTwo) !==
        rgbaToString(originalArticle.colorCodeTwo as any)
    );
  };

  const handleSwitchToCreate = () => {
    setIsEditMode(false);
    setOriginalArticle(null);
    resetForm();
  };

  return (
    <AdminLayout>
      <div className="w-full mt-20 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Redigera artikel" : "Skapa ny artikel"}
        </h2>
        {isEditMode && (
          <div className="relative w-auto mb-2">
            <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded">
              <span className="font-semibold">* Observera:</span> Du är i{" "}
              <b>redigeringsläge</b> just nu. Vill du skapa en ny artikel
              istället?
            </div>
            <div className="absolute mt-2" style={{ left: 0, top: "100%" }}>
              <button
                type="button"
                className="mt-1 px-2 py-1 text-xs bg-yellow-300 hover:bg-yellow-400 rounded border border-yellow-500 text-yellow-900 transition"
                onClick={handleSwitchToCreate}
              >
                Byt till skapa ny artikel
              </button>
            </div>
          </div>
        )}
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
          <form className="w-2/4 flex flex-col gap-4" onSubmit={handleSubmit}>
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
                      <div
                        className="w-12 h-12 rounded-full border cursor-pointer"
                        style={{
                          background: rgbaToString(colorOne),
                          border: "2px solid #ccc",
                        }}
                        onClick={() => setShowColorOnePicker((v) => !v)}
                      />

                      {showColorOnePicker && (
                        <div
                          ref={colorOneRef}
                          className="absolute z-50 mt-2"
                          style={{ left: "60px" }}
                        >
                          <RgbaColorPicker
                            color={colorOne}
                            onChange={setColorOne}
                          />
                        </div>
                      )}
                      <input
                        className="border rounded px-2 py-1 w-36"
                        value={rgbaToString(colorOne)}
                        readOnly
                      />
                    </div>
                  </label>
                  <label className="flex flex-col items-start">
                    Färgkod 2:
                    <div className="flex items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-full border cursor-pointer"
                        style={{
                          background: rgbaToString(colorTwo),
                          border: "2px solid #ccc",
                        }}
                        onClick={() => setShowColorTwoPicker((v) => !v)}
                      />

                      {showColorTwoPicker && (
                        <div
                          ref={colorTwoRef}
                          className="absolute z-50 mt-2"
                          style={{ left: "60px" }}
                        >
                          <RgbaColorPicker
                            color={colorTwo}
                            onChange={setColorTwo}
                          />
                        </div>
                      )}
                      <input
                        className="border rounded px-2 py-1 w-36"
                        value={rgbaToString(colorTwo)}
                        readOnly
                      />
                    </div>
                  </label>
                </div>
                <ColorPreview
                  gradientColor1={rgbaToString(colorOne)}
                  gradientColor2={rgbaToString(colorTwo)}
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
                  className={`mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition self-end
    ${
      isLoading || (isEditMode ? !isArticleChanged() : false)
        ? "opacity-50 cursor-not-allowed"
        : ""
    }`}
                  disabled={
                    isLoading || (isEditMode ? !isArticleChanged() : false)
                  }
                >
                  {isLoading
                    ? isEditMode
                      ? "Sparar..."
                      : "Skapar..."
                    : isEditMode
                    ? "Spara ändringar"
                    : "Skapa"}
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
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
        <ConfirmModal
          open={successModalOpen}
          title={isEditMode ? "Ändringar sparade" : "En ny artikel har skapats"}
          message={
            isEditMode
              ? "Ändringar till artikeln sparad."
              : "Artikeln skapades!"
          }
          buttons={[
            {
              label: "OK",
              onClick: () => {
                setSuccessModalOpen(false);
                if (!isEditMode) resetForm();
              },
              className:
                "px-4 py-2 rounded bg-transparant text-black border-1 border-black hover:bg-gray-400",
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
