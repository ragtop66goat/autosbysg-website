import {Container} from "react-bootstrap";
import logo from "../../img/logoLight.png";
import {Link} from "react-router-dom";
import {useContext} from "react";
import "./footer.css";
import {CurrentPageContext} from "../../context/CurrentPage";

export function Footer(){

    const pageContext = useContext(CurrentPageContext);

    return (
        <div data-testid="footer" className="footer">
        <Container>
            <div className="d-flex justify-content-between align-items-baseline">
                <div>
                <img src={logo} alt="LightLogo"/>
                </div>
                <p style={{color: "white"}}>POWERED BY RAGTOP MEDIA</p>
                <div className="footer-nav">
                    <Link className={pageContext.page === 0 ? "footer-current" : "" } onClick={()=>pageContext.setPage(0)} to="/">Home</Link>
                    <Link className={pageContext.page === 1 ? "footer-current" : ""} onClick={()=>pageContext.setPage(1)} to="/inventory">Inventory</Link>
                    <Link className={pageContext.page === 2 ? "footer-current" : ""} onClick={()=>pageContext.setPage(2)} to="/about">About</Link>
                </div>
            </div>
        </Container>
        </div>
    )
}