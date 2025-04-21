
import { useContext, useState, useRef } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import ApiService from "../../Services/ApiService";
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

  const handlePublish = async (event: object) => {
    localStorage.setItem("savedString", JSON.stringify(previewText));

    try {
      const apiService = AuthorizedApiService(); // Call ApiService to get the methods      
      // Call the ArticleChangeContent method
      const response = await apiService.PUTArticleChangeContent(chosenID, previewText);

      if (response && response.ok) {
        console.log("Publish successful");

        // Trigger re-fetch of articles in DisplayAllArticles
        if (articlesRef.current) {
          articlesRef.current();
        }
      } else {
        console.error("Failed to publish article:", response?.status, response?.statusText);
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
    try {
      const apiService = AuthorizedApiService(); // Call ApiService to get the methods
        
      const response = await apiService.DELETEArticleContent(chosenID);
      if (response && response.ok) {
        console.log("Delete successful");
        console.log("4");
        // Trigger re-fetch of articles in DisplayAllArticles
        if (articlesRef.current) {
          articlesRef.current();
        }
      } else {
        console.log("5");
        console.error("Failed to delete article:", response?.status, response?.statusText);
        return;
      }
    } catch (error) {
      console.log("6");
      console.error("Error deleting article:", error);
      return;
    }
    setIsDeleteModalOpen(true);
  }

  return (

    <section className="min-h-screen flex flex-col items-center bg-gray-50">
      <Modal modalVisible={isPublishModalOpen} setModalVisible={setIsPublishModalOpen} modalText="Success!"></Modal>
      <Modal modalVisible={isClearStorageModalOpen} setModalVisible={setIsClearStorageModalOpen} modalText="Cleared local storage"></Modal>
      <Modal modalVisible={isDeleteModalOpen} setModalVisible={setIsDeleteModalOpen} modalText="Deleted content in database"></Modal>

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
          className="bg-green-500 cursor-pointer block text-white font-semibold mx-auto px-4 py-2 rounded-xl disabled:opacity-55"
          disabled={chosenID === -1}
          type="button"
          onClick={(e) => handlePublish(e)}
        >
          Save and publish
        </button>

        <button
          className="bg-red-400 cursor-pointer block text-white font-semibold mx-auto px-4 py-2 rounded-xl"
          onClick={() => handleDelete()}
        >
          Clear local storage
        </button>

        <button
          className="bg-red-400 cursor-pointer block text-white font-semibold mx-auto px-4 py-2 rounded-xl"
          onClick={() => handleDeleteFromDatabase()}
          disabled={chosenID === -1}
        >
          Delete from database
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