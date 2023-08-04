import {Container} from "react-bootstrap";
import "./about.css"

export function About() {
    return (
        <Container>
            <h1 className="m-5">About Us</h1>
            <div className="d-flex flex-column justify-content-center">
                <div className="about-container">
                    <div className="about-item-lg item-1"></div>
                    <div className="about-item-sm">Currently owned and operated by Sam and Mike,<br/>
                        <strong>S-G Auto Sales</strong> has been a family owned business
                        for over 60 years.
                    </div>
                </div>
                <div className="about-container">
                    <div className="about-item-sm">Since 1962, the sign in front of the building, and the building
                        itself for that matter, may have had a facelift or two,
                    </div>
                    <div className="about-item-lg item-2"></div>
                </div>
                <div className="about-container">
                    <div className="about-item-lg item-3"></div>
                    <div className="about-item-sm">but Mike and Sam are still there, and you don't stay in business
                        on the same corner all this time without treating people the right
                        way.
                    </div>
                </div>
            </div>
            <iframe
                title="address"
                className="i-frame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.0797507344996!2d-81.73386048457199!3d41.4591855792577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830efd4651d8885%3A0x4552ebb36f5c1b17!2s6409%20Denison%20Ave%2C%20Cleveland%2C%20OH%2044102!5e0!3m2!1sen!2sus!4v1617767616278!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
            ></iframe>

        </Container>
    )
}