import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadDocuments = () => {
  const [files, setFiles] = useState({
    SalarySlip: null,
    pan: null,
    license: null,
    photo: null,
  });

  const [loading, setLoading] = useState({
    SalarySlip: false,
    pan: false,
    license: false,
    photo: false,
  });

  const [errors, setErrors] = useState({});

  const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  const maxSize = 320 * 1024; // 320 KB

  // Retrieve stored files from localStorage on component mount
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedDocuments"));
    if (storedFiles) {
      setFiles(storedFiles);
    }
  }, []);

  const validateFile = (file) => {
    if (!file) return "No file selected!";
    if (!allowedTypes.includes(file.type))
      return "Invalid file type! Only PNG, JPG, and GIF are allowed.";
    if (file.size > maxSize) return `File size exceeds 320KB!`;
    return null;
  };

  const handleFileChange = (event, key) => {
    const file = event.target.files[0];
    const validationError = validateFile(file);

    if (validationError) {
      setErrors((prev) => ({ ...prev, [key]: validationError }));
      return;
    }

    setLoading((prev) => ({ ...prev, [key]: true }));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const fileData = {
        name: file.name,
        type: file.type,
        data: reader.result, // Base64 encoded string
      };

      setFiles((prev) => {
        const updatedFiles = { ...prev, [key]: fileData };
        localStorage.setItem("uploadedDocuments", JSON.stringify(updatedFiles));
        return updatedFiles;
      });

      setLoading((prev) => ({ ...prev, [key]: false }));
      setErrors((prev) => ({ ...prev, [key]: null }));

      toast.success(`${key.toUpperCase()} uploaded successfully!`);
    };
  };

  const handleRemoveFile = (key) => {
    setFiles((prev) => {
      const updatedFiles = { ...prev, [key]: null };
      localStorage.setItem("uploadedDocuments", JSON.stringify(updatedFiles));
      return updatedFiles;
    });

    toast.info(`${key.toUpperCase()} removed!`);
  };

  const isUploading = Object.values(loading).some((status) => status);

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload Your Documents</h2>

      <div className="upload-row">
        {["SalarySlip", "pan", "license", "photo"].map((key) => (
          <div className="upload-box" key={key}>
            <label className="upload-label">
              {key.replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <label htmlFor={`${key}-file`} className="dropzone">
              <div className="dropzone-content">
                {loading[key] ? (
                  <div className="loader"></div>
                ) : files[key] ? (
                  <div className="preview-container">
                    <img
                      src={files[key].data} // Base64 image
                      alt={`${key} preview`}
                      className="file-preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <AiOutlineCloudUpload size={40} />
                    <p>
                      <strong>Click to upload</strong> or drag & drop
                    </p>
                    <p className="upload-hint">PNG, JPG, GIF (Max: 320KB)</p>
                  </>
                )}
              </div>
              <input
                id={`${key}-file`}
                type="file"
                className="file-input"
                onChange={(e) => handleFileChange(e, key)}
                aria-label={`Upload ${key}`}
              />
            </label>
            {errors[key] && <p className="error">{errors[key]}</p>}
            {files[key] && (
              <div className="file-actions">
                <p className="file-name">Selected: {files[key].name}</p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFile(key)}
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isUploading && (
        <div className="fullscreen-loader">
          <div className="loader-content">
            <span className="spinner"></span>
            <p>Uploading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
