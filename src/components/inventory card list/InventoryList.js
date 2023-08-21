import {InventoryCard} from "../inventory card/InventoryCard";
import {Container} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {InventoryContext} from "../../context/Inventory";

export function InventoryList() {

    const inventoryContext = useContext(InventoryContext);
    const getInventoryData = () => inventoryContext.getInventoryData();
    const inventory = inventoryContext.inventory;

    useEffect(() => {
      getInventoryData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <Container>
            <h1 className="m-5">Inventory</h1>
            <div className="row row-cols-2 row-cols-md-4 g-4">
                {inventory.map((item, idx) => (
                    <InventoryCard key={idx} item={item}/>
                ))}
            </div>
        </Container>
    )
}