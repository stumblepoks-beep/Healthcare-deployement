import {apiget} from '../apiservice';
import { useEffect, useState } from 'react';
export default function PersonalDetails(){
    const url = '/api/details';
    const [details,setDetails] = useState([]);
    const fetchdata = async()=>{
        const data = await apiget(url);
        setDetails(data.data[0]);
    }
    useEffect(()=>{
        fetchdata();
    },[]);
    return(
        <>
        <p className="personal-details">Personal Details</p>
        <div className="subflex">
            <div className="subflex1">
                <div className="detail-row">
                    <span className="label">First Name</span>
                    <span className="value">{details.firstName}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Last Name</span>
                    <span className="value">{details.lastName}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Age</span>
                    <span className="value">{details.age}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Gmail</span>
                    <span className="value">{details.email}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Phone</span>
                    <span className="value">{details.phoneNum}</span>
                </div>
            </div>
            <div className="subflex2">
                <div className="detail-row">
                <span className="label">Street</span>
                <span className="value">{details.adress}</span>
            </div>
            <div className="detail-row">
                <span className="label">City</span>
                <span className="value">{details.city}</span>
            </div>
            <div className="detail-row">
                <span className="label">State</span>
                <span className="value">{details.state}</span>
            </div>
            <div className="detail-row">
                <span className="label">Pincode</span>
                <span className="value">{details.pinCode}</span>
            </div>
            </div>
    </div>
    </>
    );
}