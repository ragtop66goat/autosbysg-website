import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryContext } from "../../context/Inventory";
import VehicleForm from "../../components/VehicleForm";
import LoadingSpinner from "../../components/LoadingSpinner";

function EditVehicle() {
  const { inventory, getInventoryData, updateVehicle } = useContext(InventoryContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    if (inventory.length === 0) {
      getInventoryData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inventory.length > 0) {
      const foundVehicle = inventory.find((v) => v.id === id);
      setVehicle(foundVehicle || null);
    }
  }, [inventory, id]);

  const handleSubmit = async (vehicleData) => {
    try {
      await updateVehicle(id, vehicleData);
      navigate("/admin/inventory");
    } catch (error) {
      console.error("Failed to update vehicle:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    navigate("/admin/inventory");
  };

  if (!vehicle && inventory.length > 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Vehicle not found</div>
      </div>
    );
  }

  if (!vehicle) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mt-4">
      <VehicleForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={vehicle}
      />
    </div>
  );
}

export default EditVehicle;
