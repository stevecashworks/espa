import user from "../../models/user.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sendMail } from "../../mail.js";
import createCustomError from '../../error.js';
dotenv.config();
const randomChar=()=>{
  let char="";
 const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234568789";
  for(let i=0; i<10;i++){
      char+= chars[Math.floor(Math.random()*chars.length)]
  }
  return char
}
export const resetPassword=async(req,res,next)=>{
  try {
     const  {newPass}= req.body;

     const allUsers=await user.find();
     console.log(allUsers.map(x=>x._id))
     const newDetails= await user.findByIdAndUpdate(req.params.id,{$set:{password:newPass}},{new:true});
     console.log("new details: ",newDetails)
      
     res.status(201).json({success:true,result:"password changed successfully"})
  } catch (error) {
    next(createCustomError(error.message,500))

  }

}

  export const registerUser=async(req,res,next)=>{
    try {
      console.log(req.body)
         const {invitedBy}=req.body
      const newUser=await user.create(req.body)
      const token= await jwt.sign({id:newUser._id},process.env.jwt_pass)
        if(invitedBy){
           await user.findByIdAndUpdate(invitedBy,{$addToSet:{referalls:newUser._id}})
        };
        await sendMail(req.body.email,"Welcome to ESPA",
        `
        <html>
        <body>
        <img src="gs://koin-7ea67.appspot.com/ESPA2.png"/>
        <h3 style="text-align:center;">Welcome To ESPA</h3>
        <p style="text-align:center;">Welcome aboard ${req.body.firstName}! Get ready to embark on a thrilling online journey with us. We're excited to have you as a new member of our company. Explore, connect, and enjoy the endless possibilities that await!</p>
        </body>
        </html>
        `
        )
      res.status(201).json({success:true,result:token})
    } catch (error) {
      console.log(error)
      next(createCustomError(error.message,500))
         
    }
 }
 export const login=async(req,res,next)=>{
  try {
    const {email,password}=req.body
    console.log({email,password})
    const thisUser=await user.find({email})
    // console.log(thisUser)
    if(thisUser.length==0){
      return next(createCustomError(`We couldn't find a user with this email`,404))
    }
    else if(!(password===thisUser[0].password)){
     return next(createCustomError('Password is incorrect, check and try again!'),403)
    }
    else{
      const token= await jwt.sign({id:thisUser[0]._id},process.env.jwt_pass)
       return res.status(200).json({success:true,result:token})
    }
  } catch (error) {
   console.log(error)
   next(createCustomError(error.message,500))  
  }
 }
 export const loginWithToken=async(req,res,next)=>{
  try {
    console.log('user',req.user)
    const  thisUser = await user.findById(req.user.id)
    // console.log(thisUser)
     const {password,...others}=thisUser._doc
    res.status(200).json({success:true,result:others})  
  } catch (error) {
    console.log(error)
    next(createCustomError(error.message,500))
  }
  
 }
 export const getReferrersName=async(req,res,next)=>{
  try {
    const referrer=  await user.findById(req.params.id);
    res.status(200).json({success:true,result:referrer.firstName+" "+referrer.lastName})
    } catch (error) {
      console.log(error.message)
    next(createCustomError(error.message,500)) 
  }
 }
 export const getAllUsers=async(req,res,next)=>{
   try{
  const allUsers=await user.find();
  res.status(200).json({success:true,result:allUsers})
   }catch(err){
 next(createCustomError(err.message,500))
   }
 }
  export const findByEmail=async(req,res,next)=>{
    try{
      const thisUser= await user.findOne({email:req.body.email});
      if(thisUser){
        await sendMail(req.body.email,"ESPA password reset",`
        <html>
        <body>
        <h2>Password reset</h2>
        <p>Hi, ${thisUser.firstName} please click the button below to continue</p>
        <a href=${`https://espainvestment.onrender.com/dashboard/content/reset.html?rq=${thisUser._id}${randomChar()}`} style="display:block; border-radius:8px;text-decoration: none;padding: 10px 20px; background-color: teal; color: white; margin:20px auto; font-weight:bold; text-align:center;">Reset password</a>

        reset password
         
        </a>
        </body>
        </html>
        `)
        res.status(200).json({success:true,result:thisUser})

      }else{
        next(createCustomError("No user was found with this email"))
      }

    }
    catch(error){
       next(createCustomError(error.message))
    }
  }