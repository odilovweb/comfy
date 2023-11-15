import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShop, FaMoon, FaSun, FaSortDown } from "react-icons/fa6";
import { setMode } from "../redux/comfySlice";
function Navbar() {
  const { mode, products, user } = useSelector((state) => state.comfy);
  const dispatch = useDispatch();
  document.documentElement.setAttribute("data-theme", mode);
  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        
        <div className="navbar-start">
          <Link
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            C
          </Link>
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden text-xl">
              <FaSortDown />
            </label>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
              <li className="capitalize">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="capitalize">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="capitalize">
                <NavLink to="/products">Products</NavLink>
              </li>
              <li className="capitalize">
                <NavLink to="/cart">Cart</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink className="capitalize" to="/checkout">
                    Checkout
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink className="capitalize" to="/orders">
                    Orders
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <li>
              <NavLink className="capitalize" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="capitalize" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="capitalize" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className="capitalize" to="/cart">
                Cart
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink className="capitalize" to="/checkout">
                  Checkout
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink className="capitalize" to="/orders">
                  Orders
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="swap swap-rotate">
            <button
              className="text-xl"
              onClick={() => {
                dispatch(setMode());
              }}
            >
              {mode === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
        <Link to="cart" className="flex relative">
          <span className="btn btn-ghost btn-circle btn-md ml-4">
            <FaShop className="text-xl" />
          </span>
          <span className="badge badge-accent absolute top-0 right-0">
            {products.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
