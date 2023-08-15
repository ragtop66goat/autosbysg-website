import {LiaTachometerAltSolid} from "react-icons/lia";
import {PiEngineDuotone} from "react-icons/pi";
import {BsCurrencyDollar} from "react-icons/bs";

export function InventoryCard({item}) {
    return (
        <div className="col">
            <div className="card h-100 p-2">
                <img className="card-img-top" alt={item.title} src={item?.image}/>
                <div className="card-body text-start">
                    <h5 className="card-title">{item?.title}</h5>
                    <p className="card.text"><BsCurrencyDollar style={{margin: "0.2rem"}}/>{item?.price} </p>
                    <p className="card.text"><LiaTachometerAltSolid className="m-1"/>{item?.miles} </p>
                    <p className="card.text"><PiEngineDuotone className="m-1"/>{item?.engine} </p>
                </div>
                <div className="card-footer">
                    {item.options?.map((option) => (
                        <small className="text-muted">{" | " + option}</small>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}