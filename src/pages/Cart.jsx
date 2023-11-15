import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNumSub, removeProduct } from "../redux/comfySlice";
import { Link } from "react-router-dom";

function Cart() {
  let subtotal = 0;
  const dispatch = useDispatch();
  const { products, user } = useSelector((state) => state.comfy);
  const productsId = products.map((item) => {
    return item.id;
  });
  const result = [];
  const resultProducts = [];
  productsId.forEach((i) => {
    if (!result.includes(i)) {
      result.push(i);
    }
  });
  result.forEach((i) => {
    let count = 0;
    productsId.forEach((a) => {
      if (a == i) {
        count++;
      }
    });
    resultProducts.push({ id: i, count });
  });
  const productsAll = resultProducts.map((item) => {
    const dataItem = products.find((i) => {
      return i.id == item.id;
    });
    console.log(dataItem);
    return dataItem;
  });
  return (
    <div>
      {products.length ? (
        <div>
          <h1 className="text-3xl font-semibold my-5">Shopping Cart</h1>
          <hr />
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {productsAll.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
                  >
                    <img
                      src={item.attributes.image}
                      alt={item.attributes.title}
                      className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
                    />
                    <div className="sm:ml-16 sm:w-48">
                      <h3 className="capitalize font-medium">
                        {item.attributes.title}
                      </h3>
                      <h4 className="mt-2 capitalize text-sm text-neutral-content">
                        {item.attributes.company}
                      </h4>
                    </div>
                    <div className="sm:ml-12">
                      <div className="form-control max-w-xs">
                        <h3>Amount</h3>
                        <p className="mx-auto font-bold">
                          {resultProducts.map((i) => {
                            if (i.id == item.id) {
                              subtotal += item.attributes.price * i.count;
                              return i.count;
                            }
                          })}
                        </p>
                        <button
                          onClick={() => {
                            dispatch(removeProduct(item.id));
                          }}
                          className="mt-2 link link-primary link-hover mx-auto text-base"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                    <p className="font-medium sm:ml-auto">
                      {item.attributes.price.slice(0, -2)}.
                      {item.attributes.price.slice(-2)}$
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="lg:col-span-4 lg:pl-4">
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
              <div className="py-5">
                {user ? (
                  <Link to="/checkout" className="btn w-full btn-primary">
                    PROCEED TO CHECKOUT
                  </Link>
                ) : (
                  <Link to="/login" className="btn w-full btn-primary">
                    PLEASE LOGIN
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h4 className="text-3xl font-bold">You don't have any carts :(</h4>
        </div>
      )}
    </div>
  );
}

export default Cart;
