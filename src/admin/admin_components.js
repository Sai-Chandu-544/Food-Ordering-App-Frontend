import {useState,useEffect} from 'react'
import './admin_components.css'





export const AdminNavbar=({loginFunction, registerFunction,icon,loginIcon, handleLogout})=>{

  
  

    return(
        <div className="admin_navbar_container">
            <div className="admin_navbar_first_container">
                <p>Admin Panel</p>

            </div>
            <div className="admin_navbar_second_container">
               {loginIcon ? <p onClick={ handleLogout}>Logout</p> :<p onClick={loginFunction}>Login</p>} 
            {icon  || loginIcon ? <p> </p> :<p onClick={registerFunction}>Register</p>}
              
             
              

              


             
             

            </div>

        </div>
    )

}



export const AdminBody = ({handleAddProducts,handleAllUsers,handleAllProducts}) => {
  return (
    <div className="AdminBody">
        <ul className="admin_list">

        
        
            <li ><p onClick={handleAddProducts}>Add Product</p></li>
            <li><p onClick={handleAllProducts}>All Products</p></li>
            <li><p onClick={handleAllUsers}>All Users</p></li>
        </ul>
      
      

    </div>
  )
}



export const AdminAddProducts = () => {

  const [addProductData,setAddProductData]=useState({
    Recipe_Id:"",
    Title:"",
    Description:"",
    Cuisine_Type:"",
    Image_Url:"",
    Discount:"",
    Price:"",
    Category:""

  })
  const formattedData = {
  ...addProductData,
  recipeId: Number(addProductData.Recipe_Id),
  price: Number(addProductData.Price),
};

 
  const handleAddProducts=(e)=>{
    setAddProductData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))

  }


  
  

 
    const adminAddProductRequest=async (e)=>{
      e.preventDefault();

      try{
         const url = "https://food-delivery-app-euay.onrender.com/admin/result";
         const token = localStorage.getItem("Token"); // Make sure this token is valid
         const response= await fetch(url,{
          method:"POST",
           headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` // ✅ Correct way to pass token
      },
      body: JSON.stringify(formattedData ),


         })
      
        //  console.log(formattedData)
         const data= await response.json();
         console.log(data)
         if(response.ok ){
          alert(data.message || "Product Added Successfully")
         }else if (data.status===500){
          alert(data.message)

         }
         else{
          alert(data.message || "Failed to Add Product")
         }
         
    setAddProductData({
    Recipe_Id:"",
    Title:"",
    Description:"",
    Cuisine_Type:"",
    Image_Url:"",
    Discount:"",
    Price:"",
    Category:""

  })
        


      }catch(error){
        alert("Internal Server Problem")

      }
  

  }
 
  



  return (
    <div className="adminAddContainer">
      <div className="innerAdminAddProduct">
          <label ><p>Recipe_Id:</p><input type="number" name="Recipe_Id" placeholder="Enter Id"  value={addProductData.Recipe_Id} onChange={handleAddProducts} /></label>
      
      <label ><p>Title:</p><input type="text" name="Title" placeholder="Enter Title" value={addProductData.Title} onChange={handleAddProducts} /></label>
      
      <label ><p>Description:</p>  <input type="text" name="Description" placeholder="Enter Description" value={addProductData.Description} onChange={handleAddProducts} /></label>
    
      <label ><p>Cuisine_Type:</p><input type="text" name="Cuisine_Type" placeholder="Enter CusineType" value={addProductData.Cuisine_Type} onChange={handleAddProducts} /></label>
      
      <label ><p>Image_Url:</p><input type="text" name="Image_Url" placeholder="Enter Image link"value={addProductData.Image_Url} onChange={handleAddProducts} /></label>
      <label ><p>Discount:</p><input type="text" name="Discount" placeholder="Enter Discount"value={addProductData.Discount} onChange={handleAddProducts} /></label>
      <label ><p>Price:</p><input type="number" name="Price" placeholder="Enter Price"value={addProductData.Price} onChange={handleAddProducts} /></label>
      <label ><p>Category:</p><input type="text" name="Category" placeholder="Enter Veg or Non Veg"value={addProductData.Category} onChange={handleAddProducts} /></label>
      
      
             <button className="addproductButton" onClick={ adminAddProductRequest}>Add Product</button>

      </div>
    
              

    </div>
  )
}


export const AdminAllUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const get_users = async () => {
      try {
        const url = "https://food-delivery-app-euay.onrender.com/admin/users";
        const token = localStorage.getItem("Token");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);

        if (response.ok && data.user_details.length > 0) {
          setUsers(data.user_details);
          alert("Data fetched successfully.");
        } else {
          alert("No users found or something went wrong.");
        }

      } catch (error) {
        console.error("Error fetching users:", error);
        alert("An error occurred while fetching users.");
      } 
    };

    get_users();
  }, []);


  return (
    <div>
      <p>All Users</p>
      <div className="get_users">
  <table className="table-auto border border-collapse border-gray-300 w-full">
    <thead>
      <tr >
        <th >Name</th>
        <th >Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map((e, id) => (
        <tr key={id}>
          <td >{e.name}</td>
          <td >{e.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
    </div>
  )
}




export const AdminAllProducts = () => {

const [menu, setMenu] = useState([]);

   useEffect(() => {
    const fetchMenu = async () => {
      try {
        const url = "https://food-delivery-app-euay.onrender.com/admin/menu";
        const token = localStorage.getItem("Token");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        // console.log(data);

        if (response.ok) {
          setMenu(data);
        } else {
          alert(data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Internal Server Problem");
      } 
      
    };

    fetchMenu();
  }, []);
  console.log(menu)


  return (
     <div>
      <h2>Admin All Products</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Recipe ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Cuisine Type</th>
            <th>Image URL</th>
            <th>Discount</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((e, id) => (
            <tr key={id}>
              <td>{e.Recipe_Id}</td>
              <td>{e.Title}</td>
              <td>{e.Description}</td>
              <td>{e.Cuisine_Type}</td>
              <td>
                <a href={e.Image_Url} target="_blank" rel="noreferrer">
                  View Image
                </a>
              </td>
              <td>{e.Discount}%</td>
              <td>₹{e.Price}</td>
              <td>{e.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




export const AdminRegister=({handleRegisterIcon})=>{
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
  const url = "https://food-delivery-app-euay.onrender.com/admin/register";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json(); // always parse after checking headers

    if (res.ok) {
      alert(data.message || "Admin Registered Successfully");
      console.log("Success:", data);
      handleRegisterIcon();
     
       
    } else if (res.status === 409) {
      alert(data.message || "Admin already registered");
    } else if (res.status === 400) {
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
            <p className="registerTitle">Admin Registration</p>

           
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


export const AdminLogin = ({handleLoginIcon}) => {

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
        const url = "https://food-delivery-app-euay.onrender.com/admin/login";
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
       
    if (response.ok && data.token) {
     localStorage.setItem("Token", data.token);

      handleLoginIcon();
    
    
      alert("Login was Successful");
      // Optional: redirect after login
      // navigate("/admin/dashboard");
    } else if (data.message === "Please Register!") {
  alert("Please Register!");
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
    }


  return (
   <div className="adminLoginContainer">
            <p className="loginTitle">Admin Login</p>

           
            <form className="login_form">
                
                <label ><p>Email:</p>
                <input type="text" id="email" name="email" placeholder="Enter Your Email" value={logindata.email} onChange={handleChange} />
                </label>
                
                
                <label><p>Password:</p>
                <input type="password" name="password" placeholder="Enter Your Password" value={logindata.password}  onChange={handleChange}/>
                </label>
                <div className="login_button">
                    <button className="button" onClick={handleAdminLogin}>Login</button>
                </div>
            </form>

        </div>

  )
}
