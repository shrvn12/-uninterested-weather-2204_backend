const mongoose=require("mongoose");


const MeetingSchema=mongoose.Schema({
    category:{type:String,required:true},
    sub_category:{type:String,required:true},
    slotId:{type:String,ref:"slot",required:true},
    doctorId:{type:String,ref:"Doctor",required:true},
    userId:{type:String,ref:"user",required:true},

});

const MeetingModel=mongoose.model("meeting",MeetingSchema);

module.exports={
    MeetingModel
}