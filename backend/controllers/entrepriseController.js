import Enterprise from "../models/companyModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import upload from "../middlewares/uploadMiddleware.js"; // Import Multer middleware

// Create a new enterprise
const createEnterprise = asyncHandler(async (req, res) => {
    upload.single('logo')(req, res, async (err) => {
        if (err) {
            res.status(400);
            throw new Error(err.message);
        } else {
            const {name, description} = req.body;
            if (!name || !description) {
                res.status(400);
                throw new Error("Veuillez fournir un nom et une description pour l'entreprise.");
            }

            const enterpriseExists = await Enterprise.findOne({name});
            if (enterpriseExists) {
                res.status(400);
                throw new Error("L'entreprise existe déjà.");
            }

            const logo = req.file ? req.file.path : '';

            const newEnterprise = new Enterprise({
                name,
                description,
                logo
            });

            try {
                const savedEnterprise = await newEnterprise.save();
                res.status(201).json(savedEnterprise);
            } catch (error) {
                res.status(400);
                throw new Error("Données de l'entreprise invalides.");
            }
        }
    });
});

// Get all enterprises
const getAllEnterprises = asyncHandler(async (req, res) => {
    const enterprises = await Enterprise.find({});
    res.json(enterprises);
});

// Get enterprise by ID
const getEnterpriseById = asyncHandler(async (req, res) => {
    const enterprise = await Enterprise.findById(req.params.id);

    if (enterprise) {
        res.json(enterprise);
    } else {
        res.status(404);
        throw new Error("Entreprise non trouvée.");
    }
});

// Update enterprise by ID
const updateEnterpriseById = asyncHandler(async (req, res) => {
    upload.single('logo')(req, res, async (err) => {
        if (err) {
            res.status(400);
            throw new Error(err.message);
        } else {
            const enterprise = await Enterprise.findById(req.params.id);

            if (enterprise) {
                enterprise.name = req.body.name || enterprise.name;
                enterprise.description = req.body.description || enterprise.description;
                enterprise.logo = req.file ? req.file.path : enterprise.logo;

                const updatedEnterprise = await enterprise.save();
                res.json(updatedEnterprise);
            } else {
                res.status(404);
                throw new Error("Entreprise non trouvée.");
            }
        }
    });
});

// Delete enterprise by ID
const deleteEnterpriseById = asyncHandler(async (req, res) => {
    const enterprise = await Enterprise.findById(req.params.id);

    if (enterprise) {
        await enterprise.remove();
        res.json({message: "Entreprise supprimée avec succès"});
    } else {
        res.status(404);
        throw new Error("Entreprise non trouvée.");
    }
});

export {
    createEnterprise,
    getAllEnterprises,
    getEnterpriseById,
    updateEnterpriseById,
    deleteEnterpriseById
};
