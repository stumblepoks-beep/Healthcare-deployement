import express from 'express';
import cors from 'cors'; 
//middleware
const app = express();
app.use(cors());
app.use(express.json());
//Database
import supabase from '../DataBase/supabase.js';

const getHealthConditions = async (req,res) =>{
    try {
        const data = await supabase.from('healthConditions').select('*').eq('email',req.user.email);
        res.status(201).json({success:true,data});
    } catch (error) {
        res.status(400).json({success: false, error: error});
        console.error(error);
    }
};

const postHealthConditions = async(req,res) =>{
    try {
        const datacheck = await supabase.from('healthConditions').select('*').eq('email',req.user.email).eq('condition',req.body.condition);
        console.log(datacheck.data.length);
        if(datacheck.data.length!=0){
            res.status(200).json({success:false,error:"Duplicate Entry"})
        }
        else{
            const data = await supabase.from('healthConditions').insert([{
                condition: req.body.condition,
                description: req.body.description,
                email: req.user.email
            }]);
            res.status(201).json({success: true, data: data});
        }
    } catch (error) {
        res.status(400).json({success: false, error: error});
    }
}

const deleteHealthCondition = async (req,res)=>{
    try {
        const deletedb = await supabase.from('healthConditions').delete().eq('condition', req.body.condition).eq('email', req.user.email);
        console.log(req.body);
        res.status(200).json({success: true, data: true});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, error: error});
    }
}

export  {getHealthConditions,postHealthConditions,deleteHealthCondition};

