import React, { useState } from "react";
import "./Sidebar.css";
import menu from '../assets/menu.svg'
import cross from '../assets/cross.svg'
import ecg from '../assets/ecg.svg'
import pill from '../assets/pill.svg'
import dashboard from "../assets/dashboard.svg";
import signout from "../assets/exit.svg"

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <header>
          {isCollapsed ?(
              <><div>
                <button className="collapse-btn" onClick={toggleSidebar}>
                  <img src={menu}/>
                </button>
                <div>
                <img src={cross} alt="health"/>
                </div>
              </div>
              </>
            )
             :(<>
                  <img src={cross} alt="health"/>
                  <h2>HealthCare+</h2>
                  <button className="collapse-btn" onClick={toggleSidebar}>
                    <img src={menu}/>
                  </button>
             </>)}
      </header>
      <main>
        <div className="sideBox">
          <button className="sidebar-button" onClick={()=>{if(window.location.pathname != '/user/dashboard'){window.location.href = '/user/dashboard'}}}>
                <div className="button-content">
                  <img src={dashboard} alt="dashboard" />
                </div>
                <div>
                  {!isCollapsed && <p className="space">Dashboard</p>}
                </div>
            </button>
        </div>
        <div className="sideBox" onClick={()=>{if(window.location.pathname != '/user/healthconditions'){window.location.href = '/user/healthconditions'}}}>
          <button className="sidebar-button" >
                <div className="button-content">
                  <img src={ecg} alt="ecg" />
                </div>
                <div className="button-content">
                  {!isCollapsed && <p className="space">Conditions</p>}
                </div>
            </button>
        </div>
        <div className="sideBox">
          <button className="sidebar-button" onClick={()=>{if(window.location.pathname != '/user/medications'){window.location.href = '/user/medications'}}}>
                <div className="button-content">
                  <img src={pill} alt="medic" />
                </div>
                <div className="button-content">
                  {!isCollapsed && <p className="space">Medications</p>}
                </div>
            </button>
        </div>
        <div className="sideBox">
          <button className="sidebar-button" onClick={()=>{
            localStorage.removeItem("token");
            window.location.href = '/login';
            }}>
                <div className="button-content">
                  <img src={signout} alt="medic" />
                </div>
                <div className="button-content">
                  {!isCollapsed && <p className="space">Sign Out</p>}
                </div>
            </button>
        </div>
      </main>
    </div>
  );
}
