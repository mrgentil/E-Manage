import mongoose, {Schema} from 'mongoose';

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
}, {
    timestamps: true,
});

const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

export default Entreprise;
