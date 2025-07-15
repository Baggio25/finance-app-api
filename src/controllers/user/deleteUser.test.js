import { faker } from '@faker-js/faker';
import { DeleteUserController } from './deleteUser.js';

describe('Delete user controller ', () => {
    class DeleteUserUseCaseStub {
        execute() {
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
        const deleteUserUseCase = new DeleteUserUseCaseStub();
        const sut = new DeleteUserController(deleteUserUseCase);

        return { sut, deleteUserUseCase };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    };

    it('should return 200 if user is deleted', async () => {
        //arrange
        const { sut } = makeSut();

        //act
        const result = await sut.execute(httpRequest);

        //result
        expect(result.statusCode).toBe(200);
    });

    it('should return 400 if id is invalid', async () => {
        const { sut } = makeSut();

        const result = await sut.execute({ params: { userId: 'invalid_id' } });

        expect(result.statusCode).toBe(400);
    });
});
