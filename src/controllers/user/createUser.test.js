import { EmailAlreadyInUseError } from '../../errors/user.js';
import { CreateUserController } from './createUser.js';
import { faker } from '@faker-js/faker';

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub();
        const sut = new CreateUserController(createUserUseCase);

        return { createUserUseCase, sut };
    };

    it('should return 201 when creating a user successfully', async () => {
        //arrange
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        //act
        const result = await sut.execute(httpRequest);

        //assert
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(httpRequest.body);
    });

    it('should return 400 if first_name is not provided', async () => {
        // arrange
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if last_name is not provided', async () => {
        // arrange
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if email is not provided', async () => {
        // arrange
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if email is not valid', async () => {
        // arrange
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: 'test',
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is not provided', async () => {
        // arrange
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
            },
        };

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is less then 6 characters', async () => {
        // arrange
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 5,
                }),
            },
        };

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should call CreateUserUseCase with correct params', async () => {
        const { createUserUseCase, sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };
        const executeSpy = jest.spyOn(createUserUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    it('should return 500 if CreateUserUseCase throws', async () => {
        const { createUserUseCase, sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    it('should return 500 if CreateUserUseCase throws EmailAlreadyInUseError', async () => {
        // arrange
        const { createUserUseCase, sut } = makeSut();
        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };
        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new EmailAlreadyInUseError(httpRequest.body.email);
        });

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });
});
