const mongoose=require("mongoose");

const SlotSchema=mongoose.Schema({
    category:{type:String,required:true},
    sub_category:{type:String,required:true},
    start:{type:String,required:true},
    duration:{type:String,required:true},
    Date:{type:String,required:true},
    isBooked:{type:Boolean,default:false},
    meetingId:{type:String,default:null}
})

const SlotModel=mongoose.model("Slot",SlotSchema);

module.exports={
    SlotModel
}