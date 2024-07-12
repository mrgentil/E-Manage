import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

// Import des modèles
import User from './backend/models/userModel.js';
import Entreprise from './backend/models/entrepriseModel.js';

// Fonction pour générer des utilisateurs fictifs
async function generateFakeUsers(count) {
    try {
        const users = [];
        const salt = await bcrypt.genSalt(10); // Générer un sel pour le hachage de mot de passe

        for (let i = 0; i < count; i++) {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            const phone = faker.phone.number(); // Utilisation correcte
            const address = faker.location.streetAddress(); // Utilisation de faker.location.streetAddress
            const role = faker.helpers.arrayElement(['Admin', 'Recruteur', 'Employe', 'Formateur', 'DirecteurRH']); // Utilisation de faker.helpers.arrayElement
            const password = await bcrypt.hash(faker.internet.password(), salt);

            const user = new User({
                name,
                email,
                phone,
                address,
                role,
                password
            });

            await user.save();
            users.push(user);
        }

        console.log(`${count} utilisateurs fictifs ont été générés.`);
        return users;
    } catch (error) {
        console.error('Erreur lors de la génération des utilisateurs fictifs :', error.message);
        throw error;
    }
}

// Fonction pour générer des entreprises fictives
async function generateFakeEntreprises(count) {
    try {
        const entreprises = [];

        for (let i = 0; i < count; i++) {
            const name = faker.company.companyName(); // Utilisation correcte
            const address = faker.location.streetAddress(); // Utilisation de faker.location.streetAddress
            const secteurActivite = faker.company.catchPhrase();
            const contact = faker.person.fullName(); // Utilisation correcte
            const email = faker.internet.email();
            const phone = faker.phone.number(); // Correction : utiliser phone.number
            const website = faker.internet.url();
            const logo = faker.image.imageUrl();
            const description = faker.lorem.sentences();

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
            entreprises.push(entreprise);
        }

        console.log(`${count} entreprises fictives ont été générées.`);
        return entreprises;
    } catch (error) {
        console.error('Erreur lors de la génération des entreprises fictives :', error.message);
        throw error;
    }
}

// Exemple d'utilisation pour générer 5 utilisateurs et 3 entreprises fictifs
(async () => {
    try {
        await generateFakeUsers(5);
        await generateFakeEntreprises(3);
    } catch (error) {
        console.error('Erreur lors de la génération des données fictives :', error.message);
    }
})();
