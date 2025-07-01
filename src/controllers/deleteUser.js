import { DeleteUserByIdUseCase } from '../use-cases/index.js';

import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const idIsValid = checkIfIdIsValid(userId);

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const deletedUseCase = new DeleteUserByIdUseCase();
            const deletedUser = await deletedUseCase.execute(userId);

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
