import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate,NavLink } from "react-router-dom";
import { userRegister } from "../fetchingApi/file"; 

export const UserRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await userRegister(form);

      toast.success(res.message || "Account created successfully!");

      setForm({ name: "", email: "", password: "" });

      navigate("/user/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 ">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8">

          {/* TITLE */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Join OrderNow and start ordering
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative mt-1.5">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <NavLink to="/user/login" className="text-orange-600 font-semibold cursor-pointer">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};