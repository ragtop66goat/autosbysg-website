import {inventoryData} from "../../data/inventoryData";
import {InventoryCard} from "../inventory card/InventoryCard";
import {Container} from "react-bootstrap";

export function InventoryList() {

    return (
        <Container>
            <h1 className="m-5">Inventory</h1>
            <div className="row row-cols-2 row-cols-md-4 g-4">
                {inventoryData.map((item) => (
                    <InventoryCard item={item}/>
                ))}
            </div>
        </Container>
    )
}