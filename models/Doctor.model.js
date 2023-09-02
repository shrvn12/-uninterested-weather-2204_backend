const  mongoose  = require("mongoose");

const DoctorSchema=mongoose.Schema({
    name:{type:String,required:true},
    speciality:{type:String,required:true},
    sub_speciality:{type:String,required:true},
    degree:{type:String,required:true}
});


const DoctorModel=mongoose.model("Doctor",DoctorSchema);


module.exports={
    DoctorModel
}