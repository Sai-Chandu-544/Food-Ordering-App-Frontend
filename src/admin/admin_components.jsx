import {useState,useEffect} from 'react'
import { Pencil, Trash2 } from "lucide-react";
import  toast  from "react-hot-toast";







export const AdminNavbar=({loginFunction, registerFunction,icon,loginIcon, handleLogout})=>{

  
  

    return(
       <div className="w-full border-b bg-white">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* LEFT */}
    <p className="text-lg font-semibold text-gray-900">
      Admin Panel
    </p>

    {/* RIGHT */}
    <div className="flex items-center gap-6 text-sm font-medium text-gray-700">

      {loginIcon ? (
        <button
          onClick={handleLogout}
          className="hover:text-red-500 transition"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={loginFunction}
          className="hover:text-orange-500 transition"
        >
          Login
        </button>
      )}

      {icon || loginIcon ? null : (
        <button
          onClick={registerFunction}
          className="hover:text-orange-500 transition"
        >
          Register
        </button>
      )}
    </div>
  </div>
</div>
    )

}



export const AdminBody = ({handleAddProducts,handleAllUsers,handleAllProducts}) => {
  return (
   <div className="w-64 min-h-screen bg-gray-50 border-r p-6">
  <h2 className="text-lg font-semibold mb-6">Admin Menu</h2>

  <ul className="space-y-2 text-sm">

    <li>
      <button
        onClick={handleAddProducts}
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition"
      >
        ➕ Add Product
      </button>
    </li>

    <li>
      <button
        onClick={handleAllProducts}
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition"
      >
        📦 All Products
      </button>
    </li>

    <li>
      <button
        onClick={handleAllUsers}
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition"
      >
        👥 All Users
      </button>
    </li>

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
         const url = `${import.meta.env.VITE_API_KEY}/admin/result`;
         const token = localStorage.getItem("Token"); // Make sure this token is valid
         const response= await fetch(url,{
          method:"POST",
           headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` //  Correct way to pass token
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
    <div className="max-w-3xl mx-auto bg-white border rounded-xl shadow-sm p-6">
  <h2 className="text-xl font-semibold mb-6">Add New Recipe</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* Recipe ID */}
    <div>
      <label className="text-sm font-medium">Recipe ID</label>
      <input
        type="number"
        name="Recipe_Id"
        placeholder="Enter Id"
        value={addProductData.Recipe_Id}
        onChange={handleAddProducts}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>

    {/* Title */}
    <div>
      <label className="text-sm font-medium">Title</label>
      <input
        type="text"
        name="Title"
        placeholder="Enter Title"
        value={addProductData.Title}
        onChange={handleAddProducts}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>

    {/* Description */}
    <div className="md:col-span-2">
      <label className="text-sm font-medium">Description</label>
      <input
        type="text"
        name="Description"
        placeholder="Enter Description"
        value={addProductData.Description}
        onChange={handleAddProducts}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>

    {/* Cuisine */}
    <div>
      <label className="text-sm font-medium">Cuisine Type</label>
      <input
        type="text"
        name="Cuisine_Type"
        placeholder="Enter Cuisine Type"
        value={addProductData.Cuisine_Type}
        onChange={handleAddProducts}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>

    {/* Image URL */}
    <div>
      <label className="text-sm font-medium">Image URL</label>
      <input
        type="text"
        name="Image_Url"
        placeholder="Enter Image link"
        value={addProductData.Image_Url}
        onChange={handleAddProducts}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>

    {/* Discount */}
    <div>
      <label className="text-sm font-medium">Discount</label>
      <input
        type="text"
        name="Discount"
        placeholder="Enter Discount"
        value={addProductData.Discount}
        onChange={handleAddProducts}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>

    {/* Price */}
    <div>
      <label className="text-sm font-medium">Price</label>
      <input
        type="number"
        name="Price"
        placeholder="Enter Price"
        value={addProductData.Price}
        onChange={handleAddProducts}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>

    {/* Category */}
    <div className="md:col-span-2">
      <label className="text-sm font-medium">Category</label>
      <input
        type="text"
        name="Category"
        placeholder="Veg or Non Veg"
        value={addProductData.Category}
        onChange={handleAddProducts}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>

  </div>

  {/* BUTTON */}
  <button
    onClick={adminAddProductRequest}
    className="mt-6 w-full bg-orange-600 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition"
  >
    Add Product
  </button>
</div>
  )
}


export const AdminAllUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const get_users = async () => {
      try {
        const url = `${import.meta.env.VITE_API_KEY}/admin/users`;
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
        const url = `${import.meta.env.VITE_API_KEY}/admin/menu`;
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
  // console.log(menu)

// const handleUpdate = (product) => {
//   toast.success(`Editing "${product.Title}"`);
//   console.log("Update:", product);
// };
// const handleDelete = (id) => {
//   toast((t) => (
//     <div className="flex flex-col gap-2">
//       <p className="text-sm font-medium">Delete this product?</p>
//       <div className="flex gap-2 justify-end">
//         <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
//         <button
//           onClick={() => {
//             toast.dismiss(t.id);
//             deleteProduct(id);
//           }}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   ));
// };

// const deleteProduct = (id) => {
//   // simulate API
//   setTimeout(() => {
//     toast.success("Product deleted");
//     console.log("Deleted:", id);
//   }, 500);
// };

  return (
    
<div className="p-6">
  {/* TITLE */}
  <h2 className="text-xl font-semibold mb-4">
    Admin All Products
  </h2>

  {/* TABLE WRAPPER */}
  <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
    <table className="min-w-full text-sm text-left">

      {/* HEADER */}
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-3">Recipe ID</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3">Cuisine</th>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Discount</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {menu.sort((a,b)=>a.Recipe_Id-b.Recipe_Id).map((e, id) => (
          <tr
            key={id}
            className="border-t hover:bg-gray-50 transition"
          >
            <td className="px-4 py-3">{e.Recipe_Id}</td>
            <td className="px-4 py-3 font-medium">{e.Title}</td>
            <td className="px-4 py-3 line-clamp-2">{e.Description}</td>
            <td className="px-4 py-3">{e.Cuisine_Type}</td>

            {/* IMAGE LINK */}
            <td className="px-4 py-3">
              <a
                href={e.Image_Url}
                target="_blank"
                rel="noreferrer"
                className="text-orange-600 hover:underline"
              >
                View
              </a>
            </td>

            <td className="px-4 py-3">{e.Discount}%</td>
            <td className="px-4 py-3 font-semibold">₹{e.Price}</td>
            <td className="px-4 py-3">{e.Category}</td>

            {/* ACTIONS */}
            <td className="px-4 py-3">
              <div className="flex items-center justify-center gap-3">

                {/* UPDATE */}
                <button
                  onClick={() => handleUpdate(e)}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Pencil size={18} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(e.Recipe_Id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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

   

   const handleAdminRegister = async (e) => {
  e.preventDefault();
  const url = `${import.meta.env.VITE_API_KEY}/admin/register`;

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
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">

    {/* TITLE */}
    <h2 className="text-xl font-semibold text-center mb-6">
      Admin Registration
    </h2>

    {/* FORM */}
    <form onSubmit={handleAdminRegister} className="space-y-4">

      {/* NAME */}
      <div>
        <label className="text-sm font-medium">Admin Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={handleName}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={handleEmail}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={handlePassword}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition"
      >
        Register
      </button>
    </form>
  </div>
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
        const url = `${import.meta.env.VITE_API_KEY}/admin/login`;
        const response=await fetch(url,{
          method:"POST",
          headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: logindata.email,
  password: logindata.password, }),

        });
        const data=await response.json();
        // console.log(data)
       
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
   <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">

    {/* TITLE */}
    <h2 className="text-xl font-semibold text-center mb-6">
      Admin Login
    </h2>

    {/* FORM */}
    <form className="space-y-4" onSubmit={handleAdminLogin} >

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={logindata.email}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={logindata.password}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* BUTTON */}
      <button
        type="button"
       
        className="w-full bg-orange-600 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition"
      >
        Login
      </button>
    </form>
  </div>
</div>

  )
}
 