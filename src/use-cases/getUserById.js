import { PostgresGetUserByIdRepository } from '../repositories/postgres/getUserById.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRepository()
        return await getUserByIdRepository.execute(userId)
    }
}
