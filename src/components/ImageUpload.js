import { useState } from "react";
import { isValidImageFile } from "../utils/imageUpload";
import "./ImageUpload.css";

function ImageUpload({ onImageSelect, currentImageUrl = null, disabled = false }) {
  const [preview, setPreview] = useState(currentImageUrl);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) {
      setPreview(currentImageUrl);
      onImageSelect(null);
      return;
    }

    if (!isValidImageFile(file)) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size too large. Please upload an image smaller than 5MB.");
      } else {
        setError("Invalid file type. Please upload a JPG, PNG, or WebP image.");
      }
      setPreview(currentImageUrl);
      onImageSelect(null);
      e.target.value = ""; // Reset input
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onImageSelect(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setError("");
    onImageSelect(null);
    // Reset file input
    const fileInput = document.getElementById("vehicle-image-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="image-upload-container">
      <label htmlFor="vehicle-image-input" className="image-upload-label">
        Vehicle Image <span className="required">*</span>
      </label>

      <div className="image-upload-content">
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Vehicle preview" />
            {!disabled && (
              <button
                type="button"
                className="btn btn-sm btn-danger remove-image-btn"
                onClick={handleRemove}
              >
                Remove
              </button>
            )}
          </div>
        )}

        {!disabled && (
          <div className="file-input-wrapper">
            <input
              type="file"
              id="vehicle-image-input"
              className="file-input"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={disabled}
            />
            <label htmlFor="vehicle-image-input" className="file-input-label">
              {preview ? "Change Image" : "Choose Image"}
            </label>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <small className="form-text">
          Upload a JPG, PNG, or WebP image (max 5MB)
        </small>
      </div>
    </div>
  );
}

export default ImageUpload;
