import { faker } from '@faker-js/faker';
import { CreateUserUseCase } from './createUser.js';

describe('CreateUserUseCase', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }

    class CreateUserUseRepositoryStub {
        async execute(user) {
            return user;
        }
    }

    class PasswordHasherAdapterStub {
        async execute() {
            return 'hashed_password';
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id';
        }
    }

    const makeSut = () => {
        const getUserByEmailRepositoryStub = new GetUserByEmailRepositoryStub();
        const createUserUseRepositoryStub = new CreateUserUseRepositoryStub();
        const passwordHasherAdapterStub = new PasswordHasherAdapterStub();
        const idGeneratorAdapterStub = new IdGeneratorAdapterStub();

        const sut = new CreateUserUseCase(
            getUserByEmailRepositoryStub,
            createUserUseRepositoryStub,
            passwordHasherAdapterStub,
            idGeneratorAdapterStub,
        );

        return {
            sut,
            getUserByEmailRepositoryStub,
            createUserUseRepositoryStub,
            passwordHasherAdapterStub,
            idGeneratorAdapterStub,
        };
    };

    it('should create a user successfully', async () => {
        const { sut } = makeSut();

        const createdUser = await sut.execute({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        });

        expect(createdUser).toBeTruthy();
    });
});
