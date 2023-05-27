import Mongoose from 'mongoose';
const investmentSchema=new Mongoose.Schema({
    requestType:{
        type:String,
        required:true,
        enum:["investment","withdrawal"]
        
    },
    userId:{
        type:String,
        ref:"users",
        required:true
    },
    Date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    amount:{
        type:Number,
        required:true
    },
    coinType:{type:String},
    walletId:{type:String},

    status:{
        type:String,
        default:'pending'
    },
    proof:{
        type:String
    },
    active:{
        type:Boolean,
        default:false
    },
    plan:{
         type:String,
         default:"none"
    }
},{timestamps:true})
export default Mongoose.model('Investments',investmentSchema)