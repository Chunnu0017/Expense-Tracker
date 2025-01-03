const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const Expense = require("../models/Expense")
dotenv.config();

// Function to calculate expenses and send a warning email if necessary
const checkTotalAndSendMail = async() =>{

    try{
        const expenses= await Expense.find();// Fetch all expenses from the database

     // Calculate the total expense using reduce
    const totalExpense = expenses.reduce((acc,expense) =>
        acc + expense.value,0  // Sum up the 'value' field of each expense, starting with an initial value of 0
    )

     // Check if the email is already sent
    const mailSent = await Expense.findOne({notificationSent:true });

    // If total exceeds $10,000 and email not sent
    if(totalExpense > 10000 && !mailSent){
        let messageOption= {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "Warning!!",
            text: `Your Total Expense is ${totalExpense}, Please Review you Expenses`
        };
        await sendMail(messageOption);

        console.log('Notification email sent.');
        //sets notification true in all expenses
        await Expense.updateMany({}, {$set: {notificationSent: true}});
    }
    }catch(error){
        console.log("Error in checking total Expense or Sending Mail",error)
    }
}


module.exports = checkTotalAndSendMail;