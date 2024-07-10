import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    role: { type: String, enum: ['Admin', 'Recruteur', 'Employe', 'Formateur', 'DirecteurRH'] },
    entreprise: { type: Schema.Types.ObjectId, ref: 'Entreprise' },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

// Middleware pour hacher le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
