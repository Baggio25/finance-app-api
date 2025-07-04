import { updatedValues } from '../helpers/updateValues.js';

export class PostgresUpdateUserRepository {
    async execute(transactionId, updateTransactionParams) {
        return updatedValues('users', transactionId, updateTransactionParams);
    }
}
