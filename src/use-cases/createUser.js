import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/createUser'

export class CreateUserUseCase {
    async execute(createUserParams) {
        const userId = uuid4().v4()
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository()
        return await postgresCreateUserRepository.execute(user)
    }
}
