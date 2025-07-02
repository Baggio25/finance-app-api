import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
    constructor(deletedUserUseCase) {
        this.deletedUserUseCase = deletedUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const idIsValid = checkIfIdIsValid(userId);

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const deletedUser = await this.deletedUserUseCase.execute(userId);

            if (!deletedUser) {
                return userNotFoundResponse();
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
