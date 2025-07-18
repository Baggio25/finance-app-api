import { faker } from '@faker-js/faker';
import { GetTransactionsByUserIdController } from './getTransactionsByUserId';

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
});
