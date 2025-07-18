import { faker } from '@faker-js/faker';
import { GetTransactionsByUserIdController } from './getTransactionsByUserId';
import { UserNotFoundError } from '../../errors/user';

describe('GetTransactionsByUserId', () => {
    class GetTransactionsByUserIdUseCaseStub {
        async execute() {
            return [
                {
                    user_id: faker.string.uuid(),
                    name: faker.string.alphanumeric(10),
                    date: faker.date.anytime().toISOString(),
                    type: 'EXPENSE',
                    amount: Number(faker.finance.amount()),
                },
            ];
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdUseCase =
            new GetTransactionsByUserIdUseCaseStub();
        const sut = new GetTransactionsByUserIdController(
            getTransactionsByUserIdUseCase,
        );

        return { sut, getTransactionsByUserIdUseCase };
    };

    it('should return 200 when finding transaction by user id successfully', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            query: { userId: faker.string.uuid() },
        });

        expect(response.statusCode).toBe(200);
    });

    it('should return 400 when missing user id param', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            query: { userId: undefined },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when user id param is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            query: { userId: 'invalid_user_id' },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 404 when user is not found', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut();
        jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new UserNotFoundError());

        const response = await sut.execute({
            query: { userId: faker.string.uuid() },
        });

        expect(response.statusCode).toBe(404);
    });

    it('should return 500 when GetTransactionsByUserId throws generic error', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut();
        jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new Error());

        const response = await sut.execute({
            query: { userId: faker.string.uuid() },
        });

        expect(response.statusCode).toBe(500);
    });
});
