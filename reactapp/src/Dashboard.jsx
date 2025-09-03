import HealthCard from "./components/HealthCard";
import MedicCard from "./components/Medications";
import React, { useEffect, useState,useRef } from "react";
import PersonalDetails from "./components/PersonalDetails"
import axios from 'axios';
import './App.css'
import SideBar from "./components/SideBar";
import { apiget } from "./apiservice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ecg from "./assets/ecg.svg";
import pill from "./assets/pill.svg";
import { useLoading } from "./LoadingContext";

export default function Dashboard(){
  const [conditions, setConditions] = useState([]);
  const [medications, setMedications] = useState([]);
   const [error, setError] = useState(null);
  const {loading, setLoading} = useLoading();

  const url = "/api/healthconditions";
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiget(url);
        setConditions(data.data.data);
      } catch (error) {
        setError("Unauthorized");
      } finally{
        setLoading(false);
      }
    };
  const urlMed = "/api/medications";
  const fetchDataMed = async () => {
      try {
        setLoading(true);
        const data = await apiget(urlMed);
        setMedications(data.data.data);
      } catch (error) {
      }finally{
        setLoading(false);
      }
    };
  useEffect(() => {
    setLoading(true);
    const temp = async ()=>{
      try{
        await fetchData();
        await fetchDataMed();
      }
      catch(error){
        console.log(error)
      }
      finally{
        setLoading(false);
      }
    }
    temp();
  }, []);
  const [collapsed,setcollapsed] = useState(false);
  if (error) return <p>{error}</p>;
  return(
    <div className={`mainBody ${collapsed?"collapse":""}`}>
      <div className={`hi ${collapsed?"collapse":""}`}>
        <SideBar/>      
      </div>
        <Routes>
          <Route path="/dashboard" element={
            <div className="hello">
              <div className="flex1">
                <main>
                  <HealthCard src={ecg} name={"Health Conditions"} cardProps = {conditions} refresh={fetchData}/>
                  <MedicCard src={pill} name={"Medications"} cardProps={medications} refresh={fetchDataMed}/>
                </main>
              </div>
              <div className="flex2">
                <PersonalDetails/>
              </div>
            </div>
          }>
          </Route>
          <Route path="/medications" element={
            <div className="hello">
              <div className="flex1">
                <main>
                  <MedicCard src={pill} name={"Medications"} cardProps={medications} refresh={fetchDataMed}/>
                </main>
              </div>
            </div>}></Route>
            <Route path="/healthconditions" element={
              <div className="hello">
                <div className="flex1">
                  <main>
                    <HealthCard src={ecg} name={"Health Conditions"} cardProps = {conditions} refresh={fetchData}/>
                  </main>
                </div>
              </div>}></Route>
        </Routes>
    </div>
  )
}

