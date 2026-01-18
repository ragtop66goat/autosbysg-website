import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InventoryContext } from "../../context/Inventory";
import VehicleForm from "../../components/VehicleForm";

function AddVehicle() {
  const { addVehicle } = useContext(InventoryContext);
  const navigate = useNavigate();

  const handleSubmit = async (vehicleData) => {
    try {
      await addVehicle(vehicleData);
      navigate("/admin/inventory");
    } catch (error) {
      console.error("Failed to add vehicle:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    navigate("/admin/inventory");
  };

  return (
    <div className="container mt-4">
      <VehicleForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default AddVehicle;
