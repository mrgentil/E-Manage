import bcrypt from 'bcryptjs';

const password = 'corbolove@1995'; // Le mot de passe que vous essayez de comparer
const hashedPassword = '$2a$10$Sir0XbHm7KLpxCNu1HXq6eGm1fqLwp2GMKmxh4qJrIjwEZiSgfszC'; // Remplacez par le hachage généré

const comparePassword = async () => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("Résultat de la comparaison :", isMatch);
};

comparePassword();
