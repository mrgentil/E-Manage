const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./backend/models/userModel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const createSuperAdmin = async () => {
    const password = 'corbolove@1995'; // Change this to a strong password
    const hashedPassword = await bcrypt.hash(password, 12);

    const superAdmin = new User({
        name: 'Bedi Tshitsho',
        email: 'tshitshob@gmail.com',
        password: hashedPassword,
        role: 'superadmin',
        address: '123 Main St',
        phone: '812380589',
    });

    try {
        await superAdmin.save();
        console.log('Super Admin user created successfully');
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error creating Super Admin user:', error.message);
        await mongoose.connection.close();
    }
};

createSuperAdmin();
