import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db.js';
import Entreprise from './entrepriseModel.js';

class User extends Model {
    async comparePassword(enteredPassword) {
        console.log('Comparing passwords:', enteredPassword, this.password);
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    }
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Recruteur', 'Employe', 'Formateur', 'DirecteurRH'),
        allowNull: false,
    },
    entrepriseId: {
        type: DataTypes.INTEGER,
        references: {
            model: Entreprise,
            key: 'id',
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password')) {
                console.log('Hashing password for user:', user.email);
                user.password = await bcrypt.hash(user.password, 10);
                console.log('Hashed password:', user.password);
            }
        },
    },
});

User.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });

export default User;
