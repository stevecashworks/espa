import Mongoose from 'mongoose';
const statModel=  new Mongoose.Schema(
    {
        runningDays:{
            type:Number,
            default:4028
        }, 
        totalWithdrawals:{
            type:Number,
            default:40967786.48
        },
        totalAccounts:{
            type:Number,
            default:201
        },
        totalInvestments:{
            default:7898.12,
            type:Number

        }
    }
)
export default Mongoose.model('stats',statModel)