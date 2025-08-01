import { UserNotFoundError } from '../../errors/user.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js';

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const idIsInvalid = checkIfIdIsValid(userId);
            if (!idIsInvalid) {
                return invalidIdResponse();
            }

            const balance = await this.getUserBalanceUseCase.execute({
                userId,
            });

            return ok(balance);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            console.error(error);
            return serverError();
        }
    }
}
