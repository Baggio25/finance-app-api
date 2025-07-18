import bcrypt from 'bcrypt';

export class PasswordHasherAdapter {
    async execute(password) {
        return await bcrypt.hash(password, 12);
    }
}
