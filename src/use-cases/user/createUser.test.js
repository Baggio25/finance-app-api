import { faker } from '@faker-js/faker';
import { CreateUserUseCase } from './createUser.js';
import { EmailAlreadyInUseError } from '../../errors/user.js';

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

    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    };

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

        const createdUser = await sut.execute(user);

        expect(createdUser).toBeTruthy();
    });

    it('should throw an EmailAlreadyInUseError if GetUserByEmailRepository returns a user', async () => {
        const { sut, getUserByEmailRepositoryStub } = makeSut();
        jest.spyOn(getUserByEmailRepositoryStub, 'execute').mockReturnValueOnce(
            user,
        );

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        );
    });

    it('should call IdGeneratorAdapter to generate a ramdon id', async () => {
        const { sut, idGeneratorAdapterStub, createUserUseRepositoryStub } =
            makeSut();
        const idGeneratorSpy = jest.spyOn(idGeneratorAdapterStub, 'execute');
        const createUserRepositorySpy = jest.spyOn(
            createUserUseRepositoryStub,
            'execute',
        );

        await sut.execute(user);

        expect(idGeneratorSpy).toHaveBeenCalled();
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            password: 'hashed_password',
            id: 'generated_id',
        });
    });

    it('should call PasswordAdapter to cryptograph password', async () => {
        const { sut, createUserUseRepositoryStub, passwordHasherAdapterStub } =
            makeSut();
        const createUserRepositorySpy = jest.spyOn(
            createUserUseRepositoryStub,
            'execute',
        );
        const passwordHasherSpy = jest.spyOn(
            passwordHasherAdapterStub,
            'execute',
        );

        await sut.execute(user);

        expect(passwordHasherSpy).toHaveBeenCalledWith(user.password);
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            password: 'hashed_password',
            id: 'generated_id',
        });
    });
});
