// controllers/taskController.js
const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createTask = async (req, res) => {
  const { title, description, assignedTo, status, dueDate } = req.body;
  const newTask = new Task({ title, description, assignedTo, status, dueDate });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
