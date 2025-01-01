const express = require("express");
const Expense = require("../models/Expense");
const router = express.Router();

// add an expense
router.post("/", async (req, res) => {
  try {
    const newExpense = await Expense(req.body); //req.body contains the data sent by the client in the request body
    const expense = await newExpense.save();
    res.status(201).json(expense); //This tells the client that the new expense has been created successfully and includes the details of the created resource.
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ updatedAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update an Expense
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // Extracting id from req.params
    const updatedData = req.body;

    // Find the expense by ID and update it with the new data
    const updateExpense = await Expense.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document, not the old one
    });
    res.status(201).json(updateExpense);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete an expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(201).json("Expense Deleted Successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
