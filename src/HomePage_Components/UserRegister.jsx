import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export const UserRegister = () => {
const { signUp, isLoaded } = useSignUp();
const { signOut } = useClerk();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // REGISTER
  const handleRegister = async (e) => {
  e.preventDefault();

  if (!isLoaded) return;

  try {

    await signUp.create({
      emailAddress: form.email,
      password: form.password
    });

    await signUp.prepareEmailAddressVerification({
      strategy: "email_code"
    });

    setVerifying(true);
    toast.success("OTP sent to email");

  } catch (err) {
    console.error(err);
    toast.error(err.errors?.[0]?.message || "Registration failed");
  }
};
  // VERIFY OTP
 const verifyOTP = async (e) => {

  e.preventDefault();

  try {

    const completeSignUp =
      await signUp.attemptEmailAddressVerification({
        code: otp
      });

    if (completeSignUp.status === "complete") {

      toast.success("Email verified successfully");

      // IMPORTANT: clear session
      await signOut();

      // redirect to login
      navigate("/user/login");

    }

  } catch (err) {

    console.error(err);
    toast.error("Invalid OTP");

  }

};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {!verifying ? (

          <form onSubmit={handleRegister} className="space-y-5">

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            <div id="clerk-captcha"></div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>

        ) : (

          <form onSubmit={verifyOTP} className="space-y-5">

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          </form>

        )}

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <NavLink to="/user/login" className="text-orange-600 font-semibold">
            Sign in
          </NavLink>
        </p>

      </div>

    </div>
  );
};