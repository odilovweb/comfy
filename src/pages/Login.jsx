import { FcGoogle, FcPhone } from "react-icons/fc";
import {
  SignupWithGoogle,
  signOutFromAccount,
} from "../firebase/firebaseConfig";
import { settingUser } from "../redux/comfySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.comfy);
  const loginSignup = () => {
    SignupWithGoogle()
      .then((result) => {
        dispatch(settingUser(result.user));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {!user && (
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold mt-10">
            Login / Signup With Google
          </h1>
        </div>
      )}
      {user && (
        <div className="flex gap-10 flex-col items-center">
          <h1 className="text-4xl my-10">{user.displayName}</h1>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={user.photoURL} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full text-center py-10">
        {!user && (
          <div>
            {/* <div className="max-w-lg mx-auto flex flex-col gap-5 mt-10 mb-3">
              <label className="input input-bordered flex items-center gap-2">
                <FcPhone />
                <input type="tel" className="grow" placeholder="+998 - " />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Username" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input type="password" className="grow" />
              </label>
            </div> */}
            <button onClick={loginSignup} className="btn btn-neutral">
              <span>
                <FcGoogle />
              </span>
              <span>Sign up / Sign in</span>
            </button>
          </div>
        )}
        {user && (
          <button
            onClick={() => {
              signOutFromAccount();
              dispatch(settingUser(null));
              navigate("/");
            }}
            className="btn btn-neutral"
          >
            <span>
              <FcGoogle />
            </span>
            <span>Logout</span>
          </button>
        )}
        <Link className="btn btn-warning m-2 " to="/">
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default Login;
