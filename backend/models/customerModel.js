const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String },
    adresse: { type: String },
    entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise', required: true }
});

module.exports = mongoose.model('Client', CustomerSchema);
