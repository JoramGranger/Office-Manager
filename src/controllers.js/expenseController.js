// controllers/expenseController.js
const Expense = require('../models/expense');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  const { description, amount, date, category } = req.body;
  const newExpense = new Expense({ description, amount, date, category });

  try {
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const expense = await Expense.findByIdAndUpdate(id, updates, { new: true });
    if (!expense) {
      return res.status(404).send('Expense not found');
    }
    res.json(expense);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).send('Expense not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
