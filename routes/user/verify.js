import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const  VerifyToken=async(req,res,next)=>{
    const tk=req.params.tk
    console.log(tk)
 jwt.verify(tk,process.env.jwt_pass,(err,user)=>{
        if(err){
        res.status(403).json({success:false,result:"User authentication failed!"})
            console.log(err)
        }else{
            console.log ("data:",user)
            req.user=user;
            next()
        
            
        }
    })
    
}