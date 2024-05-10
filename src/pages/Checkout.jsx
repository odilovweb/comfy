import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckout } from "../redux/comfySlice";
import { toast } from "react-toastify";

function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { user, products } = useSelector((state) => state.comfy);
  let subtotal = 0;

  products.forEach((i) => {
    subtotal += +i.attributes.price;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (address && name) {
      const date = new Date().toLocaleString();
      console.log(date);
      dispatch(
        setCheckout({
          name,
          address,
          cost: subtotal + 500 + Math.floor(subtotal / 10),
          date,
        })
      );
      navigate("/orders");
      toast.success("New order placed succesfully");
    }
  };
  return (
    <div>
      {products.length ? (
        <div>
          <div className="border-b border-base-300 pb-5">
            <h1 className="text-3xl font-medium tracking-wider capitalize">
              Place Your Order
            </h1>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
            <form className="flex flex-col gap-y-4">
              <h3 className="font-medium text-xl capitalize">
                Shipping information
              </h3>
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="capitalize label-text">first name</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  name="name"
                  required
                  className="input input-bordered undefined"
                />
              </div>
              <div className="form-control">
                <label htmlFor="addres" className="label">
                  <span className="capitalize label-text">Address</span>
                </label>
                <input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  type="text"
                  name="addres"
                  required
                  className="input input-bordered undefined"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleClick}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Place your order
                </button>
              </div>
            </form>

            <div className="card bg-base-200">
              <div className="card-body">
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                  <span>Subtotal</span>
                  {subtotal && (
                    <span className="font-medium">
                      {subtotal.toString().slice(0, -2)}.
                      {subtotal.toString().slice(-2)}$
                    </span>
                  )}
                </p>
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                  <span>Shipping</span>
                  <span className="font-medium">5$</span>
                </p>
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                  <span>Tax</span>
                  <span className="font-medium">
                    {Math.floor(subtotal).toString().slice(0, -3)}.
                    {Math.floor(subtotal).toString().slice(-3)}$
                  </span>
                </p>
                <p className="flex justify-between text-sm mt-4 pb-2">
                  <span>Order Total</span>
                  <span className="font-medium">
                    {(subtotal + Math.floor(subtotal / 10) + 500)
                      .toString()
                      .slice(0, -2)}
                    .
                    {(subtotal + Math.floor(subtotal / 10) + 500)
                      .toString()
                      .slice(-2)}
                    $
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 w-full text-center">
          <h1 className="text-3xl mb-5 font-bold">Your Cart is Empty </h1>
          <hr />
        </div>
      )}
    </div>
  );
}

export default Checkout;
