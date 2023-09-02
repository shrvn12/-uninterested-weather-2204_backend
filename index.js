const express = require("express");
const { adminRouter } = require("./routes/admin.routes");
const { userRouter, connection } = require("./routes/user.routes");
const cors = require("cors");
const { mongoose } = require("mongoose");
require('dotenv').config();

const app = express();
const allowedOrigins = [
    'https://uninterested-weather-2204-frontend.vercel.app',
    // Add more origins as needed
  ];
  
  // Configure CORS options
  const corsOptions = {
    origin: function (origin, callback) {
      // Check if the requesting origin is in the allowedOrigins list
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Block the request
      }
    },
  };
  
  // Enable CORS with the configured options
  app.use(cors(corsOptions));
app.use(express.json());

app.use(userRouter);
app.use('/admin', adminRouter);
app.listen(process.env.port,async () => {
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
