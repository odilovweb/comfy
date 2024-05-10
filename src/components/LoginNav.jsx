import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LoginNav() {
  const { user } = useSelector((state) => state.comfy);

  return (
    <div className="align-element flex justify-center sm:justify-end">
      <a href="https://t.me/m_odlov" className="mr-auto hover:text-green-500">
        Developed By Odilov
      </a>
      {user ? (
        <Link to="/login" className="flex gap-2">
          <span>{user.displayName}</span>
          <div className="avatar">
            <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
              <img src={user.photoURL} />
            </div>
          </div>
        </Link>
      ) : (
        <Link className="text-white link" to="login">
          Login
        </Link>
      )}
    </div>
  );
}

export default LoginNav;
