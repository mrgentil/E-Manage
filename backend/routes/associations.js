// associations.js
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import Entreprise from '../models/entrepriseModel.js';

// Définir les associations
Entreprise.hasMany(User, { foreignKey: 'entrepriseId' });
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

export { User, Role, Entreprise };
