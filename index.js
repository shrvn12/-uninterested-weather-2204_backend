const express=require('express');
const {connection}=require("./configs/db")
const app=express();
const cors=require("cors");
app.use(express.json());
app.use(cors());
require('dotenv').config()
const {DoctorRouter}=require('./routers/Doctor.Router');
const {UserRouter}=require("./routers/User.Router");
const {SlotRouter}=require("./routers/Slot.Router");
const {MeetingRouter}=require('./routers/Meeting.Router')
app.use(UserRouter);
app.use(SlotRouter);
app.use(MeetingRouter);
app.use(DoctorRouter);







app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log(error);
        console.log("db is not connected")
    }
    console.log(`http://localhost:${process.env.port}`)
})