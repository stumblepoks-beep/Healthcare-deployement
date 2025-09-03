import axios from 'axios';

const apiget = async (url)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`https://healthcare-deployement.onrender.com${url}/`,
          {
            headers:{Authorization: `Bearer ${token}`}
          }
      )
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const apipost = async (url,data)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`https://healthcare-deployement.onrender.com${url}`,data,
          {
            headers:{Authorization: `Bearer ${token}`}
          }
      )
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const apidelete = async (url,data)=>{
    const token = localStorage.getItem("token");
    console.log(data);
    try {
        const response = await axios.delete(`https://healthcare-deployement.onrender.com${url}/`,
          {
            headers:{Authorization: `Bearer ${token}`},
            data
          }
      )
        console.log(response.data);
        return;
    } catch (error) {
        handleError(error);
    }
    return;
}

const handleError = (error)=>{
    if(error.response){
        if(error.response.status == 401){
            console.error("❌ 401 Unauthorized → redirecting to login");
            alert("Session TimedOut Login Again");
            window.location.href = "/login";
        }
        else if(error.response.status == 403){
            console.error("❌ 403 Forbidden → access denied");
            console.error("Server Response:", error.response.data); 
            alert("Session Timedout Login Again");
            window.location.href = "/login";
        }
        else{
            console.error(`⚠️ ${error.response.status}:`, error.response.data)
        }
    }
    else {
        console.error("⚠️ Network/Server error:", error.message);
    }
    throw error;
}

export {apiget,apipost,apidelete};