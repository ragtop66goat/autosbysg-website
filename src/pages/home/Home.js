import Hero from "../../components/hero/Hero";
import Carousel from "../../components/carousel/Carousel";
import { cars } from "../../data/carouselData";
import "./home.css";

function Home(){
    return(
        <div className="home">
            <Hero/>
            <Carousel data={cars}/>
        </div>
    )
}

export default Home;