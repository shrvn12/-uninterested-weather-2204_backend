const {UserModel} = require("../models/User.model");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
require('dotenv').config()
const jwt = require("jsonwebtoken");
const userSignup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { name, email, password,role,  phone,date_of_birth } = req.body;
    const CheckAvailability = await UserModel.find({ email });
    console.log(CheckAvailability);
    if (CheckAvailability.length !== 0) {
      return res.status(200).send({ msg: "user already exist" });
    }
    bcrypt.hash(password, 6, async (err, hash) => {
      if (err) {
        return res.status(409).send({
          error: "Internal server error occurred during the hashing process.",
        });
      } else {
        const postUser = new UserModel({
          name,
          email,
          password: hash,
         role,
          phone,
          date_of_birth
        });
        await postUser.save();
        return res.status(200).send({ msg: "signup has been done"});
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let FindUser = await UserModel.find({ email });
    console.log(FindUser)
    if (!FindUser.length) {
      res.status(404).send({ msg: "You have not exist go for signup first" });
    }
     else {
      bcrypt.compare(password,FindUser[0].password,(err, result) => {
        if(result) {
          const token = jwt.sign(
            { userId: FindUser[0]._id, role: FindUser[0].role,email:FindUser[0].email },
            process.env.Secret,
            { expiresIn: "3d" }
          );
          res.status(201).send({ msg: `log in successfull as ${FindUser[0].role}`, token,role:FindUser[0].role });
        }
        else{
            return res.status(422).send({ msg: "Invalid password" });
          }
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
};


const UserDelete=async(req,res)=>{
    try {
        const id=req.body.id;
        const deleteUser=await UserModel.findByIdAndDelete({_id:id});
        res.status(204).send({"msg":"user has been deleted"})
    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}

const UserBookedDetails=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}
const getAllUser=async(req,res)=>{
    try {
        const Alluser=await UserModel.find();
        res.status(200).send(Alluser);
    } catch (error) {
        res.status(500).send({"msg":"something went wrong",error})
    }
}
module.exports = {
    userSignup,
    userLogin,
    UserDelete,
    UserBookedDetails,
    getAllUser
  };