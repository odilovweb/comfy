import { FcGoogle } from "react-icons/fc";
import {
  SignupWithGoogle,
  signOutFromAccount,
} from "../firebase/firebaseConfig";
import { settingUser } from "../redux/comfySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      <div className="w-full text-center py-20">
        {!user && (
          <button onClick={loginSignup} className="btn btn-neutral">
            <span>
              <FcGoogle />
            </span>
            <span>Signup</span>
          </button>
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
      </div>
    </div>
  );
}

export default Login;
