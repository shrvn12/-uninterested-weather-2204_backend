
const { body, validationResult } = require("express-validator");
const {SlotModel}=require("../models/Slot.model");

const AddSlot=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const {category,sub_category,Date,start,duration}=req.body;
    const AddSlot=new SlotModel({category,Date,sub_category,start,duration});
    await AddSlot.save()
    console.log(AddSlot)
    res.status(200).send({"msg":"slot has been added"})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong",error})
    }
}

const GetAllSlot=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
   const AllSlots=await SlotModel.find({isBooked:false})
    res.status(200).send(AllSlots)

    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

const RemoveASlot=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const {id}=req.body;
    const deleteAslot=await SlotModel.findByIdAndDelete({_id:id});
    res.status(204).send({"msg":"slot has been deleted"})

    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

const GetAdminSlot=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const {id}=req.body;
    const AllSlot=await SlotModel.find();
    res.status(201).send(AllSlot)

    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

const GetParticularSlotPrice=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const {id}=req.body;
    const ASlot=await SlotModel.findOne({_id:id});
    res.status(200).send(ASlot)

    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

module.exports={
    AddSlot,RemoveASlot,GetAllSlot,GetAdminSlot,GetParticularSlotPrice
}

