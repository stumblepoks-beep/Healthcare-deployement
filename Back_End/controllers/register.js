import express from 'express';
import cors from 'cors'; 
import encrypt from 'bcrypt';
//middleware
const app = express();
app.use(cors());
app.use(express.json());
//Database
import supabase from '../DataBase/supabase.js';

const register = async (req,res)=>{
  const{password:password} = req.body;
  const {email:email,lastName:lastName,firstName:firstName} = req.body;
  const hashed = await encrypt.hash(password,10);
  const update1 = await supabase.from('users').select('email', { count: 1, distinct: true }).eq('email',email);
  console.log(update1.length);
  if(update1.data.length == 0){
    console.log(update1);
    const create = await supabase.from('users').insert({email:email,password:hashed,lname:lastName,fname:firstName});
    res.status(201).json({success:"true"});
  }
  else{
    res.status(201).json({
      success:"false",
      msg: "already an account exists with that email"
      })
  }
}

export default register;