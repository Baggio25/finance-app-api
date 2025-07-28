import { faker } from '@faker-js/faker';
import { GetUserByIdController } from './getUserById.js';

describe('GetUserByIdController', () => {
    class GetUserByIdCaseStub {
        async execute() {
            return {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            };
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdCaseStub();
        const sut = new GetUserByIdController(getUserByIdUseCase);

        return { sut, getUserByIdUseCase };
    };

    it('should return 200 if user is found', async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            params: { userId: faker.string.uuid() },
        });

        expect(result.statusCode).toBe(200);
    });

    it('should return 400 if an invalid id is provided', async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            params: { userId: 'invalid_id' },
        });

        expect(result.statusCode).toBe(400);
    });

    it('should return 404 if a user is not found', async () => {
        const { sut, getUserByIdUseCase } = makeSut();
        import.meta.jest
            .spyOn(getUserByIdUseCase, 'execute')
            .mockResolvedValue(null);

        const result = await sut.execute({
            params: { userId: faker.string.uuid() },
        });

        expect(result.statusCode).toBe(404);
    });

    it('should return 500 if GetUserByIdUseCase throws an error', async () => {
        const { sut, getUserByIdUseCase } = makeSut();
        import.meta.jest
            .spyOn(getUserByIdUseCase, 'execute')
            .mockRejectedValue(new Error());

        const result = await sut.execute({
            params: { userId: faker.string.uuid() },
        });

        expect(result.statusCode).toBe(500);
    });
});
