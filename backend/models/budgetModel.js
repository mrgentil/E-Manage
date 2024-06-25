const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true },
    montantTotal: { type: Number, required: true },
    dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Budget', BudgetSchema);
