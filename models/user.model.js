const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    date_of_birth:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"}
})

const UserModel=mongoose.model("User",userSchema);

module.exports={
    UserModel
}