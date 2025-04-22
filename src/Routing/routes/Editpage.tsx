import { useState, useRef } from "react";
import DOMPurify from "dompurify";
import AuthorizedApiService from "../../Services/AuthorizedApiService";
import DisplayAllArticles from "../../components/DisplayAllArticles/DisplayAllArticles";
import Modal from "../../components/Modal/Modal";

const Editpage = () => {
  const [previewText, setPreviewText] = useState<string>(
    localStorage.getItem("savedString") || "din uppladdade fil syns här..."
  );

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isClearStorageModalOpen, setIsClearStorageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [chosenID, setChosenID] = useState<number>(-1);
  const articlesRef = useRef<() => void | null>(null); // Reference to trigger re-fetch in DisplayAllArticles

  const handleFileUpload = async (event: object) => {
    const uploadedFile = event.target.files.item(0);

    const fileName = uploadedFile.name;
    const fileExt = fileName.split(".").pop()?.toLowerCase();

    let rawContent = await uploadedFile.text();

    if (fileExt === "html") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawContent, "text/html");
      rawContent = doc.body.innerHTML;
    }

    setPreviewText(rawContent);
  };

  const handlePublish = async () => {
    localStorage.setItem("savedString", JSON.stringify(previewText));

    try {
      const apiService = AuthorizedApiService(); // Call ApiService to get the methods
      // Call the ArticleChangeContent method
      const response = await apiService.PUTArticleChangeContent(
        chosenID,
        previewText
      );

      if (response && response.ok) {
        console.log("Publish successful");

        // Trigger re-fetch of articles in DisplayAllArticles
        if (articlesRef.current) {
          articlesRef.current();
        }
      } else {
        console.error(
          "Failed to publish article:",
          response?.status,
          response?.statusText
        );
        return;
      }
    } catch (error) {
      console.error("Error publishing article:", error);
      return;
    }

    setIsPublishModalOpen(true);
  };

  const handleDelete = () => {
    const fileInput = document.getElementById("uploadFile") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    localStorage.removeItem("savedString");
    setPreviewText("");
    setIsClearStorageModalOpen(true);
  };
  const handleDeleteFromDatabase = async () => {
    setChosenID(-1);
    try {
      const apiService = AuthorizedApiService(); // Call ApiService to get the methods

      const response = await apiService.DELETEArticle(chosenID);

      if (response && response.ok) {
        console.log("Delete successful");
        console.log("4");
        // Trigger re-fetch of articles in DisplayAllArticles
        if (articlesRef.current) {
          articlesRef.current();
        }
      } else {
        console.log("5");
        console.error(
          "Failed to delete article:",
          response?.status,
          response?.statusText
        );
        return;
      }
    } catch (error) {
      console.log("6");
      console.error("Error deleting article:", error);
      return;
    }
    setIsDeleteModalOpen(true);
  };

  return (
    <section className="min-h-screen flex flex-col items-center ">
      <Modal
        modalVisible={isPublishModalOpen}
        setModalVisible={setIsPublishModalOpen}
        modalText="Success!"
      ></Modal>
      <Modal
        modalVisible={isClearStorageModalOpen}
        setModalVisible={setIsClearStorageModalOpen}
        modalText="Cleared local storage"
      ></Modal>
      <Modal
        modalVisible={isDeleteModalOpen}
        setModalVisible={setIsDeleteModalOpen}
        modalText={`Deleted article with id:${chosenID}`}
      ></Modal>

      <article className="flex flex-col items-center justify-between h-40 mt-10">
        <h1 className="text-6xl text-[#777777] capitalize">dashboard</h1>
        <h1 className="text-xl text-[#777777] capitalize">
          tillgängliga artiklar
        </h1>
      </article>

      <div className="w-1/2">
        <DisplayAllArticles
          count={chosenID}
          setCount={setChosenID}
          setRefetchCallback={(callback) => (articlesRef.current = callback)} // Pass re-fetch callback
        />
      </div>

      <div className="my-2 space-y-2">
        <h1>ladda upp en fil</h1>

        <input
          className="bg-gray-200 px-2 py-1 border border-black my-2"
          onChange={handleFileUpload}
          type="file"
          id="uploadFile"
          accept=".md, .html"
        />

        <button
          className="bg-green-600 hover:bg-green-700 cursor-pointer block text-white font-semibold mx-auto px-4 py-2 rounded-xl disabled:opacity-25 disabled:cursor-not-allowed"
          disabled={chosenID === -1}
          type="button"
          onClick={handlePublish}
        >
          uppdatera
        </button>

        <button
          disabled={previewText === "din uppladdade fil syns här..."}
          className="bg-red-400 hover:bg-red-500 cursor-pointer block text-white font-semibold mx-auto px-4 py-2 rounded-xl disabled:opacity-25 disabled:cursor-not-allowed"
          onClick={() => handleDelete()}
        >
          rensa uppladdad fil
        </button>
        <button
          className="bg-red-400 hover:bg-red-500 cursor-pointer block text-white font-semibold mx-auto px-4 py-2 rounded-xl disabled:opacity-25 disabled:cursor-not-allowed"
          onClick={() => handleDeleteFromDatabase()}
          disabled={chosenID === -1}
        >
          radera artikel
        </button>
        
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
