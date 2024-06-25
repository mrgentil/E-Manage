const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tache: { type: mongoose.Schema.Types.ObjectId, ref: 'Tache' },
    heuresTravaillees: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Temps', TimeSchema);
