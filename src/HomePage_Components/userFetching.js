import './user.css'
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';





export const UserMenu = ({setL,setR }) => {
  const [menu, setMenu] = useState([]);
  const [loading,setLoading]=useState(false)


  useEffect(() => {
    const fetchMenu = async () => {
      try {

        setLoading(true);
        const url = "https://food-delivery-app-euay.onrender.com/user/menu";
        const token = localStorage.getItem("Token");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        
     
        const data = await response.json();
        // console.log("data",data)
        // console.log("menu",menu)
        setLoading(true)
         
       
       

        if (response.ok && data.length>0) {
          setMenu(data);
          setL(false)
          setR(false)
          

           
          
        } else {
          alert(data.message || "Something went wrong");
          
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Internal Server Problem");
      }
       setLoading(false)
    };

    fetchMenu()
  }, []); // Only depend on `navigate`

  
return (
  <>
    <div className="main">
      <p className="menu">Menu</p>
    </div>
    {loading ? (
     <div className="loading-container">
  <div className="spinner"></div>
  <p className="loading">Loading...</p>
</div>

     
    ) : (
      <>
        <Veg />
        <NonVeg />
      </>
    )}
  </>
);
}


export const Veg = () => {
  const [veg, setVeg] = useState([]);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();

  const handleItem=(item)=>{
    // console.log(item)
   navigate("/user/details", { state: item });


  }

  useEffect(() => {
    const fetchVeg = async () => {
      try {
        setLoading(true)
        const url = "https://food-delivery-app-euay.onrender.com/user/list/Veg";
        const token = localStorage.getItem("Token");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        
       
        if (response.ok && data.response.length>0) {
          setVeg(data.response); 
        } else {
          alert(data.message || "Something went wrong");
        } 
      } catch (error) {
        alert("Internal Server Problem");
      }
      setLoading(false)
    };

    fetchVeg();
  }, []);
  // useEffect(()=>{
  //          // console.log("Fetched Veg data:", data);
  //       console.log( "Veg data",veg)


  //       },[veg])

 return (
  <>
  <div className="main">
        <p className="Non-veg">Veg Dishes</p>
      </div>
    {loading ? (
      <div className="loading-container">
        
        <div className="spinner"></div>
        <p className="loading">Loading...</p>
      </div>
    ) : (
      <div className="menu_main_container">
        {veg.map((item, id) => (
         
          <div key={id} className="fetch_menu" onClick={()=>handleItem(item)}>
            <img src={item.Image_Url} alt="background_image" />
            <p>{item.Title}</p>
          </div>
        ))}
      </div>
    )}
  </>
);

}



export const NonVeg = () => {
  const [NonVeg, setNonVeg] = useState([]);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchNonVeg = async () => {
      try {
        setLoading(true)
        const url = "https://food-delivery-app-euay.onrender.com/user/list/Non Veg";
        const token = localStorage.getItem("Token");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        // console.log("Fetched data:", data);
        // console.log(veg)

        if (response.ok && data.response.length >0) {
          setNonVeg(data.response); 
        } else {
          alert(data.message || "Something went wrong");
        } 
      } catch (error) {
        alert("Internal Server Problem");
      }
      setLoading(false)
    };

    fetchNonVeg();
  }, []);

   return (
    <>
      <div className="main">
        <p className="Non-veg">Non Veg Dishes</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading">Loading...</p>
        </div>
      ) : (
        <div className="menu_main_container">
          {NonVeg.length > 0 ? (
            NonVeg.map((e, id) => (
              <div key={id} className="fetch_menu">
                <img src={e.Image_Url} alt="background_image" />
                <p>{e.Title}</p>
              </div>
            ))
          ) : (
            <p>No Non Veg Items</p>
          )}
        </div>
      )}
    </>
  );
}
export const UserItem = ({dish}) => {
 

  const [item, setItem] = useState([]);
   const [loading,setLoading]=useState(false)
  //  console.log(item)
 
   const navigate=useNavigate();

  const handleItem=(eachItem)=>{
    // console.log(eachItem)
   navigate("/user/details", { state: eachItem});


  }

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem("Token");
      try {
        setLoading(true)
        const url = `https://food-delivery-app-euay.onrender.com/user/menu/${dish}`;
      
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok && data.get_details.length>0) {
          setItem(data.get_details);
          // console.log(data)
          // alert("Data Fetched Successfully")
          
         
        } else {
     alert(data.message || "No Item Found");
     navigate("/");


  
}

      } catch (err) {
        console.error(err);
        alert("Error fetching item.");
      }
      setLoading(false)
    };


    fetchItem();
  }, []);

  
 return (
  <>
    {loading ? (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading">Loading...</p>
      </div>
    ) : (
      <div className="menu_main_container">
        {item.map((eachItem, id) => (
          <div key={id} className="fetch_menu" onClick={()=>handleItem(eachItem)}>
            <img src={eachItem.Image_Url} alt="background_image" />
            <p>{eachItem.Title}</p>
          </div>
        ))}
      </div>
    )}
  </>
);

};

 
  

