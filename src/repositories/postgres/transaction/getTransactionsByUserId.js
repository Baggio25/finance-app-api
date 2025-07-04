import { PostresHelper } from '../../../db/postgres/helper.js';

export class PostgresGetTransactionsByUserIdRepository {
    async execute(userId) {
        const transactions = await PostresHelper.query(
            `
                SELECT * FROM transactions WHERE user_id = $1
            `,
            [userId],
        );
        return transactions;
    }
}
