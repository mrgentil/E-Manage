const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeSchema = new Schema({
    nom: String,
    poste: String,
    dateEmbauche: Date,
    salaire: Number,
    evaluations: [{ type: Schema.Types.ObjectId, ref: 'Evaluation' }],
    formations: [{ type: Schema.Types.ObjectId, ref: 'Formation' }],
    entreprise: { type: Schema.Types.ObjectId, ref: 'Entreprise' }
});

module.exports = mongoose.model('Employe', employeSchema);
