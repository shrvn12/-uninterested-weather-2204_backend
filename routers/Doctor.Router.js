const { GetAllDoctor,GetParticularDoctor,AddDoctor,DeleteADoctor}=require("../controllers/Doctor.Controller")
const express=require("express");
const DoctorRouter=express.Router();

const {Authentication}=require("../middlewares/Authentication")

DoctorRouter.get('/doctors',Authentication,GetAllDoctor)
DoctorRouter.post('/admin/addDoctor',Authentication,AddDoctor)

module.exports={
    DoctorRouter
}