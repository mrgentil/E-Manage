const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['vacances', 'maladie', 'autre'], required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    statut: { type: String, enum: ['approuvé', 'en attente', 'rejeté'], default: 'en attente' },
    entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise', required: true }
});

module.exports = mongoose.model('Conge', LeaveSchema);
