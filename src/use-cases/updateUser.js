import { EmailAlreadyInUseError } from '../errors/user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/getUserByEmail.js';

import bcrypt from 'bcrypt';
import { PosgresUpdateUserRepository } from '../repositories/postgres/updateUser.js';

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();
        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                updateUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(updateUserParams.email);
        }

        const user = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );
            user.password = hashedPassword;
        }

        const posgresUpdateUserRepository = new PosgresUpdateUserRepository();
        const updatedUser = await posgresUpdateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
