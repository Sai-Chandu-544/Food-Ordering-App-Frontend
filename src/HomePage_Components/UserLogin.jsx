import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSignIn, useAuth } from "@clerk/clerk-react";

export const UserLogin = () => {

  const navigate = useNavigate();

  const { signIn, setActive, isLoaded } = useSignIn();
  const { getToken } = useAuth();

  const [logindata, setlogindata] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value
    });
  };

  const handleUserLogin = async (e) => {

    e.preventDefault();

    if (!isLoaded) return;

    try {

      const result = await signIn.create({
        identifier: logindata.email,
        password: logindata.password,
      });

      if (result.status === "complete") {

        //  Activate Clerk session
        await setActive({
          session: result.createdSessionId
        });

        //  Now get token
        const token = await getToken();

        // console.log("TOKEN:", token);

        // localStorage.setItem("clerk_token", token);

        toast.success("Login successful");

        navigate("/home");

      }

    } catch (err) {

      console.error(err);
      toast.error("Invalid email or password");

    }

  };

  const handleGoogleLogin = async () => {

    if (!isLoaded) return;

    try {

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/Food-Ordering-App-Frontend/sso-callback",
        redirectUrlComplete: "/Food-Ordering-App-Frontend/home",
      });

    } catch (err) {

      console.error(err);
      toast.error("Google login failed");

    }

  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8">

        <p className="text-2xl font-bold text-center mb-6 text-gray-800">
          User Login
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleUserLogin}>

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={logindata.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={logindata.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            type="submit"
            className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md"
          >
            Login
          </button>

          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full border py-2 rounded-md hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="google"
            />
            Continue with Google
          </button>

        </form>

      </div>
    </div>
  );
};