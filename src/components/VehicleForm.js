import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { uploadVehicleImage, generateImageId } from "../utils/imageUpload";
import "./VehicleForm.css";

function VehicleForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    price: initialData?.price || "",
    miles: initialData?.miles || "",
    engine: initialData?.engine || "",
    image: initialData?.image || "",
    options: initialData?.options?.join(", ") || "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (file) => {
    setImageFile(file);
    setUploadError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError("");

    try {
      let imageUrl = formData.image;

      // If a new image file was selected, upload it
      if (imageFile) {
        try {
          // Generate UUID for new image
          const uuid = initialData?.uuid || generateImageId();
          imageUrl = await uploadVehicleImage(imageFile, uuid);
        } catch (uploadError) {
          setUploadError(uploadError.message);
          setLoading(false);
          return;
        }
      }

      // Validate that we have an image (either uploaded or existing)
      if (!imageUrl) {
        setUploadError("Please select an image");
        setLoading(false);
        return;
      }

      const vehicleData = {
        ...formData,
        image: imageUrl,
        options: formData.options
          ? formData.options.split(",").map((opt) => opt.trim())
          : [],
      };

      await onSubmit(vehicleData);
    } catch (error) {
      console.error("Form submission error:", error);
      setLoading(false);
    }
  };

  const isEditMode = initialData !== null;

  return (
    <div className="vehicle-form-container">
      <h2>{isEditMode ? "Edit Vehicle" : "Add Vehicle"}</h2>
      <form onSubmit={handleSubmit} className="vehicle-form">
        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., 2020 Honda Accord"
            required
            disabled={loading}
          />
          <small className="form-text">Year, Make, and Model</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">
              Price <span className="required">*</span>
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              placeholder="25,000"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="miles">
              Mileage <span className="required">*</span>
            </label>
            <input
              type="text"
              id="miles"
              name="miles"
              className="form-control"
              value={formData.miles}
              onChange={handleChange}
              placeholder="30,000"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="engine">
            Engine <span className="required">*</span>
          </label>
          <input
            type="text"
            id="engine"
            name="engine"
            className="form-control"
            value={formData.engine}
            onChange={handleChange}
            placeholder="2.0L I-4"
            required
            disabled={loading}
          />
        </div>

        <ImageUpload
          onImageSelect={handleImageSelect}
          currentImageUrl={formData.image}
          disabled={loading}
        />

        {uploadError && (
          <div className="upload-error">
            {uploadError}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="options">Options & Features</label>
          <textarea
            id="options"
            name="options"
            className="form-control"
            value={formData.options}
            onChange={handleChange}
            placeholder="Power Windows, Bluetooth, Backup Camera"
            rows="3"
            disabled={loading}
          />
          <small className="form-text">Separate features with commas</small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VehicleForm;
