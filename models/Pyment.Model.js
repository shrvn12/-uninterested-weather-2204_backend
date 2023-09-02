const mongoose=require("mongoose");
const PaymentSchema=mongoose.Schema({
    meetingId:{type:String,ref:"meeting",require:true},
    price:{type:Number,require:true},
    isPaid:{type:Boolean,default:false}
})

const PaymentModel=mongoose.model("Payment",PaymentSchema);

module.exports={
    PaymentModel
}