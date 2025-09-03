import { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useLoading } from './LoadingContext';

//remove 6-42 after import
const apiget = async (url) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`https://healthcare-deployement.onrender.com${url}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const apiPost = async (url, Data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`https://healthcare-deployement.onrender.com${url}`, Data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
const handleError = (error) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      alert("Session Timed Out. Please Login Again");
      window.location.href = "/login";
    } else {
      console.error(`⚠️ ${error.response.status}:`, error.response.data);
    }
  } else {
    console.error("⚠️ Network/Server error:", error.message);
  }
  throw error;
};


function Home() {
  const [data, setData] = useState([]);
  const {loading, setLoading} = useLoading();
  const [error, setError] = useState(null);
  const [login, setLogin] = useState("Submit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiget('/api/home');
        console.log(result);
        setData(result.email);
      } catch (error) {
        console.log(error);
        setError("Server Issue");
      } finally {
        setLoading(false);
      }
    };
    setTimeout(async () => {
          const responseg = await apiget('/api/details');
          if(responseg.data.length!=0){
            window.location.href = '/user/dashboard';
          }
            setLoading(false);
        }, 1000);
    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoading(true);
    setLogin("Loading...");

    const form = e.target;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    try {
      const response = await apiPost('/api/home', values);
      if (response.success) {
        window.location.href = '/user/dashboard';
      } else {
        setLogin("Error");
      }
    } catch (error) {
      setLogin("Failed");
    } finally {
      setLoading(false);
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };



  return (
    <div className="outer-container">
      <div className="inner-container">
        <header className="form-head">
          <h1>ENROLLMENT FORM</h1>
        </header>
        <form onSubmit={submit} className="form-body">
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="number" name="age" min={1} max={105} placeholder="Age" required />
          <input type="email" name="email" value={data || ""} readOnly />
          <div className="gender-box">
             <h5>Gender</h5>
             <select name="gender" required>
             <option value="" disabled selected>Select gender</option>
             <option value="male">Male</option>
             <option value="female">Female</option>
             <option value="other">Other</option>
             </select>
             </div>
          <input type="tel" name="phoneNum" maxLength={10} placeholder="Mobile Number" required />
          <input type="tel" name="alternateNum" maxLength={10} placeholder="Alternate Mobile Number" required />
          <input type="text" name="address" placeholder="Residence Address" />
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="state" placeholder="State" />
          <input type="number" name="pinCode" placeholder="Pin Code" />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? login : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
