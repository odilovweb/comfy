import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  let apis = "https://strapi-store-server.onrender.com/api/products";
  const [fedata, setFedata] = useState("");
  const [pending, setPending] = useState(false);
  const [api, setApi] = useState(apis);
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
  }, [api]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [sort, setSort] = useState("a-z");
  const [price, setPrice] = useState(100000);
  const [shipping, setShipping] = useState(false);

  return (
    <div>
      {pending ? (
        <div className="py-20 w-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        fedata && (
          <div className="py-10">
            <form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
              <div className="form-control">
                <label htmlFor="search" className="label">
                  <p className="label-text capitalize">Search product</p>
                </label>
                <input
                  type="search"
                  name="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="input input-bordered input-sm"
                />
              </div>

              <div className="form-control">
                <label htmlFor="category" className="label">
                  <p className="label-text capitalize">Select Category</p>
                </label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="select select-bordered select-sm"
                >
                  <option value="all">All</option>
                  <option value="Tables">Tables</option>
                  <option value="Chairs">Chairs</option>
                  <option value="Kids">Kids</option>
                  <option value="Sofas">Sofas</option>
                  <option value="Beds">Beds</option>
                </select>
              </div>

              <div className="form-control">
                <label htmlFor="company" className="label">
                  <p className="label-text capitalize">Select Company</p>
                </label>
                <select
                  name="company"
                  id="company"
                  className="select select-bordered select-sm"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                >
                  <option value="all">All</option>
                  <option value="Modenza">Modenza</option>
                  <option value="Luxora">Luxora</option>
                  <option value="Artifex">Artifex</option>
                  <option value="Comfora">Comfora</option>
                  <option value="Homestead">Homestead</option>
                </select>
              </div>

              <div className="form-control">
                <label htmlFor="sort" className="label">
                  <p className="label-text capitalize">Sort By</p>
                </label>
                <select
                  name="sort"
                  id="sort"
                  className="select select-bordered select-sm"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                >
                  <option value="a-z">a-z</option>
                  <option value="z-a">z-a</option>
                  <option value="high">high</option>
                  <option value="low">low</option>
                </select>
              </div>

              <div className="form-control">
                <label
                  htmlFor="price"
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span className="label-text capitalize">Select price</span>
                  <span className="">${price / 100}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max="100000"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className="range range-primary"
                />
                <div className="w-full flex justify-between text-xs px-2 mt-2">
                  <span className="font-bold text-md">0</span>
                  <span className="font-bold text-md">Max: 1000.00$</span>
                </div>
              </div>

              <div className="form-control items-center">
                <label htmlFor="shipping" className="label cursor-pointer">
                  <span className="label-text">Free Shipping</span>
                </label>
                {shipping ? (
                  <input
                    type="checkbox"
                    name="shipping"
                    checked
                    onChange={() => {
                      if (shipping) {
                        setShipping(false);
                      } else {
                        setShipping(true);
                      }
                    }}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="shipping"
                    onChange={() => {
                      if (shipping) {
                        setShipping(false);
                      } else {
                        setShipping(true);
                      }
                    }}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setApi(
                    `https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${sort}&price=${price}&shipping=${shipping}`
                  );
                }}
                type="submit"
                className="btn btn-sm btn-primary"
              >
                Search
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSearch("");
                  setCategory("all");
                  setCompany("all");
                  setSort("a-z");
                  setPrice(100000);
                  setShipping(false);
                  setApi(
                    "https://strapi-store-server.onrender.com/api/products"
                  );
                }}
                className="btn btn-sm btn-secondary"
              >
                Reset
              </button>
            </form>
            <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {fedata.map((item) => {
                return (
                  <Link
                    key={item.id}
                    className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
                    to={`${item.id}`}
                  >
                    <figure className="px-4 pt-4">
                      <img
                        src={item.attributes.image}
                        alt={`${item.attributes.title}'s image`}
                        className="rounded-xl h-64 md:h-48 w-full object-cover"
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title capitalize">
                        {item.attributes.title}
                      </h2>
                      <p>
                        {item.attributes.price.slice(0, -2)}.
                        {item.attributes.price.slice(-2)}$
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Products;
