import { faker } from '@faker-js/faker';
import { CreateTransactionController } from './createTransaction.js';

describe('CreateTransactionController', () => {
    class CreateTransactionUseCaseStub {
        async execute(transaction) {
            return transaction;
        }
    }

    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub();
        const sut = new CreateTransactionController(createTransactionUseCase);

        return { sut, createTransactionUseCase };
    };

    const baseHttpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.string.alphanumeric(10),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    };

    it('should return 201 when creating transaction successfully', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(201);
    });

    it('should return 400 when missing user_id', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest.body,
            user_id: 'invalid_id',
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when missing name', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest.body,
            name: undefined,
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when missing date', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest.body,
            date: undefined,
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when missing amount', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest.body,
            amount: undefined,
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when missing type', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest.body,
            type: undefined,
        });

        expect(response.statusCode).toBe(400);
    });
});
