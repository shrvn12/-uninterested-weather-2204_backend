const express = require("express");
const { adminRouter } = require("./routes/admin.routes");
const { userRouter, connection } = require("./routes/user.routes");
const cors = require("cors");
const { mongoose } = require("mongoose");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', userRouter);
app.use('/admin', adminRouter);

const mconnection=mongoose.connect(process.env.mongoUrl)

app.listen(process.env.port,async () => {
    try {
        await mconnection
        console.log('mongo connected')
    } catch (error) {
        console.log("error in mongo")
    }
    connection.connect((err) => {
        if(err){
            console.log(`error while connecting to DB`);
        }
        else{
            console.log(`Connected to DB`);
        }
    });
    console.log(`running at ${process.env.port}`);
})

