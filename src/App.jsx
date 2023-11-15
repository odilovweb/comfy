import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RooterLayout from "./layouts/RooterLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { settingUser } from "./redux/comfySlice";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RooterLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (info) => {
      if (info) {
        dispatch(settingUser(info));
      }
    });
  }, []);
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
