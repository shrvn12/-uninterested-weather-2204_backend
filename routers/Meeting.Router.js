const {getAllMeetings,createMeeting}=require("../controllers/Meeting.Controller")
const express=require("express");
const MeetingRouter=express.Router();

const {Authentication}=require("../middlewares/Authentication")
MeetingRouter.use(Authentication)

MeetingRouter.post('/newMeeting',createMeeting)
MeetingRouter.get('/admin/allMeetings',getAllMeetings)


module.exports={
    MeetingRouter
}