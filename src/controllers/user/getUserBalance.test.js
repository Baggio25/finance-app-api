import { faker } from '@faker-js/faker';
import { GetUserBalanceController } from './getUserBalance';
import { UserNotFoundError } from '../../errors/user';

describe('GetUserBalanceController', () => {
    class GetUserBalanceUseCaseStub {
        async execute() {
            return faker.finance.currency();
        }
    }

    const makeSut = () => {
        const getUserBalanceUseCase = new GetUserBalanceUseCaseStub();
        const sut = new GetUserBalanceController(getUserBalanceUseCase);

        return { sut, getUserBalanceUseCase };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    };

    it('should return 200 when getting user balance', async () => {
        //arrange
        const { sut } = await makeSut();

        //act
        const httpResponse = await sut.execute(httpRequest);

        //assert
        expect(httpResponse.statusCode).toBe(200);
    });

    it('should return 400 when userId is invalid', async () => {
        //arrange
        const { sut } = makeSut();

        //act
        const result = await sut.execute({ params: { userId: 'invalid_id' } });

        //assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 500 if GetUserBalanceUseCase throws', async () => {
        const { sut, getUserBalanceUseCase } = makeSut();
        jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    it('should return 404 if GetUserBalanceUseCase throws UserNotFoundError', async () => {
        const { sut, getUserBalanceUseCase } = makeSut();
        jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(),
        );

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
    });
});
