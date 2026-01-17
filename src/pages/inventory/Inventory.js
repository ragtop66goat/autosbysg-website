import { useState, useContext, useMemo, useEffect } from "react";
import { InventoryContext } from "../../context/Inventory";
import InventoryList from "../../components/inventory card list/InventoryList";
import SearchFilterBar from "../../components/search-filter-bar/SearchFilterBar";
import { filterInventory } from "../../utils/filterUtils";

function Inventory() {
  const { inventory, getInventoryData } = useContext(InventoryContext);
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    maxMileage: "",
  });

  // Fetch inventory data when component mounts
  useEffect(() => {
    getInventoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use useMemo to compute filtered inventory - this ensures it updates immediately
  const filteredInventory = useMemo(() => {
    return filterInventory(inventory, filters);
  }, [inventory, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      maxMileage: "",
    });
  };

  return (
    <div>
      <SearchFilterBar
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        filters={filters}
      />
      <div className="container">
        <div className="results-info mb-3">
          <p className="text-muted">
            Showing {filteredInventory.length} of {inventory.length} vehicles
          </p>
        </div>
        <InventoryList inventory={filteredInventory} />
      </div>
    </div>
  );
}

export default Inventory;