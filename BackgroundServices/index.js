const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");   // for scheduling any task 

const app = express();
//config env
dotenv.config();

//connect DB
mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log(`DB Connection is succesfull..` )
}).catch((error)=>{
    console.log(error);
})

//schedule a task 
const run =() =>{
    cron.schedule("* * * * *", () => {
        console.log("Task is running every Minutes")
    })
}
run()
app.listen(process.env.PORT,()=>{
    console.log(`server is running on  Port ${process.env.PORT}`);
})