const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise', required: true },
    type: { type: String, enum: ['revenu', 'dépense'], required: true },
    montant: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
