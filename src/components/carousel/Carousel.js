import "./carousel.css";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill, } from "react-icons/bs";
import {useState, useContext} from "react";
import {CarouselItem} from "../carousel item/CarouselItem";
import {Link} from "react-router-dom";
import {CurrentPageContext} from "../../context/CurrentPage";

function Carousel({data}) {
    const pageContext = useContext(CurrentPageContext);

    const [slide, setSlide] = useState(0);
    const item = data[slide];

    const rightArrow = () => {
        setSlide(current => current === data.length - 1 ? 0 : current + 1);
    }

    const leftArrow = () => {
        setSlide(current => current === 0 ? data.length -1 : current - 1);
    }


    return (
        <>
            <h1 className="mt-5">Check out this weeks highlights</h1>
        <div className="carousel">
            <BsArrowLeftCircleFill data-testid="left-arrow" className="arrow arrow-left" onClick={leftArrow}/>
           <CarouselItem key={slide} item={item}/>
            <BsArrowRightCircleFill data-testid="right-arrow" className="arrow arrow-right" onClick={rightArrow}/>
        </div>
            <div className="indicators">
                {data.map((item, idx) => (
                    <button onClick={()=>setSlide(idx)} className={idx === slide ? "indicator-current" : "indicator"} key={idx}></button>
                ))}
            </div>
            <Link data-testid="inventory-link" className="carousel-link" onClick={()=>pageContext.setPage(1)} to="/inventory">See Full Inventory</Link>

        </>
    )
}

export default Carousel;