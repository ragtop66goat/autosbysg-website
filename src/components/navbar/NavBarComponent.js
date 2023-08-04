import {Container, Navbar} from "react-bootstrap";
import logo from "../../img/logo.png";
import {Link} from "react-router-dom";
import "./navbarComponent.css";
import {useContext} from "react";
import {CurrentPageContext} from "../../context/CurrentPage";

export function NavBarComponent(){
    const pageContext = useContext(CurrentPageContext);

    return (
        <div>
        <Container>
            <Navbar expand="sm">
                <Navbar.Brand href="/">
                    <img src={logo} alt="Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <div className="main-nav">
                        <Link className={pageContext.page === 0 ? "current" : ""} onClick={()=> pageContext.setPage(0)} to="/">Home</Link>
                        <Link className={pageContext.page === 1 ? "current" : ""} onClick={()=> pageContext.setPage(1)} to="/inventory">Inventory</Link>
                        <Link className={pageContext.page === 2 ? "current" : ""} onClick={()=> pageContext.setPage(2)} to="/about">About</Link>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </Container>
        <div className="pinstripe-1"></div>
            <div className="pinstripe-2"></div>
        </div>
    )
}