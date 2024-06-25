const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    type: { type: String, enum: ['chat', 'forum', 'videoconference'], required: true },
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' }
});

const MessageSchema = new mongoose.Schema({
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' },
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contenu: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now }
});

module.exports = {
    Discussion: mongoose.model('Discussion', DiscussionSchema),
    Message: mongoose.model('Message', MessageSchema)
};
