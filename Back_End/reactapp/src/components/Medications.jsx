import Cardmedic from "./Cardmedic";
import {apipost} from "../apiservice";
import './Dialog.css';
import React, {useRef} from "react";
import { useLoading } from "../LoadingContext";

export default function MedicCard(props){
  // console.log(props.cardProps.length)
  const {loading,setLoading} = useLoading();

  const content = props.cardProps.length === 0 ? (
        <p className="no-conditions">Click + to add Medications</p>
      ) : (
        props.cardProps.map((properties, index) => (
          <Cardmedic
            key={index}
            heading={properties.medication}
            description={properties.dosage}
            refresh={props.refresh}
          />
        ))
      );
const submitEvent = async (e)=>{
  e.preventDefault();
  const medication = document.getElementById("medication").value;
  const dosage = document.getElementById("dosage").value;
  const data = {
    medication: medication,
    dosage: dosage
  };
  setLoading(true);
  let response;
  try {
    response = await apipost('/api/medications',data);
  } catch (error) {
    console.log("dialogbox med error(API)");
  }
  finally{
    setLoading(false);
  }
  const dialogBox = document.querySelector('.dialogboxMed');
  const message1 = document.createElement('p');

  if (response.success) {
    message1.textContent = "Added Condition!";
    message1.style.color = "green";
    setTimeout(() => {
      message1.remove();
      props.refresh();
      dialogRef.current.close();
    }, 1000);
  } else {
    message1.textContent = response.error || "Failed to add condition!";
    message1.style.color = "red";
    setTimeout(() => {
      message1.remove();
    }, 1000);
  }
  dialogBox.appendChild(message1);
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
            <p>A list of your current Medication</p>
          </div>
        </div>
        <button className="add" onClick={() => dialogRef.current.showModal()}>+</button>
      </header>
      {content}
        <dialog ref={dialogRef} className="dialog-modal" onClose={() => {props.refresh();}}>
          <div className="dialogboxMed">
            <h2>Add Medication</h2>
            <form onSubmit={submitEvent} className="dialogform">
              <input placeholder="Medication" id="medication" required/>
              <input placeholder="Dosage" id="dosage" required/>
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
