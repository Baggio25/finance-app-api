import bcrypt from 'bcrypt';

export class PasswordComparatorAdpater {
    async execute(password, hashedPassword) {
        return bcrypt.compare(hashedPassword, password);
    }
}
