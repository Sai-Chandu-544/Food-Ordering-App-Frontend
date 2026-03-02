import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth";
import { useContext } from "react";
import toast from "react-hot-toast";
import {userLogin}from "../fetchingApi/file"
  

export const UserLogin = ({setL}) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading,setLoading]=useState(false)

     const [logindata,setlogindata]=useState({
        email:"",
        password:""
     })
     

     const handleChange=(e)=>{
        setlogindata((prev)=>({
            ...prev,
            [e.target.name]:e.target.value

          }))
          

     }
    //  console.log("data",logindata)

    const handleAdminLogin= async(e)=>{
      e.preventDefault();
      try{
        setLoading(true);
        const data=await userLogin(logindata)
        // console.log(data)
        // console.log(data.token)
        // console.log(data.user._id)
        setLoading(false)

       
    if ( data.token) {
  login(data.token,data.user._id,data.user.name,data.user.email)

  
    //  setL(false)
     navigate('/home')
    
      toast.success("Login was Successful");
      
    } else if (data.message === "Please Register!") {
  toast.error("Please Register!");
  navigate("/user/register");
} else {
  alert("Login failed. Please try again.");
}

    setlogindata({
      email:"",
      password:""
    })


  } catch (err) {
    console.error("Error during login:", err);
    toast.error("Internal Server Error");
  }
   setLoading(false)
    }


  return (
    <>
  {loading ? (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500">Loading...</p>
  </div>
) : (
  <div className="flex items-center justify-center min-h-[70vh] px-4">
    
    {/* Card */}
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8">
      
      {/* Title */}
      <p className="text-2xl font-bold text-center mb-6 text-gray-800">
        User Login
      </p>

      {/* Form */}
      <form className="flex flex-col gap-4">
        
        {/* Email */}
        <label className="flex flex-col gap-1">
          <span className="font-medium text-gray-700">Email</span>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            value={logindata.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </label>

        {/* Password */}
        <label className="flex flex-col gap-1">
          <span className="font-medium text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={logindata.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </label>

        {/* Button */}
        <button
          onClick={handleAdminLogin}
          className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  </div>
)}

</>

  )
}
