import { EmailAlreadyInUseError } from '../../errors/user.js';

export class CreateUserUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresCreateUserRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    ) {
        this.postgresGetUserByEmailRepository =
            postgresGetUserByEmailRepository;
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
        this.idGeneratorAdapter = idGeneratorAdapter;
    }

    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const userId = this.idGeneratorAdapter.execute();
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
