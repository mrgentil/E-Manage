import mongoose from 'mongoose';

const entrepriseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: String,
    secteurActivite: String,
    contact: String,
    email: String,
    phone: String,
    website: String,
    logo: String,
    description: String,
    employes: [{ type: Schema.Types.ObjectId, ref: 'Employe' }],
}, {
    timestamps: true,
});

const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

export default Entreprise;
