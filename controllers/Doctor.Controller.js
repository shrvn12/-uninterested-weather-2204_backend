
const { body, validationResult } = require("express-validator");
const {DoctorModel}=require("../models/Doctor.model")
const {storage}=require("../helper/Multer");
require('dotenv').config()
const AddDoctor=async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }
        const { name,speciality,sub_speciality,degree} = req.body;
        console.log(req.body)
        console.log({ name,speciality,sub_speciality,degree})
        const saveDoctor=new DoctorModel({
            name,speciality,sub_speciality,degree
        })
        await saveDoctor.save()
        res.status(201).send({"msg":"Doctor registration successfull"})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong",error})
    }
}

const GetAllDoctor=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const AllDoctor=await DoctorModel.find();
    res.status(200).send(AllDoctor);

    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

const DeleteADoctor=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const {id}=req.body;
    const deleteADoctor=await DoctorModel.findByIdAndDelete({_id:id});
    res.status(204).send({"msg":"particular doctor has been deleted"})
    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

const GetParticularDoctor=async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const {id}=req.body;
    const ADoctor=await DoctorModel.findOne({_id:id});
    res.status(200).send(ADoctor)

    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

module.exports={
    GetAllDoctor,GetParticularDoctor,AddDoctor,DeleteADoctor
}