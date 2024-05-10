import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  signInWithPhoneNumber,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyACk05pcKdE1pyOy0cJdJrEwpW_jPBCCjw",
  authDomain: "comfy-web-ad28e.firebaseapp.com",
  projectId: "comfy-web-ad28e",
  storageBucket: "comfy-web-ad28e.appspot.com",
  messagingSenderId: "388260734725",
  appId: "1:388260734725:web:48af0637682c68ae41396c",
  measurementId: "G-Y7QMMLN05Z",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const SignupWithGoogle = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
export const signOutFromAccount = () => {
  signOut(auth)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
