

const {MeetingModel}=require("../models/Meeting.model");
const { body, validationResult } = require("express-validator");
const {SlotModel}=require('../models/Slot.model')
const stripe = require("stripe")("sk_test_51MreRESAewYLUjTauTI6fim3a3Zh0xJYHUbwsNpHfVbVIicJ2rymKrb2tRaAlSeEHMJ4lv5rYHAMp2luuzD1HG9w00pqpYgQWr");
// const {CalculateCost}=require()
const createMeeting=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const {category,sub_category,slotId,doctorId,Userid}=req.body;
    console.log({category,sub_category,slotId,doctorId})
    const MeetingInitialise=new MeetingModel({category,sub_category,slotId,doctorId,userId:Userid});
    await MeetingInitialise.save();
    await SlotModel.findByIdAndUpdate(slotId,{isBooked:true,meetingId:MeetingInitialise._id})
    res.status(200).send({"msg":"meeting has been generated"})

    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong",error})
    }
}
const getAllMeetings=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const AllMeetings=await MeetingModel.find();
    console.log(AllMeetings)
    res.status(200).send(AllMeetings)

    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

module.exports={
    getAllMeetings,createMeeting
}

