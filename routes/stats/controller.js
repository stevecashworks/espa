import createCustomError from "../../error.js"
import stats from "../../models/stats.js"
//increase stats daily
setInterval(()=>{
    stats.updateMany({$inc:{runningDays:1,totalInvestments:Math.random()*3000,totalWithdrawals:Math.random()*200,totalAccounts:Math.random()*4}})
},(60000*3600*24))
export const  getStats=async(req,res,next)=>{
try {
     
    const allStats=await stats.findOne() 
    
    console.log(allStats)
    res.status(200).json({success:true,result:allStats})
    
} catch (error) {
    next(createCustomError(error.message,500))
}
}