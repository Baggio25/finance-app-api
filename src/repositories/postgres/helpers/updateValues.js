import { PostgresHelper } from '../../../db/postgres/helper.js';

export const updatedValues = async (entity, id, updateTransactionParams) => {
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateTransactionParams).forEach((key) => {
        updateFields.push(`${key} = $${updateValues.length + 1}`);
        updateValues.push(updateTransactionParams[key]);
    });

    updateValues.push(id);

    const updateQuery = `
            UPDATE ${entity}
            SET ${updateFields.join(', ')}
            WHERE id = $${updateValues.length}
            RETURNING *
        `;

    const updatedTransaction = await PostgresHelper.query(
        updateQuery,
        updateValues,
    );

    return updatedTransaction[0];
};
