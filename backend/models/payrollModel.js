const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    salaireBrut: { type: Number, required: true },
    salaireNet: { type: Number, required: true },
    datePaiement: { type: Date, required: true },
    entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise', required: true }
});

module.exports = mongoose.model('Paie', PayrollSchema);
