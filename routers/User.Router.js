const {userSignup,
    userLogin,
    UserDelete,
    getAllUser}=require('../controllers/User.controller');
const express=require("express");
const {Authentication}=require("../middlewares/Authentication")
const UserRouter=express.Router();
const stripe = require("stripe")("sk_test_51MreRESAewYLUjTauTI6fim3a3Zh0xJYHUbwsNpHfVbVIicJ2rymKrb2tRaAlSeEHMJ4lv5rYHAMp2luuzD1HG9w00pqpYgQWr");
UserRouter.post('/register',userSignup)
UserRouter.post('/login',userLogin)
UserRouter.get('/Admin/users',Authentication,getAllUser)
UserRouter.delete('/Admin/deleteuser/:id',UserDelete)
UserRouter.post("/payment", async (req, res) => {
    const product = req.body;
    if(!product.name || !product.quantity || !product.amount){
      return res.status(401).send({msg:`Please provide name, quanitity and amount of product`})
    }
    console.log(product)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                       name:product.name
                    },
                    unit_amount: product.amount ,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: "https://uninterested-weather-2204-frontend.vercel.app/",
        cancel_url: `https://uninterested-weather-2204-frontend.vercel.app/cancel.html`,
    });
    res.json({ id: session.id });
  });
module.exports={
    UserRouter
}