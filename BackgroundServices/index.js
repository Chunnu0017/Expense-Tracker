const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");   // for scheduling any task 
const checkTotalAndSendMail = require("./EmailService/Expense");
//miyc bvla xfwu sndf
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
        checkTotalAndSendMail();   //check expense every time and send mail if it exceeds 10000
    })
}
run()
app.listen(process.env.PORT,()=>{
    console.log(`BackGround services is running on  Port ${process.env.PORT}`);
})