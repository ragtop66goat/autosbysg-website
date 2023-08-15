import { createContext, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db } from "../config/firebase";

export const InventoryContext = createContext(
    {
        inventory: [],
        getInventoryData: () => {}
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



    const contextValue = {
        inventory : inventoryData,
        getInventoryData,
    }
    return(
        <InventoryContext.Provider value={contextValue}>
            {children}
        </InventoryContext.Provider>
    )
}

export default InventoryProvider;