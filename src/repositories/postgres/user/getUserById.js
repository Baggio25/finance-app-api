import { prisma } from '../../../../prisma/prisma.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        console.log('User id: ', userId);
        return await prisma.user.findUnique({
            where: { id: userId },
        });
    }
}
