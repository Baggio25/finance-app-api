import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js';

export class DeleteUserByIdUseCase {
    async execute(userId) {
        const deleteUserByIdRepository = new PostgresDeleteUserRepository();
        return await deleteUserByIdRepository.execute(userId);
    }
}
