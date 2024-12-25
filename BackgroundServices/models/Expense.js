// database for expense

const mongoose = require("mongoose");

// DB Scehema
const ExpenseSchema = mongoose.Schema({

  label: { type: String, require: true }, //name of the expense
  value: { type: Number, require: true },
  date: { type: String, require: true },
  
});

module.exports = mongoose.model("Expense", ExpenseSchema);
