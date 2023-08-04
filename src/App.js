import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {NavBarComponent} from "./components/navbar/NavBarComponent";
import {Footer} from "./components/footer/Footer";
import {Home} from "./pages/home/Home";
import {Inventory} from "./pages/inventory/Inventory";
import {About} from "./pages/about/About";
import CurrentPageProvider from "./context/CurrentPage";

function App() {
    return (
        <div className="App">
            <Router>
                <CurrentPageProvider>
                    <NavBarComponent/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/inventory" element={<Inventory/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                    <Footer/>
                </CurrentPageProvider>
            </Router>
        </div>
    );
}

export default App;