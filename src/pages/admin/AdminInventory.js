import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InventoryContext } from "../../context/Inventory";
import "./AdminInventory.css";

function AdminInventory() {
  const { inventory, getInventoryData, deleteVehicle } = useContext(InventoryContext);
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getInventoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddVehicle = () => {
    navigate("/admin/vehicles/add");
  };

  const handleEditVehicle = (vehicleId) => {
    navigate(`/admin/vehicles/${vehicleId}/edit`);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setDeletingId(vehicleId);
      try {
        await deleteVehicle(vehicleId);
      } catch (error) {
        console.error("Failed to delete vehicle:", error);
        alert("Failed to delete vehicle. Please try again.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="admin-inventory-page">
      <div className="container mt-4">
        <div className="inventory-header">
          <h1>Manage Inventory</h1>
          <button className="btn btn-primary" onClick={handleAddVehicle}>
            Add Vehicle
          </button>
        </div>

        {inventory.length === 0 ? (
          <div className="empty-state">
            <p>No vehicles in inventory</p>
            <button className="btn btn-primary" onClick={handleAddVehicle}>
              Add Your First Vehicle
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table inventory-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Mileage</th>
                  <th>Engine</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>
                      <img
                        src={vehicle.image}
                        alt={vehicle.title}
                        className="vehicle-thumbnail"
                      />
                    </td>
                    <td>{vehicle.title}</td>
                    <td>${vehicle.price}</td>
                    <td>{vehicle.miles} miles</td>
                    <td>{vehicle.engine}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleEditVehicle(vehicle.id)}
                          disabled={deletingId === vehicle.id}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          disabled={deletingId === vehicle.id}
                        >
                          {deletingId === vehicle.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminInventory;
