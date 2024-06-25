const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String },
    dateDebut: { type: Date },
    dateFin: { type: Date },
    statut: { type: String, enum: ['non commencé', 'en cours', 'terminé'], default: 'non commencé' },
    entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise' }
});

module.exports = mongoose.model('Projet', ProjectSchema);
