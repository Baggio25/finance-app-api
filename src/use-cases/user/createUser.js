import { v4 as uuid4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../errors/user.js';

export class CreateUserUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresCreateUserRepository,
    ) {
        this.postgresGetUserByEmailRepository =
            postgresGetUserByEmailRepository;
        this.postgresCreateUserRepository = postgresCreateUserRepository;
    }

    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const userId = uuid4();
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        return await this.postgresCreateUserRepository.execute(user);
    }
}
