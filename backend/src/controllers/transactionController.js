const Transaction = require('../models/transactionModel');

// ADD
exports.addTransaction = async (req, res) => {
    try {
        const { amount, type, category } = req.body;

        const transaction = new Transaction({ amount, type, category });
        await transaction.save();

        res.status(201).json(transaction);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET
exports.getTransactions = async (req, res) => {
    try {
        const data = await Transaction.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};