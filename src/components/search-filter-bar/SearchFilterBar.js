import { useState, useEffect } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import "./SearchFilterBar.css";

function SearchFilterBar({ onFilterChange, onClearFilters, filters = {} }) {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
  const [maxMileage, setMaxMileage] = useState(filters.maxMileage || "");

  useEffect(() => {
    setSearchTerm(filters.searchTerm || "");
    setMinPrice(filters.minPrice || "");
    setMaxPrice(filters.maxPrice || "");
    setMaxMileage(filters.maxMileage || "");
  }, [filters]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({
      searchTerm: value,
      minPrice,
      maxPrice,
      maxMileage,
    });
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    onFilterChange({
      searchTerm,
      minPrice: value,
      maxPrice,
      maxMileage,
    });
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    onFilterChange({
      searchTerm,
      minPrice,
      maxPrice: value,
      maxMileage,
    });
  };

  const handleMaxMileageChange = (e) => {
    const value = e.target.value;
    setMaxMileage(value);
    onFilterChange({
      searchTerm,
      minPrice,
      maxPrice,
      maxMileage: value,
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setMaxMileage("");
    onClearFilters();
  };

  const hasActiveFilters =
    searchTerm || minPrice || maxPrice || maxMileage;

  return (
    <div className="search-filter-bar">
      <div className="container">
        <div className="row g-3">
          {/* Search Input */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="search-input-wrapper">
              <BsSearch className="search-icon" />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search by make, model, or year..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search vehicles"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="col-6 col-md-3 col-lg-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinPriceChange}
              aria-label="Min Price"
            />
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              aria-label="Max Price"
            />
          </div>

          {/* Mileage */}
          <div className="col-6 col-md-6 col-lg-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max Mileage"
              value={maxMileage}
              onChange={handleMaxMileageChange}
              aria-label="Max Mileage"
            />
          </div>

          {/* Clear Filters Button */}
          <div className="col-6 col-md-6 col-lg-2">
            <button
              className="btn btn-outline-secondary w-100 clear-filters-btn"
              onClick={handleClear}
              disabled={!hasActiveFilters}
            >
              <BsX className="me-1" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilterBar;
