import jwt from "jsonwebtoken";
const secret_key = process.env.secret_key;

 const auth = async (req,res,next)=>{
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if(!token) return res.status(401).json({success:false, message: "No Token"});
  jwt.verify(token,secret_key,(err,user)=>{
    if(err){
      return res.status(403).json({
      success:false,message:"Invalid Token"
    })
    }
    req.user = user;
    next();
  })
}

export default auth;