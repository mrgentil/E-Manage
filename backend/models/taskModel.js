const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String },
    dateDebut: { type: Date },
    dateFin: { type: Date },
    statut: { type: String, enum: ['non commencé', 'en cours', 'terminé'], default: 'non commencé' },
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' },
    responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Tache', TaskSchema);
