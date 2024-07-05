import Entreprise from '../models/entrepriseModel.js';

// Créer une entreprise
export const createEntreprise = async (req, res, next) => {
    const { name } = req.body;

    try {
        const entrepriseExists = await Entreprise.findOne({ name });

        if (entrepriseExists) {
            return res.status(400).json({ message: 'Entreprise already exists' });
        }

        const entreprise = await Entreprise.create({ name });
        res.status(201).json(entreprise);
    } catch (error) {
        next(error);
    }
};

// Récupérer toutes les entreprises
export const getAllEntreprises = async (req, res, next) => {
    try {
        const entreprises = await Entreprise.find();
        res.status(200).json(entreprises);
    } catch (error) {
        next(error);
    }
};

// Récupérer une entreprise par ID
export const getEntrepriseById = async (req, res, next) => {
    try {
        const entreprise = await Entreprise.findById(req.params.id);

        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }

        res.status(200).json(entreprise);
    } catch (error) {
        next(error);
    }
};

// Mettre à jour une entreprise par ID
export const updateEntrepriseById = async (req, res, next) => {
    try {
        const { name } = req.body;
        const entreprise = await Entreprise.findById(req.params.id);

        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }

        entreprise.name = name || entreprise.name;
        const updatedEntreprise = await entreprise.save();
        res.status(200).json(updatedEntreprise);
    } catch (error) {
        next(error);
    }
};

// Supprimer une entreprise par ID
export const deleteEntrepriseById = async (req, res, next) => {
    try {
        const entreprise = await Entreprise.findById(req.params.id);

        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }

        await entreprise.remove();
        res.status(200).json({ message: 'Entreprise deleted' });
    } catch (error) {
        next(error);
    }
};
