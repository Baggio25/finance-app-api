import { prisma } from '../../../../prisma/prisma.js';

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        return await prisma.user.create({
            data: {
                id: createUserParams.id,
                first_name: createUserParams.firstName,
                last_name: createUserParams.lastName,
                email: createUserParams.email,
                password: createUserParams.password,
            },
        });
    }
}
