import { updatedValues } from '../helpers/updateValues.js';

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        return updatedValues(
            'transactions',
            transactionId,
            updateTransactionParams,
        );
    }
}
