import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroOne from "../assets/hero-1.webp";
import heroTwo from "../assets/hero-2.webp";
import heroThr from "../assets/hero-3.webp";
import heroFour from "../assets/hero-4.webp";
import axios from "axios";
function Home() {
  const [fedata, setFedata] = useState("");
  const [pending, setPending] = useState(false);
  useEffect(() => {
    setPending(true);
    axios
      .get(
        "https://strapi-store-server.onrender.com/api/products?featured=true"
      )
      .then((responce) => {
        setFedata(responce.data.data);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
        setPending(false);
      });
  }, []);
  return (
    <div className="py-16">
      {pending ? (
        <div className="py-20 w-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="">
              <div>
                <h1 className="max-w98xl text-4xl font-bold tracking-tight sm:text-6xl">
                  We are changing the way people shop
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-8">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Tempore repellat explicabo enim soluta temporibus asperiores
                  aut obcaecati perferendis porro nobis.
                </p>
                <div className="mt-8">
                  <Link to="/products" className="btn btn-secondary">
                    Our Products
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box ">
              <div className="carousel-item">
                <img
                  src={heroOne}
                  alt="Hero One image"
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={heroTwo}
                  alt="Hero two image"
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={heroThr}
                  alt="Hero Three Image"
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={heroFour}
                  alt="Hero Four Image"
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-4xl mb-5">Featured Products</h2>
            <hr />
            <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {fedata &&
                fedata.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
                      to={`products/${item.id}`}
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
        </div>
      )}
    </div>
  );
}

export default Home;
