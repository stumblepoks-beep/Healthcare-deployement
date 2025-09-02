import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
dotenv.config();
//database
import supabase from '../DataBase/supabase.js';
//middleware
const app = express();
app.use(cors());
app.use(express.json());

const getHomePage = async(req,res)=>{
  console.log(req.user.email);
  res.status(201).json({
    success: true, message: "Token Valid",email:req.user.email
  })
}

const postHomePage = async(req,res)=>{
  try {
      const {data,error} = await supabase.from('details').insert([{
        email: req.body.email,
        adress: req.body.address,
        age: parseInt(req.body.age),
        city: req.body.city,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNum: parseInt(req.body.phoneNum),
        state: req.body.state,
        pinCode: parseInt(req.body.pinCode),
      }]);
  } catch (error) {
    res.status(201).json({success: false,
      message: "Update Unsuccessful",
      data: this.error
    })
  }
  res.status(201).json({
    success: true, message: "Update Successful", data: req.body
  })
}

export {getHomePage,postHomePage};