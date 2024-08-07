// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const meetingRoutes = require('./routes/meetings');
const expenseRoutes = require('./routes/expenses');
const config = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/expenses', expenseRoutes);

// MongoDB connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
