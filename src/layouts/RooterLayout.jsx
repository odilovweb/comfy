import React from "react";
import LoginNav from "../components/LoginNav";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function RooterLayout() {
  return (
    <div className="">
      <header className="bg-neutral py-2 text-neutral-content">
        <LoginNav />
      </header>
      <Navbar />
      <main className="align-element">
        <Outlet />
      </main>
    </div>
  );
}

export default RooterLayout;
