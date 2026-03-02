
export const userRegister = async (data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return result;
  } catch (err) {
    throw err;
  }
};

export const userLogin= async(data)=>{
    try{
        const response= await fetch(`${import.meta.env.VITE_API_KEY}/user/login`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("Login Failed")
        }
        const result=await response.json()
        return result;
    }catch(err){
        console.log("Error Occured During Login",err)
        throw err;
    }
}