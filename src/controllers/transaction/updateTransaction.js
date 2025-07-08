import { ZodError } from 'zod';
import { updateTransactionSchema } from '../../schemas/transaction.js';
import {
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js';

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId;
            const idTransactionIsValid = checkIfIdIsValid(transactionId);
            if (!idTransactionIsValid) {
                return invalidIdResponse();
            }

            const params = httpRequest.body;

            await updateTransactionSchema.parseAsync(params);

            const transaction = await this.updateTransactionUseCase.execute(
                transactionId,
                params,
            );

            return ok(transaction);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                });
            }

            console.error(error);
            return serverError();
        }
    }
}
