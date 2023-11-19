import "./hero.css";

export function Hero() {
    return (
        <div data-testid="hero" className="showcase">
            <h1 data-testid="hero-banner">S-G <span>Auto Sales</span></h1>
            <p data-testid="hero-message">Stop in and test drive your new car today</p>
        </div>
    )
}