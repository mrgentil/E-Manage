const mongoose = require('mongoose');
const { Schema } = mongoose;

const recrutementSchema = new Schema({
    poste: String,
    dateDebut: Date,
    statut: { type: String, enum: ['En cours', 'Terminé', 'Annulé'] },
    candidats: [{ type: Schema.Types.ObjectId, ref: 'Candidat' }],
    entreprise: { type: Schema.Types.ObjectId, ref: 'Entreprise' }
});

module.exports = mongoose.model('Recrutement', recrutementSchema);
