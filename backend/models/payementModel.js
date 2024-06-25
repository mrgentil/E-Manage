const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true },
    description: { type: String },
    montant: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
