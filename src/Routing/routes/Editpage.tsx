import { useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

const Editpage = () => {
  const [previewText, setPreviewText] = useState<string>(
    localStorage.getItem("savedString") || "din uppladdade fil syns här..."
  );

  // Läser in HTML eller Markdown-fil
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    const fileName = uploadedFile.name;
    const fileExt = fileName.split(".").pop()?.toLowerCase();

    let rawContent = await uploadedFile.text();

    if (fileExt === "html") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawContent, "text/html");
      rawContent = doc.body.innerHTML;
    }

    if (fileExt === "md") {
      rawContent = await marked.parse(rawContent);
    }

    setPreviewText(rawContent);
  };

  const handlePublish = () => {
    localStorage.setItem("savedString", previewText);
  };

  const handleDelete = () => {
    const fileInput = document.getElementById("uploadFile") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    localStorage.removeItem("savedString");
    setPreviewText("");
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-50">
      <article className="w-1/2 my-10">
        <span className="text-[#777777] text-lg font-light">
          datastrukturer
        </span>
        <h1 className="text-5xl">HASH TABLE</h1>
        <p className="text-[#777777] text-lg font-light">
          hur fungerar hash tables
        </p>
        <div className="flex items-center gap-2 my-5">
          <img
            src="sds"
            alt="profil "
            className="w-10 h-10 rounded-full bg-gray-300"
          />
          <div>
            <h1 className="font-semibold text-lg">Admin</h1>
            <span className="text-[#777777] font-light">FEB 26, 2025</span>
          </div>
        </div>
      </article>

      <hr className="border-2 w-1/2 border-[#777777] my-10" />

      <div className="my-2 text-center">
        <h1 className="font-semibold text-xl mb-2">Ladda upp en fil</h1>
        <input
          className="bg-gray-200 px-2 py-1 border border-black my-2"
          onChange={handleFileUpload}
          type="file"
          id="uploadFile"
          accept=".md, .html"
        />

        <div className="flex gap-4 justify-center mt-4">
          <button
            className={`${
              previewText.length > 100
                ? "bg-green-500"
                : "bg-gray-400 pointer-events-none"
            } text-white font-semibold px-4 py-2 rounded-xl`}
            type="button"
            onClick={handlePublish}
          >
            Save and publish
          </button>

          <button
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded-xl"
            onClick={handleDelete}
          >
            Delete from saved
          </button>
        </div>
      </div>

      <article className="w-1/2 mx-auto border-dashed border border-black p-6 my-10 bg-white">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(previewText, {
              ALLOWED_ATTR: ["href", "target", "rel", "style"],
            }),
          }}
        ></div>
      </article>
    </section>
  );
};

export default Editpage;
