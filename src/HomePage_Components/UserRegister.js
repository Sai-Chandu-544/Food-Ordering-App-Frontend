import { useState } from "react"
import { useNavigate } from "react-router-dom";
export const UserRegister=({handleStore})=>{
    const navigate = useNavigate();
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")


    

    
    

  

    const handleName=(e)=>{
        const newname=e.target.value
        setName(newname); 
        
        

    }
     

    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }

    // or using one function at all fields

//     const handleChange=(e)=>{
//         const {name,value}=e.target;
        
//   if (name === 'name') setName(value);
//   else if (name === 'email') setEmail(value);
//   else if (name === 'password') setPassword(value);
// };

   const handleAdminRegister = async (e) => {
  e.preventDefault();
  const url = "https://food-delivery-app-euay.onrender.com/user/register";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      
    });

    const data = await response.json(); // always parse after checking headers
   

    if (response.ok) {
      alert(data.message || "Admin Registered Successfully");
      handleStore(name)
      

        navigate("/user/login");
      console.log("Success:", data);
     
      
     
       
    } else if (response.status === 409) {
      alert(data.message || "Admin already registered");
    } else if (response.status === 400) {
      alert(data.message || "Validation Error");
    } else {
      alert(data.message || "Something went wrong");
    }
   
    setName("")
    setEmail("")
    setPassword("")
    
    

  } catch (error) {
    console.error("Registration error:", error);
    alert("Internal Server Error");
  }
};
return(
        <div className="adminRegisterContainer">
            <p className="registerTitle">User Registration</p>

           
            <form className="register_form" onSubmit={handleAdminRegister}>

                <label><p>Adimn name:</p>
                <input type="text"  placeholder="Enter Your Name" value={name} onChange={handleName}/>
                </label> 

                <label ><p>Email:</p>
                <input type="text" id="email" placeholder="Enter Your Email" value={email} onChange={handleEmail} />
                </label>
                
                
                <label><p>Password:</p>
                <input type="password"  placeholder="Enter Your Password" value={password}  onChange={handlePassword}/>
                </label>
                <div className="register_button">
                    <button className="button" type="submit">Register</button>
                </div>
            </form>

        </div>
    )

}
