const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['super_admin', 'admin', 'user'], required: true },
    entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise' } // Optional for super_admin
});

module.exports = mongoose.model('User', UserSchema);
