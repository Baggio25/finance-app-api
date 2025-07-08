import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
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

            const balance = await this.getUserBalanceUseCase({ userId });

            return ok(balance);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
