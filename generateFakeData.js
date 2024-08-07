import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import User from './backend/models/userModel.js';
import Role from './backend/models/roleModel.js';
import { sequelize } from './backend/config/db.js';

// Fonction pour générer des entreprises fictives
/*async function generateFakeEntreprises(count = 25) {
    try {
        const entreprises = [];

        for (let i = 0; i < count; i++) {
            const name = faker.company.name();
            const address = faker.location.streetAddress();
            const secteurActivite = faker.company.bs();
            const contact = faker.person.fullName();
            const email = faker.internet.email();
            const phone = faker.phone.number();
            const website = faker.internet.url();
            const logo = faker.image.imageUrl();
            const description = faker.lorem.sentences();

            const entreprise = await Entreprise.create({
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

            entreprises.push(entreprise);
        }

        console.log(`${count} entreprises fictives ont été générées.`);
        return entreprises;
    } catch (error) {
        console.error('Erreur lors de la génération des entreprises fictives :', error.message);
        throw error;
    }
}*/

// Fonction pour générer des utilisateurs fictifs
async function generateFakeUsers(count = 30) {
    try {
        const users = [];
        const salt = await bcrypt.genSalt(10); // Générer un sel pour le hachage de mot de passe

        const allRoles = await Role.findAll(); // Récupérer tous les rôles

        for (let i = 0; i < count; i++) {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            const phone = faker.phone.number();
            const address = faker.location.streetAddress();
            const password = await bcrypt.hash(faker.internet.password(), salt);

            // Sélectionner une entreprise et un rôle aléatoire;
            const randomRole = allRoles[Math.floor(Math.random() * allRoles.length)];

            const user = await User.create({
                name,
                email,
                phone,
                address,
                password,
                roleId: randomRole.id, // Attribuer l'ID du rôle aléatoire
            });

            users.push(user);
        }

        console.log(`${count} utilisateurs fictifs ont été générés.`);
        return users;
    } catch (error) {
        console.error('Erreur lors de la génération des utilisateurs fictifs :', error.message);
        throw error;
    }
}

// Exemple d'utilisation pour générer 25 utilisateurs et 25 entreprises fictifs
(async () => {
    try {
        await sequelize.sync(); // Synchroniser les modèles avec la base de données
        await generateFakeUsers(30);
    } catch (error) {
        console.error('Erreur lors de la génération des données fictives :', error.message);
    }
})();
