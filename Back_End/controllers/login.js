import express from 'express';
import cors from 'cors'; 
import encrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
//database
import supabase from '../DataBase/supabase.js';
//middleware
const app = express();
app.use(cors());
app.use(express.json());
//secret_key
const secret_key = process.env.secret_key;

const login = async (req,res)=>{
  const{password:password} = req.body;
  const {email:email} = req.body;
  const update1 = await supabase.from('users').select('*', { count: 'exact', distinct: true }).eq('email',email);
  if(!update1.data[0]){
    return res.status(201).json({msg:`no member with that email`,success:`false`});
  }
  const compared = await encrypt.compare(password,update1.data[0].password);
  if(compared){
    const token = jwt.sign(
      {email:email},
      secret_key,
      {expiresIn:"10h"}
    );
    res.status(201).json({success : "true",token:token});
  }
  else{
    res.status(201).json({msg :`Incorrect Password`,success:`false`});
  }
}

export default login;