import Mongoose from 'mongoose';
const withdrawalSchema=new Mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    Amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
})
export default Mongoose.model('withdrawals',withdrawalSchema)