import bcrypt from 'bcryptjs';

const password = 'corbolove'; // Remplacez par le mot de passe que vous voulez utiliser
const hashedPassword = await bcrypt.hash(password, 10);
console.log("Mot de passe haché :", hashedPassword);
