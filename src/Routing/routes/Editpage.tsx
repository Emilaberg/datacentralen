import { useContext, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import ReactMarkdown from "react-markdown";

const Editpage = () => {
  const [ifEdit, setifEdit] = useState(false);
  const [previewText, setPreviewText] = useState(
    JSON.parse(localStorage.getItem("savedString")) ||
      "din uppladdade fil syns här..."
  );

  const handleFileUpload = async (event: object) => {
    const uploadedFile = event.target.files.item(0);

    console.log(uploadedFile);
    const splitString = uploadedFile.name.split(".");
    const documentType = splitString[splitString.length - 1];

    let textContent = await uploadedFile.text();

    // textContent = await marked(textContent);
    if (documentType === "md") {
    }

    console.log(typeof textContent);
    console.log(marked(textContent));

    setPreviewText(textContent);

    console.log(textContent);
  };

  const handlePublish = (event: object) => {
    localStorage.setItem("savedString", JSON.stringify(previewText));
  };

  const handleDelete = () => {
    const fileUploadBtn = document.querySelector("#uploadFile");

    fileUploadBtn.value = null;
    localStorage.removeItem("savedString");
    setPreviewText("");
  };
  function save(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    const text = document.getElementById("text") as HTMLTextAreaElement;

    setPreviewText(text.value);
  }

  return (
    <section className="min-h-screen flex flex-col items-center">
      <article className="w-1/2 my-10">
        <span className="text-[#777777] text-lg font-light">
          datastrukturer
        </span>
        <h1 className="text-5xl">HASH TABLE</h1>
        <p className="text-[#777777] text-lg font-light">
          hur fungerar hash tables
        </p>
        <div className="flex items-center gap-2 my-5">
          <img src="sds" alt="profil " />
          <div>
            <h1 className="font-semibold text-lg">Admin</h1>
            <span className="text-[#777777] font-light">FEB 26, 2025</span>
          </div>
        </div>
      </article>

      <hr className="border-2 w-1/2 border-[#777777] my-10" />

      <div className="my-2">
        <h1>ladda upp en fil</h1>
        <input
          className="skibiditoilet bg-gray-200 px-2 border-solid border border-black my-2"
          // onInput={(e) => console.log(e.target.files)}
          onInput={(e) => handleFileUpload(e)}
          type="file"
          name=""
          id="uploadFile"
          accept=".md, .html"
        />

        <button onClick={() => setifEdit(!ifEdit)}>edit</button>
        <button onClick={save}>Save</button>
        <button
          className={`${
            previewText.length > 100
              ? "bg-green-500 cursor-pointer block"
              : "hidden"
          } text-white font-semibold mx-auto px-4 py-2 rounded-xl`}
          type="button"
          onClick={(e) => handlePublish(e)}
        >
          Save and publish
        </button>
        <button
          className={`bg-red-400 cursor-pointer block text-white font-semibold mx-auto px-4 py-2 rounded-xl`}
          onClick={() => handleDelete()}
        >
          Delete from saved
        </button>
      </div>

      <article className="w-3/4 mx-auto border-dashed border-1 border-black">
        {/* <SlateEditor /> */}
        {ifEdit ? (
          <ReactMarkdown
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
            {previewText}
          </ReactMarkdown>
        ) : (
          <textarea id="text" className="resize-none w-full h-screen">
            {previewText}
          </textarea>
        )}

        {/* <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(previewText) }}
        ></div> */}
      </article>
    </section>
  );
};

export default Editpage;
