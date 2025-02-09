import { useState, useRef, useEffect } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const isFileValid = validTypes.some((type) => file.type.includes(type));

    if (!isFileValid) {
      alert("Please upload an image (JPEG, PNG, GIF) or PDF file");
      return;
    }

    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">File Upload And Preview</h1>

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          accept="image/*, .pdf"
        />

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer transition-colors
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onClick={handleUploadClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-gray-600">
            {isDragging
              ? "Drop file here"
              : "Click to select OR Drag and drop file"}
          </p>
        </div>

        {preview && selectedFile && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Preview:</h3>
            {selectedFile.type.startsWith("image/") ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto object-contain rounded-lg"
              />
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700">
                  {selectedFile.name} ({selectedFile.type})
                </p>
              </div>
            )}
          </div>
        )}

        {selectedFile && (
          <div className="flex justify-between items-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
              onClick={() => console.log("Upload file")}
            >
              Upload File
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
