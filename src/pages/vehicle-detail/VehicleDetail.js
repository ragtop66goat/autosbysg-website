import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { InventoryContext } from "../../context/Inventory";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { PiEngineDuotone } from "react-icons/pi";
import { BsCurrencyDollar, BsChevronLeft } from "react-icons/bs";
import "./VehicleDetail.css";

function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inventory, getInventoryData } = useContext(InventoryContext);
  const [vehicle, setVehicle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (inventory.length === 0) {
      getInventoryData();
    }
  }, [inventory, getInventoryData]);

  useEffect(() => {
    if (inventory.length > 0) {
      const foundVehicle = inventory.find((item) => item.id === id);
      if (foundVehicle) {
        setVehicle(foundVehicle);
      } else {
        navigate("/inventory");
      }
    }
  }, [inventory, id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert(
      `Thank you for your interest in the ${vehicle.title}! We'll contact you soon.`
    );
    setShowContactForm(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  if (!vehicle) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const images = vehicle.images || [vehicle.image];

  return (
    <div className="vehicle-detail-page">
      <div className="container mt-4 mb-5">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/inventory">Inventory</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {vehicle.title}
            </li>
          </ol>
        </nav>

        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => navigate("/inventory")}
        >
          <BsChevronLeft /> Back to Inventory
        </button>

        <div className="row">
          <div className="col-lg-7">
            <div className="image-gallery">
              <div className="main-image mb-3">
                <img
                  src={images[selectedImage]}
                  alt={vehicle.title}
                  className="img-fluid rounded"
                />
              </div>

              {images.length > 1 && (
                <div className="thumbnail-container">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${vehicle.title} view ${idx + 1}`}
                      className={`thumbnail ${
                        selectedImage === idx ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Information Section */}
          <div className="col-lg-5">
            <div className="vehicle-info">
              <h1 className="vehicle-title">{vehicle.title}</h1>

              <div className="price-section mb-4">
                <h2 className="vehicle-price">
                  <BsCurrencyDollar />
                  {vehicle.price}
                </h2>
              </div>

              {/* Key Specifications */}
              <div className="key-specs mb-4">
                <div className="spec-item">
                  <LiaTachometerAltSolid className="spec-icon" />
                  <div>
                    <small className="text-muted">Mileage</small>
                    <p className="mb-0">{vehicle.miles}</p>
                  </div>
                </div>
                <div className="spec-item">
                  <PiEngineDuotone className="spec-icon" />
                  <div>
                    <small className="text-muted">Engine</small>
                    <p className="mb-0">{vehicle.engine}</p>
                  </div>
                </div>
              </div>

              {/* Features & Options */}
              {vehicle.options && vehicle.options.length > 0 && (
                <div className="features-section mb-4">
                  <h4>Features & Options</h4>
                  <ul className="features-list">
                    {vehicle.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Buttons */}
              <div className="action-buttons">
                <button
                  className="btn btn-primary btn-lg w-100 mb-2"
                  onClick={() => setShowContactForm(!showContactForm)}
                >
                  {showContactForm
                    ? "Hide Contact Form"
                    : "Contact About This Vehicle"}
                </button>
                <a
                  href="tel:+12162816432"
                  className="btn btn-outline-primary btn-lg w-100"
                >
                  Call Us: (216) 281-6432
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div className="row mt-4">
            <div className="col-lg-8 mx-auto">
              <div className="contact-form-container">
                <h3>Interested in this {vehicle.title}?</h3>
                <p className="text-muted">
                  Fill out the form below and we'll get back to you soon!
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="I'm interested in this vehicle. Please contact me with more information."
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="additional-info">
              <h3>About S-G Auto Sales</h3>
              <p>
                We are a family-owned and operated used car dealership serving
                Cleveland, Ohio for over 60 years. All our vehicles are
                carefully inspected and ready to drive. Visit us at 6409 Denison
                Ave, Cleveland, OH 44102.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
