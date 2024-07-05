import mongoose from 'mongoose';

const entrepriseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});

const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

export default Entreprise;
