import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function AddClients() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchUploadedImages = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/clients"); 
    setUploadedImages(res.data.data); // `resources` array from Cloudinary
  } catch (err) {
    console.error("Error fetching images:", err);
  }
};


  useEffect(() => {
    fetchUploadedImages();
  }, []);

  // Handle file select
  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles((prev) => {
      const existingNames = prev.map((f) => f.name);
      const newFiles = filesArray.filter((f) => !existingNames.includes(f.name));
      return [...prev, ...newFiles];
    });
    e.target.value = ""; // reset input
  };

  // Upload files
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert("No files selected");

    setUploading(true);
    try {
      for (let file of selectedFiles) {
        const formData = new FormData();
        formData.append("image", file);

        await axios.post("http://localhost:5000/api/clients", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSelectedFiles([]);
      fetchUploadedImages(); // refresh list
      alert("Images uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading images");
    } finally {
      setUploading(false);
    }
  };

  // Remove image (delete from DB + Cloudinary)
  const handleRemoveImage = async (public_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/clients/${public_id}`);
      fetchUploadedImages(); // refresh list
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting image");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-8 md:pl-80 lg:pl-85 pt-24 md:pt-10 lg:pt-20 bg-gradient-to-l from-black to-[#1E1E1E] text-gray-300 min-h-screen pr-8 md:pr-8 lg:pr-16">
        <h1 className="text-[25px] md:text-[35px] font-bold mb-6">
          Add Client Images
        </h1>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Client Images (3 mandatory){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
              className="border border-gray-700 rounded-md p-2 w-full"
            />
            <p className="text-sm text-gray-400 mt-1">
              Selected: {selectedFiles.length}, Uploaded: {uploadedImages.length}{" "}
              (at least 3 required)
            </p>
          </div>

          {/* Preview Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {selectedFiles.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`selected-${idx}`}
                  className="w-full h-40 object-cover rounded-lg border border-gray-700"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || selectedFiles.length === 0}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white mt-4"
          >
            {uploading ? "Uploading..." : "Upload Selected Images"}
          </button>
        </form>

        {/* Uploaded Images from DB */}
        {uploadedImages.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Uploaded Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedImages.map((img) => (
                <div key={img.public_id} className="relative">
                  <img
                    src={img.url}
                    alt="uploaded"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img.public_id)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-[12px] px-1 rounded-[50%]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddClients;
