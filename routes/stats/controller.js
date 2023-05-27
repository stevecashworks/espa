import createCustomError from "../../error.js"
import stats from "../../models/stats.js"
export const  getStats=async(req,res,next)=>{
try {
     
    const allStats=await stats.findOne() 
    
    console.log(allStats)
    res.status(200).json({success:true,result:allStats})
    
} catch (error) {
    next(createCustomError(error.message,500))
}
}