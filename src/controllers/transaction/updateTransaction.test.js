import { faker } from '@faker-js/faker';
import { UpdateTransactionController } from './updateTransaction.js';

describe('UpdateTransactionController', () => {
    class UpdateTransactionUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                name: faker.string.alphanumeric(10),
                date: faker.date.anytime().toISOString(),
                type: 'EXPENSE',
                amount: Number(faker.finance.amount()),
            };
        }
    }

    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub();
        const sut = new UpdateTransactionController(updateTransactionUseCase);

        return {
            sut,
            updateTransactionUseCase,
        };
    };

    const baseHttpRequest = {
        params: {
            transactionId: faker.string.uuid(),
        },
        body: {
            name: faker.string.alphanumeric(10),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    };

    it('should return 200 when updating a transaction successfully', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(200);
    });

    it('should return 400 when transaction id is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            params: {
                transactionId: 'invalid_id',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when unallowed field is provided', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                unallowed_field: 'some_value',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when amount is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                amout: 'invalid_amount',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when type is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                type: 'invalid_type',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 when date is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                date: 'invalid_date',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 500 when UpdateTransactionUseCase throws', async () => {
        const { sut, updateTransactionUseCase } = makeSut();
        jest.spyOn(updateTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(500);
    });
});
