//this file will create our web server
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expenseRoute = require("./routes/expense"); //import all routesS

// Configuring dotenv to load environment variables from the .env file into process.env
dotenv.config();
// Creating an instance of an Express application
const app= express();

app.use(express.json()); // to parse json inputs from client
//use the routes
app.use('/expenses',expenseRoute);


//MiddleWare
app.use(cors());//This middleware enables Cross-Origin Resource Sharing (CORS), allowing your server to handle requests from different origins (domains, ports, or protocols).


//DB Connection
mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log("Db Connection is successfull!")
}).catch((err)=>{
    console.log(err)
});



app.listen(process.env.PORT,() => {
    console.log(`App is running on Port ${process.env.PORT}`)
})