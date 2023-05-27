function CustomError(message,code){
this.message=message;
this.code=code;
}
CustomError.prototype=Error.prototype;
CustomError.prototype.constructor=function(message,code){
    this.message=message;
    this.code=code;
}
const createCustomError=(message,code)=>{
    return new CustomError(message,code)
}
export default createCustomError