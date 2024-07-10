const mongoose = require('mongoose');
const { Schema } = mongoose;

const formationSchema = new Schema({
    titre: String,
    description: String,
    dateDebut: Date,
    duree: Number,
    participants: [{ type: Schema.Types.ObjectId, ref: 'Employe' }],
    entreprise: { type: Schema.Types.ObjectId, ref: 'Entreprise' }
});

module.exports = mongoose.model('Formation', formationSchema);
