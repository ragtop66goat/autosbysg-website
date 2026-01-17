/**
 * Parse price string and convert to number
 * @param {string} priceStr - Price string (e.g., "15,000" or "15000")
 * @returns {number} - Parsed price as number
 */
export function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const cleaned = priceStr.toString().replace(/,/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Parse mileage string and convert to number
 * @param {string} mileageStr - Mileage string (e.g., "50,000" or "50000")
 * @returns {number} - Parsed mileage as number
 */
export function parseMileage(mileageStr) {
  if (!mileageStr) return 0;
  const cleaned = mileageStr.toString().replace(/,/g, "");
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Filter inventory based on provided filters
 * @param {Array} inventory - Array of vehicle objects
 * @param {Object} filters - Filter criteria
 * @param {string} filters.searchTerm - Search term for make/model/year
 * @param {string} filters.minPrice - Minimum price
 * @param {string} filters.maxPrice - Maximum price
 * @param {string} filters.maxMileage - Maximum mileage
 * @returns {Array} - Filtered inventory array
 */
export function filterInventory(inventory, filters = {}) {
  if (!inventory || inventory.length === 0) {
    return [];
  }

  return inventory.filter((vehicle) => {
    // Search term filter (searches in title: year, make, model)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const titleMatch = vehicle.title?.toLowerCase().includes(searchLower);
      if (!titleMatch) return false;
    }

    // Minimum price filter
    if (filters.minPrice) {
      const minPrice = parsePrice(filters.minPrice);
      const vehiclePrice = parsePrice(vehicle.price);
      if (vehiclePrice < minPrice) return false;
    }

    // Maximum price filter
    if (filters.maxPrice) {
      const maxPrice = parsePrice(filters.maxPrice);
      const vehiclePrice = parsePrice(vehicle.price);
      if (vehiclePrice > maxPrice) return false;
    }

    // Maximum mileage filter
    if (filters.maxMileage) {
      const maxMileage = parseMileage(filters.maxMileage);
      const vehicleMileage = parseMileage(vehicle.miles);
      if (vehicleMileage > maxMileage) return false;
    }

    return true;
  });
}
