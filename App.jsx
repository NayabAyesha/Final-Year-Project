import "./App.css";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from './Screens/LoginScreen';
import SellForm from "./components/SellForm";
import Products from "./Screens/Products";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./Screens/ProductDetail";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/sell" element={<SellForm />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/productdetails" element={<ProductDetail/>} />

      </Routes>
    </>
  );
}

export default App;
