const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://Demoo:Demoo@backenddemo.6uxwpuy.mongodb.net/financeDB")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log("DB Error:", err));

// Routes
const transactionRoutes = require('./routes/transactionRoutes');
const scamRoutes = require('./routes/scamRoutes');

app.use('/transactions', transactionRoutes);
app.use('/scam', scamRoutes);

module.exports = app;