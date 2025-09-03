/* External Libs*/
import express from 'express';
import cors from 'cors';
import path from 'path'; 
import { fileURLToPath } from 'url';
//middleware
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../reactapp/dist')));

//Controllers
import login from './controllers/login.js';
import {getHomePage,postHomePage} from './controllers/homePage.js';
import auth from './Auth/auth.js';
import register from './controllers/register.js'
import {deleteHealthCondition, getHealthConditions,postHealthConditions} from './controllers/healthConditions.js';
import {getMedications, postMedications,deleteMedication} from './controllers/medications.js';
import supabase from './DataBase/supabase.js';

export const secret_key = "reallylongstring";

const getDetails = async (req,res)=>{
  try {
    const data = await supabase.from('details').select('*').eq('email',req.user.email);
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({success:false});
  }
}

app.get('/api/home',auth,getHomePage).post('/api/home',auth,postHomePage);
app.post('/api/login',login);
app.post('/api/register',register);
app.get('/api/healthconditions',auth,getHealthConditions).post('/api/healthconditions',auth,postHealthConditions).delete('/api/healthconditions',auth,deleteHealthCondition);
app.get('/api/medications',auth,getMedications).post('/api/medications',auth,postMedications).delete('/api/medications',auth,deleteMedication);
app.get('/api/details',auth,getDetails);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../reactapp/dist/index.html'));
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
