import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login.jsx';
import Home from './Home.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx';
import { LoadingProvider } from './LoadingContext.jsx';


function App() {
  return (
    <LoadingProvider>
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<Home />} />
            <Route path="/register" element={<div className="Register-page"><Register /></div>}/>
            <Route path="/user/*"  element={<div className="dashboard-page"><Dashboard /></div>}/>
            <Route path="*" element={<p>Page Not Found! ERR_404</p>} />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}
export default App;
