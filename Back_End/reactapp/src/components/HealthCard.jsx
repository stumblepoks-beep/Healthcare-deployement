import Card from "./Card";
import {apipost} from "../apiservice";
import './Dialog.css';
import React, {useRef,useState,useEffect } from "react";
import { useLoading } from "../LoadingContext";

export default function HealthCard(props){
  const {loading,setLoading} = useLoading();
   const content = props.cardProps.length === 0 ? (
      <p className="no-conditions">Click + to add Health Conditions</p>
    ) : (
      props.cardProps.map((properties, index) => (
        <Card
          key={index}
          heading={properties.condition}
          description={properties.description}
          refresh={props.refresh}
        />
      ))
    );
const submitEvent = async (e)=>{
  e.preventDefault();
  const condition = document.getElementById("condition").value;
  const description = document.getElementById("description").value;
  const data = {
    condition: condition,
    description: description
  }
  setLoading(true);
    let response;
    try {
      response = await apipost('/api/healthconditions',data);
    } catch (error) {
      console.log("dialogbox med error(API)");
    }
    finally{
      setLoading(false);
    }
  const dialogBox = document.querySelector('.dialogbox');
  const message = document.createElement('p');

  if (response.success) {
    message.textContent = "Added Condition!";
    message.style.color = "green";
    setTimeout(() => {
      message.remove();
      props.refresh();
      dialogRef.current.close();
    }, 1000);
  } else {
    message.textContent = response.error || "Failed to add condition!";
    message.style.color = "red";
    setTimeout(() => {
      message.remove();
    }, 1000);
  }
  dialogBox.appendChild(message);
};
const dialogRef = useRef();
  return (
    <div className="healthContainer ">
      <header>
        <div className="heading">
          <div className="mainHeading">
            <img src={props.src} alt="ECG" />
            <h2>{props.name}</h2>
          </div>
          <div className="desc">
            <p>A list of your current health condtions</p>
          </div>
        </div>
        <button className="add" onClick={() => dialogRef.current.showModal()}>+</button>
      </header>
      {content}
        <dialog ref={dialogRef} className="dialog-modal" onClose={() => {props.refresh();}}>
          <div className="dialogbox">
            <h2>Add Health Condition</h2>
            <form onSubmit={submitEvent} className="dialogform">
              <input placeholder="Condition" id="condition" required/>
              <input placeholder="Description" id="description" required/>
              <button type="submit" disabled={loading}>{loading ? "Loading..." : "Add"}</button>
            </form>
            <button className="close-btn" onClick={() => dialogRef.current.close()}>
              Close
            </button>
          </div>
        </dialog>
    </div>
  );
}
