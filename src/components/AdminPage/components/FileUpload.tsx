import React from "react";

interface FileUploadProps {
  onUpload: (content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.item(0);
    if (!uploadedFile) return;

    const fileName = uploadedFile.name;
    const fileExt = fileName.split(".").pop()?.toLowerCase();

    let rawContent = await uploadedFile.text();

    if (fileExt === "html") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawContent, "text/html");
      rawContent = doc.body.innerHTML;
    }

    onUpload(rawContent);
  };

  return (
    <div>
      <label
        htmlFor="uploadFile"
        className="inline-block bg-green-500 text-white px-4 py-2 rounded cursor-pointer  transition"
      >
        Ladda upp fil
      </label>
      <input
        id="uploadFile"
        className="hidden"
        onChange={handleFileUpload}
        type="file"
        accept=".md, .html"
      />
    </div>
  );
};

export default FileUpload;
