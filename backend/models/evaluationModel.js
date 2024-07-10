const mongoose = require('mongoose');
const { Schema } = mongoose;

const evaluationSchema = new Schema({
    dateEvaluation: Date,
    note: Number,
    commentaire: String,
    employe: { type: Schema.Types.ObjectId, ref: 'Employe' },
    entreprise: { type: Schema.Types.ObjectId, ref: 'Entreprise' }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
