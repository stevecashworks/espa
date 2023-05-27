import createCustomError from "../../error.js";
import investment from "../../models/request.js";
import user from "../../models/user.js";
import users from "../../models/user.js";
import plans from './plans.js'
export const invest=async(req,res,next)=>{
    try {
     
    const {id}=req.user;
    const newInvestment=await investment.create({...req.body,userId:id})
    const newUserDetails=  await users.findByIdAndUpdate(id,{$push:{notifications:{content:`Your request for ${req.body.requestType} of $${req.body.amount} has been recieved and is being processed`}}},{new:true})
    console.log(newUserDetails);
    res.status(200).json({success:true,result:newInvestment})  

    } catch (error) {
        next(createCustomError(error.message,500))        
    }

}
export const getAllInvestments=async(req,res,next)=>{
    try{
    const {id}=req.user;
    const myInvestments= await investment.find({userId:id})
    
    res.status(200).json({success:true,result:myInvestments})

    } catch(err){
    next(createCustomError(err.message,500))
    }
    
}   


export const getApprovedInvestments=async(req,res,next)=>{
 try {
  const  {id}=req.user;
   const AllApprovedRequests= await investment.find({userId:id,status:"approved"})
   console.log(AllApprovedRequests);
   
  

  res.status(200).json({success:true,AllApprovedRequests})   

 } catch (error) {
  console.log(error.message)
  next(createCustomError(error.message,500))  

 }
}
export const getPendingRequests=async(req,res,next)=>{
    try {
        const  {id}=req.user;
         const AllApprovedRequests= await investment.find({userId:id,status:"pending"})
         console.log(AllApprovedRequests);
         
        
      
        res.status(200).json({success:true,result:AllApprovedRequests})   
      
       } catch (error) {
        console.log(error.message)
        next(createCustomError(error.message,500))  
      
       }
}
 export const getAllUserRequests=async(req,res,next)=>{
    try{
             const allRequests= await investment.find().populate("userId",["firstName","lastName"])
             res.status(200).json({success:true,result:allRequests})
    }catch(err){
      next(createCustomError(err.message,500))
    }
}
export const single=async(req,res,next)=>{
    try{
 const  singleRequest= await investment.findById(req.params.id).populate("userId",["firstName","lastName"]);
 console.log(singleRequest)
 if(singleRequest){

    const {userId}=singleRequest;
    const userDetails= await user.findById(userId)
    // console.log(userDetails);
    if(userDetails){
        
        const {password,...others}= userDetails._doc
        console.log(others)
        return res.status(200).json({success:true,result:{...singleRequest._doc,userDetails:others}})
    }
}
    res.status(200).json({success:true,result:{singleRequest}})
}catch(err){
    next(createCustomError(err.message,500))
    }
}
export const latestWithdrawal=async(req,res,next)=>{
 try{
    // console.log(req.params.id)
    const latestWithdrawals=await  investment.find({userId:req.params.id,requestType:"withdrawal"}).sort({Date:-1})
    const latestInvestments= await investment.find({userId:req.params.id,requestType:"investment"}).sort({Date:-1})
    const latest={investment:latestInvestments[0],withdrawal:latestWithdrawals[0]}
    res.status(200).json({success:true,result:latest})
    

}catch(err){
 next(createCustomError(err.message,500))
}
}
export const deleteInvestment=async(req,res,next)=>{
    try{
         const id= req.params.id;
         const thisRequest= await investment.findById(id)
         console.log(thisRequest.requestType)
         const to=thisRequest.investType==="withdrawal"?"withdraw":"invest"
        //  await users.findByIdAndUpdate(thisRequest.userId,{$push:{notifications:{content:`your request to ${to}  $${thisRequest.amount} was not approved`}}})

         const deletedRequest=await investment.findByIdAndDelete(id);
         res.status(200).json({success:true,result:"This request was deleted Successfully"})
         
    }
    catch(err){
        next(createCustomError(err.message, 500))

    }
}
export const ApproveInvestment=async(req,res,next)=>{
    try{

        const id=req.params.id;
        const type=req.params.type
        const thisRequest=await investment.findByIdAndUpdate(id,{$set:{status:"approved",active:true}},{new:true})
        if(type==="withdrawal"){
        const newBal=await user.findByIdAndUpdate(thisRequest.userId,{$inc:{balance:Number(`-${thisRequest.amount}`)}},{new:true});
        return res.status(200).json({success:true,result:newBal})
        }
        else{

            
            const {durationHrs,percentage}=plans[thisRequest.plan];
            const profit=Math.round(thisRequest.amount/100*percentage)
            const returns= thisRequest.amount+profit
            console.log(returns)
            await user.findByIdAndUpdate(thisRequest.userId,{$push:{messages:{content:`Your request to invest $${thisRequest.amount} was approved and will be Processed in ${durationHrs}hrs`}}},{new:true})
            setTimeout(()=>{
                const addBal=async()=>{
                    
                    await user.findByIdAndUpdate(thisRequest.userId,{$inc:{balance:returns,earnings:profit}})
                    console.log('done')
                }
                addBal()
                
                
            }, 60000)
        }
        return res.status(200).json({success:true,result:"request was approved successfully"})
    }catch(err){
        next(createCustomError(err))
    }
}
export const sendMessage=async(req,res,next)=>{
    try{
         const requestDetails= await investment.findById(req.params.id);
          await user.findByIdAndUpdate(requestDetails.userId,{$push:{messages:{content:req.body.message}}});
           res.status(200).json({success:true,result:"message was sent to dashboard"})
    }
    catch(err){
        next(createCustomError(err.message,500))
    }

}
export const getActiveInvestment=async(req,res,next)=>{
    try{
        const activeInvestment=investment.findOne({userId:req.params.id,status:"active"});
        res.status(200).json({success:true,result:activeInvestment})

    }catch(err){
            next(createCustomError(err.message,500))
    }
}