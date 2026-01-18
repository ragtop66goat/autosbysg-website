import { createContext, useState} from "react";
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import {db } from "../config/firebase";

export const InventoryContext = createContext(
    {
        inventory: [],
        getInventoryData: () => {},
        addVehicle: () => {},
        updateVehicle: () => {},
        deleteVehicle: () => {}
    })

export function InventoryProvider({children}){
    const [inventoryData, setInventoryData] = useState([]);

    const getInventoryData = async () => {
        const inventoryCollectionRef = collection(db, "inventory");

        try{
            const data = await getDocs(inventoryCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setInventoryData(filteredData);
        } catch (e) {
            console.error(e);
        }
    }

    const addVehicle = async (vehicleData) => {
        const inventoryCollectionRef = collection(db, "inventory");

        try {
            const docRef = await addDoc(inventoryCollectionRef, vehicleData);
            const newVehicle = { ...vehicleData, id: docRef.id };
            setInventoryData([...inventoryData, newVehicle]);
            return docRef;
        } catch (e) {
            console.error("Error adding vehicle:", e);
            throw e;
        }
    }

    const updateVehicle = async (vehicleId, vehicleData) => {
        const vehicleDocRef = doc(db, "inventory", vehicleId);

        try {
            await updateDoc(vehicleDocRef, vehicleData);
            setInventoryData(
                inventoryData.map((vehicle) =>
                    vehicle.id === vehicleId ? { ...vehicle, ...vehicleData } : vehicle
                )
            );
        } catch (e) {
            console.error("Error updating vehicle:", e);
            throw e;
        }
    }

    const deleteVehicle = async (vehicleId) => {
        const vehicleDocRef = doc(db, "inventory", vehicleId);

        try {
            await deleteDoc(vehicleDocRef);
            setInventoryData(inventoryData.filter((vehicle) => vehicle.id !== vehicleId));
        } catch (e) {
            console.error("Error deleting vehicle:", e);
            throw e;
        }
    }

    const contextValue = {
        inventory : inventoryData,
        getInventoryData,
        addVehicle,
        updateVehicle,
        deleteVehicle,
    }
    return(
        <InventoryContext.Provider value={contextValue}>
            {children}
        </InventoryContext.Provider>
    )
}

export default InventoryProvider;