const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now },
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    versionCourante: { type: Number, default: 1 },
    entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise' }
});

const VersionSchema = new mongoose.Schema({
    document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    contenu: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now },
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = {
    Document: mongoose.model('Document', DocumentSchema),
    Version: mongoose.model('Version', VersionSchema)
};
