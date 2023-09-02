const {AddSlot,RemoveASlot,GetAllSlot,GetAdminSlot,GetParticularSlotPrice}=require("../controllers/Slot.controller")

const express=require("express");

const SlotRouter=express.Router();

const {Authentication}=require("../middlewares/Authentication")
SlotRouter.use(Authentication)
SlotRouter.get('/slots',GetAllSlot)
SlotRouter.get('/getCosts/:slotId',GetParticularSlotPrice)
SlotRouter.get('/admin/allSlots',GetAdminSlot)
SlotRouter.post('/admin/addSlot',AddSlot)


module.exports={
    SlotRouter
}