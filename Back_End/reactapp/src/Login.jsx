  import { useState } from 'react'
  import './Login.css'
  import {apiget} from './apiservice.js'
  import axios from "axios"
  import {useLoading} from "./LoadingContext.jsx";
  function Login(){
      const { loading,setLoading } = useLoading();
      const [login,setlogin] = useState("submit");
  const submit = async (e)=>{
      e.preventDefault();
      setLoading(true);
      setlogin("Loading...")
      const emailpass = {
        email : document.querySelector('.email').value,
        password : document.querySelector('.pass').value,
      }
      try {
        const response = await axios.post("https://healthcare-deployement.onrender.com/api/login", emailpass);
        if(response.data.success == 'true'){
          console.log(response.data);
          localStorage.setItem("token",response.data.token);
          setlogin("Redirecting...");

          setTimeout(async () => {
          const responseg = await apiget('/api/details');
          if(responseg.data.length==0){
            window.location.href = '/about';
          }
          else{
            console.log(responseg.data.length);
            window.location.href = '/user/dashboard';
          }
            setLoading(false);
        }, 1000);
        }
        else{
          setlogin(`${response.data.msg}`);
          setTimeout(()=>{setLoading(false)},1000);
        }
      } catch (err) {
        console.log('Login failed:', err);
      } 
    }
    return (
     <div className="login-page">
      <div className="info-section">
        <h1>Welcome to HealthCare+</h1>
        <p>

        </p>
      </div>

      
      <div className="form-section">
        <form onSubmit={submit} className="login-form">
          <h2>Login</h2>
          <input type="email" placeholder="Email" className="email" required />
          <input type="password" placeholder="Password" className="pass" required />
          <button type="submit" disabled={loading}>
            {loading ? login : "Submit"}
          </button>
        </form>
        <p>
          Not a member? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  )

}
export default Login;