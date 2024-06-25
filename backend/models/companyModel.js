const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    nom: { type: String, required: true },
    adresse: { type: String },
    telephone: { type: String },
    administrateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Admin user for this company
});

module.exports = mongoose.model('Entreprise', CompanySchema);
