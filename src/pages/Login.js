import React from "react";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../utils/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
function Login() {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    if (data) {
      const additional = getAdditionalUserInfo(data);

      if (additional.isNewUser) {
        await addDoc(collection(db, "users"), {
          uid: data.user.uid,
          email: data.user.email,
          name: data.user.displayName,
          photoURL: data.user.photoURL,
          providerId: data.user.providerId,
          cart: [],
          customization: [],
        });
      }
      navigate("/");
    }
  };
  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <section className="w-[400px] h-[400px] rounded-xl bg-[#1e1c20] mt-28 ">
        <h1 className="font-bold text-white text-center text-2xl mt-2">
          Sign In
        </h1>
        <div className="flex justify-center mt-12" onClick={signInWithGoogle}>
          <span className="text-white bg-[#151318] font-semibold text-lg mx-auto px-10 py-2 rounded-md cursor-pointer">
            Sign In With Google
          </span>
        </div>
      </section>
    </main>
  );
}

export default Login;
