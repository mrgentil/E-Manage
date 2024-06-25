const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true },
    description: { type: String, required: true },
    montant: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
