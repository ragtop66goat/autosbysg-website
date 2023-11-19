import {Card} from "react-bootstrap";

export function CarouselItem({item}){
    return (
        <Card className="p-2 m-2 carousel-card">
            <div data-testid="item-image" className="card-image" style={{backgroundImage: `url(${item.src})`}}></div>
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Miles: {item.miles}<br/> Price: ${item.price}</p>
            </div>
        </Card>
    )
}