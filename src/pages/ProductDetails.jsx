import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setProduct } from "../redux/comfySlice";
function ProductDetails() {
  const { id } = useParams();
  const api = `https://strapi-store-server.onrender.com/api/products/${id}`;
  const [fedata, setFedata] = useState("");
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setPending(true);
    axios
      .get(api)
      .then((responce) => {
        setFedata(responce.data.data);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
        setPending(false);
      });
  }, [id]);
  const [amount, setAmount] = useState(1);
  return (
    <div>
      {pending ? (
        <div className="py-20 w-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        fedata && (
          <div>
            <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
              <img
                src={fedata.attributes.image}
                alt={`${fedata.attributes.title} image`}
                className="w-96 h-96 object-cover rounded-lg lg:w-full"
              />
              <div>
                <h1 className="capitalize text-3xl font-bold">
                  {fedata.attributes.title}
                </h1>
                <h3 className="text-xl text-neutral-content font-bold mt-2">
                  {fedata.attributes.company}
                </h3>
                <p className="mt-3 text-xl">
                  {fedata.attributes.price.slice(0, -2)}.
                  {fedata.attributes.price.slice(-2)}$
                </p>
                <p className="mt-6 leading-8">
                  {fedata.attributes.description}
                </p>
                <div className="mt-6">
                  <h3 className="text-md font-medium tracking-wider capitalize">
                    Colors
                  </h3>
                  <div className="mt-2">
                    {fedata.attributes.colors.map((i) => {
                      return (
                        <button
                          key={i}
                          type="button"
                          className="badge w-6 h-6 mr-2 border-2 border-secondary"
                          style={{ background: i }}
                        ></button>
                      );
                    })}
                  </div>
                </div>
                <div className="form-control w-full max-w-xs mt-2">
                  <label htmlFor="amount">
                    <h4 className="text-md font-medium -tracking-wider capitalize">
                      Amount
                    </h4>
                  </label>
                  <input
                    type="number"
                    value={amount}
                    placeholder="Type here"
                    className="input input-bordered input-info w-full max-w-xs"
                    onChange={(e) => {
                      if (e.target.value >= 0) {
                        setAmount(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => {
                      if (amount > 0) {
                        dispatch(setProduct({ num: amount, item: fedata }));
                        toast.success("New Product(s) succesfuly added");
                      } else {
                        toast.warn("Invalid Amount");
                      }
                    }}
                    className="btn btn-secondary btn-md"
                  >
                    Add To Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ProductDetails;
