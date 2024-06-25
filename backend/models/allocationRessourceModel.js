const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    type: { type: String, enum: ['humain', 'matériel'], required: true },
    description: { type: String },
    entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise' }
});

const AllocationSchema = new mongoose.Schema({
    ressource: { type: mongoose.Schema.Types.ObjectId, ref: 'Ressource' },
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' },
    tache: { type: mongoose.Schema.Types.ObjectId, ref: 'Tache' },
    dateDebut: { type: Date },
    dateFin: { type: Date }
});

module.exports = {
    Ressource: mongoose.model('Ressource', ResourceSchema),
    Allocation: mongoose.model('Allocation', AllocationSchema)
};
