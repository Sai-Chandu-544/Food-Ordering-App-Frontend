import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth";
import { useContext } from "react";
  

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
        const url = "https://food-delivery-app-euay.onrender.com/user/login";
        const response=await fetch(url,{
          method:"POST",
          headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: logindata.email,
  password: logindata.password, }),

        });
        const data=await response.json();
        console.log(data)
        // console.log(data.token)
        // console.log(data.user._id)
        setLoading(true)

       
    if (response.ok && data.token) {
  login(data.token,data.user._id,data.user.name,data.user.email)

  
    //  setL(false)
     navigate('/home')
    

    
    
      alert("Login was Successful");
      
    } else if (data.message === "Please Register!") {
  alert("Please Register!");
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
    alert("Internal Server Error");
  }
   setLoading(false)
    }


  return (
    <>
  {loading ? (
  <div className="loading-container">
    <div className="spinner"></div>
    <p className="loading">Loading...</p>
  </div>
) : (
  <div className="adminLoginContainer">
    <p className="loginTitle">User Login</p>

    <form className="login_form">
      <label>
        <p>Email:</p>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          value={logindata.email}
          onChange={handleChange}
        />
      </label>

      <label>
        <p>Password:</p>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={logindata.password}
          onChange={handleChange}
        />
      </label>

      <div className="login_button">
        <button className="button" onClick={handleAdminLogin}>
          Login
        </button>
      </div>
    </form>
  </div>
)}
</>

  )
}
