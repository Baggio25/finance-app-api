import { v4 as uuid4 } from 'uuid';
import { EmailAlreadyInUseError } from '../../errors/user.js';

export class CreateUserUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresCreateUserRepository,
        passwordHasherAdapter,
    ) {
        this.postgresGetUserByEmailRepository =
            postgresGetUserByEmailRepository;
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
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
        const hashedPassword = await this.passwordHasherAdapter.execute(
            createUserParams.password,
        );
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        return await this.postgresCreateUserRepository.execute(user);
    }
}
