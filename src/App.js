import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBarComponent from "./components/navbar/NavBarComponent";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Inventory from "./pages/inventory/Inventory";
import About from "./pages/about/About";
import VehicleDetail from "./pages/vehicle-detail/VehicleDetail";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import AdminInventory from "./pages/admin/AdminInventory";
import AddVehicle from "./pages/admin/AddVehicle";
import EditVehicle from "./pages/admin/EditVehicle";
import ProtectedRoute from "./components/ProtectedRoute";
import CurrentPageProvider from "./context/CurrentPage";
import InventoryProvider from "./context/Inventory";
import AuthProvider from "./context/Auth";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <CurrentPageProvider>
                        <InventoryProvider>
                            <NavBarComponent/>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/inventory" element={<Inventory/>}/>
                                <Route path="/inventory/:id" element={<VehicleDetail/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute>
                                            <Admin/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/inventory"
                                    element={
                                        <ProtectedRoute>
                                            <AdminInventory/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/vehicles/add"
                                    element={
                                        <ProtectedRoute>
                                            <AddVehicle/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/vehicles/:id/edit"
                                    element={
                                        <ProtectedRoute>
                                            <EditVehicle/>
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                            <Footer/>
                        </InventoryProvider>
                    </CurrentPageProvider>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
