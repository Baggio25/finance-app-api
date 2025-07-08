import { PostgresHelper } from '../../../db/postgres/helper.js';

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const result = await PostgresHelper.query(
            `
                select 
                    sum(case when type = 'EARNING' then amount else 0 end) as earnings,
                    sum(case when type = 'INVESTMENT' then amount else 0 end) as investments,  
                    sum(case when type = 'EXPENSE' then amount else 0 end) as expenses,
                    (
                        sum(case when type = 'EARNING' then amount else 0 end) + 
                        sum(case when type = 'INVESTMENT' then amount else 0 end) -   
                        sum(case when type = 'EXPENSE' then amount else 0 end)
                    ) as balance
                from transactions 
                where  user_id = $1;
            `,
            [userId],
        );

        return result[0];
    }
}
