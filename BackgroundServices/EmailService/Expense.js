const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const Expense = require("../models/Expense")
dotenv.config();

// Function to calculate expenses and send a warning email if necessary
const expenseEmail = async() =>{

    const expenses= await Expense.find();// Fetch all expenses from the database

     // Calculate the total expense using reduce
    const totalExpense = expenses.reduce((acc,expense) =>
        acc + expense.value,0  // Sum up the 'value' field of each expense, starting with an initial value of 0
    )

    if(totalExpense > 10000){
        let messageOption= {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "Warning!!",
            text: `Your Total Expense is ${totalExpense}, Please Review you Expenses`
        };
        await sendMail(messageOption);
    }
}


module.exports = expenseEmail;