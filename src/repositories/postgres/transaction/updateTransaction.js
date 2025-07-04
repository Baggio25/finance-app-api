import { updatedValues } from '../helpers/updateValues';

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        return updatedValues(
            'transactions',
            transactionId,
            updateTransactionParams,
        );
    }
}
