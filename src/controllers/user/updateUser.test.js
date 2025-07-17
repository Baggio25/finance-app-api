import { faker } from '@faker-js/faker';
import { UpdateUserController } from './updateUser.js';

describe('UpdateUserController', () => {
    class UpdateUserUseCaseStub {
        async execute(user) {
            return user;
        }
    }

    const makeSut = () => {
        const updateUserUseCaseStub = new UpdateUserUseCaseStub();
        const sut = new UpdateUserController(updateUserUseCaseStub);

        return { sut, updateUserUseCaseStub };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    };

    it('should return 200 when updating an user successfully', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(200);
    });

    it('should return 400 when an invalid email is provided', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                email: 'invalid_email',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when an invalid password is provided', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                email: faker.internet.password({ length: 5 }),
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when an invalid id is provided', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            params: {
                userId: 'invalid_id',
            },
            body: {
                ...httpRequest.body,
            },
        });

        expect(response.statusCode).toBe(400);
    });
});
