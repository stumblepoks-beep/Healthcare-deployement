import express from 'express';
import cors from 'cors'; 
//middleware
const app = express();
app.use(cors());
app.use(express.json());
//Database
import supabase from '../DataBase/supabase.js';

const getMedications = async (req,res) =>{
    try {
        const data = await supabase.from('medications').select('*').eq('email',req.user.email);
        res.status(201).json({success:true,data});
    } catch (error) {
        res.status(400).json({success: false, error: error});
        console.error(error);
    }
};

const postMedications = async(req,res) =>{
    try {
        const datacheck = await supabase.from('medications').select('*').eq('email',req.user.email).eq('medication',req.body.medication);
        if(datacheck.data.length!=0){
            res.status(200).json({success:false,error:"Duplicate Entry"})
        }
        else{
            const data = await supabase.from('medications').insert([{
                medication: req.body.medication,
                dosage: req.body.dosage,
                email: req.user.email
            }]);
            res.status(201).json({success: true, data: data});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, error: error});
    }
}

const deleteMedication = async (req,res)=>{
    try {
        const deletedb = await supabase.from('medications').delete().eq('medication', req.body.medication).eq('email', req.user.email);
        console.log(req.body);
        res.status(200).json({success: true, data: true});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, error: error});
    }
}

export  {getMedications,postMedications,deleteMedication};

