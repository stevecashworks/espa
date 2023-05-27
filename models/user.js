import Mongoose from 'mongoose';
const userSchema=new Mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    balance:{

        type:Number,
        default:0
    },
    password:{
        type:String,
        required:true
    },
    invitedBy:{
    type:String
    },
    notifications:{
        type:[
            {content:{type:String,required:true},time:{type:Date,default:Date.now()},read:{type:Boolean,default:false}}
        ],
        default:[]
    },
    messages:{
        type:[
            {content:{type:String,required:true},time:{type:Date,default:Date.now()}}
        ],
        default:[]
    
    },
    earnings:{
        type:Number,
        default:0
    },
    referalls:{
        type:Array,
        default:[]
    }

    
    
})
export default Mongoose.model('users',userSchema)
