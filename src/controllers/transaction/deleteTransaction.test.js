import { faker } from '@faker-js/faker';

import { DeleteTransactionController } from './deleteTransaction.js';

describe('DeleteTransactionController', () => {
    class DeleteTransactionUseCaseStub {
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
        const deleteTransactionUseCase = new DeleteTransactionUseCaseStub();
        const sut = new DeleteTransactionController(deleteTransactionUseCase);

        return { sut, deleteTransactionUseCase };
    };

    it('should return 200 when deleting a transaction successfully', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            params: {
                transactionId: faker.string.uuid(),
            },
        });

        expect(response.statusCode).toBe(200);
    });
});
