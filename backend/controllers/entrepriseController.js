import Entreprise from '../models/entrepriseModel.js';

// Créer une entreprise
export const createEntreprise = async (req, res) => {
    try {
        const { name, address, secteurActivite, contact, email, phone, website, description } = req.body;
        const logo = req.file ? req.file.path : '';

        // Vérifiez si le champ 'name' est fourni
        if (!name) {
            return res.status(400).json({ error: "Le champ 'name' est requis." });
        }

        const entreprise = new Entreprise({
            name,
            address,
            secteurActivite,
            contact,
            email,
            phone,
            website,
            logo,
            description
        });
        await entreprise.save();

        res.status(201).json(entreprise);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir toutes les entreprises
export const getEntreprises = async (req, res) => {
    try {
        const entreprises = await Entreprise.find();
        res.status(200).json(entreprises);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir une entreprise par ID
export const getEntrepriseById = async (req, res) => {
    try {
        const entreprise = await Entreprise.findById(req.params.id);
        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise non trouvée' });
        }
        res.status(200).json(entreprise);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour une entreprise
export const updateEntreprise = async (req, res) => {
    try {
        const { name, address, secteurActivite, contact, email, phone, website, description } = req.body;
        const logo = req.file ? req.file.path : '';

        const entreprise = await Entreprise.findById(req.params.id);

        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise non trouvée' });
        }

        entreprise.name = name || entreprise.name;
        entreprise.address = address || entreprise.address;
        entreprise.secteurActivite = secteurActivite || entreprise.secteurActivite;
        entreprise.contact = contact || entreprise.contact;
        entreprise.email = email || entreprise.email;
        entreprise.phone = phone || entreprise.phone;
        entreprise.website = website || entreprise.website;
        entreprise.logo = logo || entreprise.logo;
        entreprise.description = description || entreprise.description;

        const updatedEntreprise = await entreprise.save();
        res.status(200).json(updatedEntreprise);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer une entreprise
export const deleteEntreprise = async (req, res) => {
    try {
        const entreprise = await Entreprise.findById(req.params.id);

        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise non trouvée' });
        }

        await entreprise.remove();
        res.status(200).json({ message: 'Entreprise supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
