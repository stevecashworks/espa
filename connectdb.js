import Mongoose from 'mongoose'
const connectDb=async(uri)=>{
    return Mongoose.connect(uri)

}
export default connectDb