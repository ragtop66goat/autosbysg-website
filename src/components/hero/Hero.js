import "./hero.css";

function Hero() {
    return (
        <div className="showcase">
            <h1 data-testid="hero-banner">S-G <span>Auto Sales</span></h1>
            <p data-testid="hero-message">Stop in and test drive your new car today</p>
        </div>
    )
}

export default Hero;