import {useState} from 'react'
import { useEffect } from "react";
import "./Register.css"
import axios from 'axios'
 import {useLoading} from "./LoadingContext.jsx";

function Register(){
    const {loading, setLoading} = useLoading();
    const [register,setregister] = useState("submit");
    const submit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    setregister("Loading...")
    const formData = {  
      email : document.querySelector('.email').value,
      password : document.querySelector('.pass').value,
      firstName: document.querySelector('.fname').value,
      lastName:  document.querySelector('.lname').value
    }
     try {
      const response = await axios.post("https://healthcare-deployement.onrender.com/api/register", formData);
      if(response.data.success == 'true'){
        setregister("Registration success!");
        setLoading(false);
        alert("Registration Success!! Please Login.");
        window.location.href = '/login';
      }
      else{
        setregister(`${response.data.msg}`);
      }
      setTimeout(() => {
          setLoading(false);
      }, 1000);
    } catch (err) {
      console.log('Login failed:', err);
    }
  }
    return (
    <>
      <form className="regform" onSubmit={submit} style={{ maxWidth: "400px", margin: "auto" }}>
        <h2>Create Account</h2>
        <input type='text' placeholder='First Name' className='fname' required></input>
        <input type='text' placeholder='Last Name' className='lname' required></input>
        <input type = "email" placeholder='Email' className='email' required></input>
        <input type='password' placeholder='Password' className='pass' required></input>
        <button type = 'submit' disabled={loading}> {loading ? register : "Submit"} </button>
       <p className='member'>Already A member? <a href='/login'>LogIn</a></p>
      </form>
      
    </>
  )
}

export default Register;